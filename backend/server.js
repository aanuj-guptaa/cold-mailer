import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { GoogleGenerativeAI } from '@google/generative-ai'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

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

app.post('/api/generate-email', async (req, res) => {
    const { companyName, role, background, tone } = req.body

    if (!companyName || !role || !background) {
        return res.status(400).json({ error: 'companyName, role, and background are required.' })
    }

    const prompt = `You are an expert cold email writer. Write a personalized cold email for a job application with the following details:

- Company Name: ${companyName}
- Role: ${role}
- Candidate Background: ${background}
- Tone: ${tone}

PERSONALIZATION RULES (follow strictly):
- If the candidate's background contains specific, relevant experience, projects, or skills that directly relate to the role or company's likely work, include ONE natural sentence in the email that connects this to the company or role.
- Only reference things that are explicitly mentioned in the candidate background. Do NOT invent, assume, or hallucinate any facts about the company, its products, funding, team, culture, or achievements.
- If no clearly relevant connection exists, write a confident but general statement about why the candidate is excited about this type of role — keep it honest and engaging, not vague filler.

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
