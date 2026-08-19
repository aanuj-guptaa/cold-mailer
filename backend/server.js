import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import multer from 'multer'
import { PDFParse } from 'pdf-parse'
import { GoogleGenerativeAI } from '@google/generative-ai'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

// Multer: accept single PDF up to 5 MB, stored in memory
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        if (file.mimetype === 'application/pdf') cb(null, true)
        else cb(new Error('Only PDF files are accepted.'))
    },
})

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

function classifyError(err) {
    const msg = err?.message?.toLowerCase() || ''
    if (msg.includes('api_key') || msg.includes('api key') || msg.includes('invalid') && msg.includes('key')) {
        return { status: 401, message: 'Invalid API key. Please check your Gemini API key configuration.' }
    }
    if (msg.includes('quota') || msg.includes('rate') || msg.includes('429') || err?.status === 429) {
        return { status: 429, message: 'Rate limit reached. Please wait a moment and try again.' }
    }
    if (msg.includes('json') || msg.includes('parse') || msg.includes('unexpected token')) {
        return { status: 502, message: 'The AI returned an unexpected response. Please try again.' }
    }
    if (msg.includes('fetch') || msg.includes('network') || msg.includes('econnrefused') || msg.includes('timeout')) {
        return { status: 503, message: 'Network error. Please check your connection and try again.' }
    }
    return { status: 500, message: 'Something went wrong. Please try again.' }
}

// ─── Resume Upload ───────────────────────────────────────────────────────────
app.post('/api/upload-resume', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' })
        }

        const parser = new PDFParse({ data: new Uint8Array(req.file.buffer) })
        const parsedResult = await parser.getText()
        const text = (parsedResult.text || '').trim()
        const pageCount = parsedResult.pages?.length || 1

        if (!text || text.length < 50) {
            return res.status(422).json({ error: 'Could not extract enough text from this PDF. Make sure it is not image-based or password-protected.' })
        }

        // Cap at ~8000 chars to keep Gemini context reasonable
        const trimmed = text.length > 8000 ? text.slice(0, 8000) + '\n[...resume truncated]' : text

        res.json({ resumeText: trimmed, pages: pageCount })
    } catch (err) {
        console.error('Resume parse error:', err)
        if (err.message === 'Only PDF files are accepted.') {
            return res.status(400).json({ error: err.message })
        }
        res.status(500).json({ error: 'Failed to parse the resume. Please try a different PDF.' })
    }
})

// ─── Generate Email ──────────────────────────────────────────────────────────
app.post('/api/generate-email', async (req, res) => {
    const { companyName, role, background, tone, resumeText } = req.body

    if (!companyName || !role) {
        return res.status(400).json({ error: 'companyName and role are required.' })
    }
    if (!background && !resumeText) {
        return res.status(400).json({ error: 'Please provide a candidate background or upload a resume.' })
    }

    // Build context section depending on what was provided
    let candidateContext = ''
    if (resumeText) {
        candidateContext += `--- FULL RESUME ---\n${resumeText}\n--- END RESUME ---\n\n`
    }
    if (background) {
        candidateContext += `Additional Notes from Candidate: ${background}\n`
    }

    const prompt = `You are an expert cold email writer. Write a personalized cold email for a job application with the following details:

- Company Name: ${companyName}
- Role: ${role}
- Tone: ${tone}

CANDIDATE INFORMATION:
${candidateContext}

PERSONALIZATION RULES (follow strictly):
- Carefully read the candidate's resume or background. Identify the 1-2 most impressive and RELEVANT achievements (specific projects, technologies, metrics, or results) that directly connect to the target role.
- Weave these specific details naturally into the email body — do NOT just list skills. Show how a particular project or result demonstrates the candidate is a strong fit.
- Only reference things that are explicitly mentioned in the candidate's information. Do NOT invent, assume, or hallucinate any facts about the company, its products, funding, team, culture, or achievements.
- If no clearly relevant connection exists, write a confident but general statement about why the candidate is excited about this type of role — keep it honest and engaging, not vague filler.
- Keep the email concise: 4-6 short paragraphs max. Hiring managers skim.

Return a JSON object with exactly three fields:
1. "subject": a concise, compelling email subject line
2. "body": the full email body (plain text, with proper line breaks)
3. "explanation": an array of exactly 3 short strings, each explaining one reason why this email is effective (e.g. why the personalization works, what makes the hook strong, why the CTA is good)

Only return valid JSON. No markdown, no code blocks, no explanation outside the JSON.`

    try {
        const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-2.5-flash' })
        const result = await model.generateContent(prompt)
        const text = result.response.text().trim()

        // Strip markdown code block if present
        const cleaned = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim()
        const parsed = JSON.parse(cleaned)

        res.json({ subject: parsed.subject, body: parsed.body, explanation: parsed.explanation || [] })
    } catch (err) {
        console.error('Gemini error:', err)
        const { status, message } = classifyError(err)
        res.status(status).json({ error: message })
    }
})

app.post('/api/generate-followup', async (req, res) => {
    const { companyName, role, originalSubject, originalBody, tone } = req.body

    if (!companyName || !role || !originalBody) {
        return res.status(400).json({ error: 'companyName, role, and originalBody are required.' })
    }

    const prompt = `You are an expert cold email writer. A candidate previously sent the following cold email to ${companyName} for a ${role} position and has not received a response after 4 days.

--- ORIGINAL EMAIL ---
Subject: ${originalSubject}
${originalBody}
--- END OF ORIGINAL EMAIL ---

Write a brief, polite follow-up email. The tone should be ${tone || 'Professional'}. The follow-up should:
- Reference the original email naturally
- Be concise (3-4 short paragraphs max)
- Reiterate interest without being pushy
- End with a clear, soft call to action

Return a JSON object with exactly two fields:
1. "subject": a follow-up subject line (e.g. "Re: ..." or "Following up on my application")
2. "body": the full follow-up email body (plain text, with proper line breaks)

Only return valid JSON. No markdown, no code blocks, no explanation.`

    try {
        const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-2.5-flash' })
        const result = await model.generateContent(prompt)
        const text = result.response.text().trim()
        const cleaned = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim()
        const parsed = JSON.parse(cleaned)
        res.json({ subject: parsed.subject, body: parsed.body })
    } catch (err) {
        console.error('Gemini follow-up error:', err)
        const { status, message } = classifyError(err)
        res.status(status).json({ error: message })
    }
})

app.listen(PORT, () => {
    console.log(`✅ Backend running at http://localhost:${PORT}`)
})
