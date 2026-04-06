import { useState, useEffect } from 'react'
import './index.css'
import InputDetails from './components/InputDetails'
import GeneratedEmail from './components/GeneratedEmail'
import EmailHistory from './components/EmailHistory'

const BASE_URL = 'https://cold-mailer-3p32.onrender.com'

function App() {
  const [form, setForm] = useState({
    companyName: '',
    role: '',
    recipient: '',
    background: '',
    tone: 'Professional',
  })

  const [emailData, setEmailData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [followupLoading, setFollowupLoading] = useState(false)
  const [error, setError] = useState(null)

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('coldmailer_history')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('coldmailer_history', JSON.stringify(history))
  }, [history])
  const [dark, setDark] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  const handleGenerate = async () => {
    const { companyName, role, background, tone } = form
    if (!companyName || !role || !background) {
      setError('Please fill in Company Name, Role, and Background.')
      return
    }

    setLoading(true)
    setError(null)
    setEmailData(null)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 20000)

    try {
      const res = await fetch(`${BASE_URL}/api/generate-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName, role, background, tone }),
        signal: controller.signal,
      })
      clearTimeout(timeoutId)

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong, please try again.')
      }

      const data = await res.json()
      setEmailData({ subject: data.subject, body: data.body, explanation: data.explanation || [], recipient: form.recipient })
      setHistory(prev => [{
        id: Date.now(),
        subject: data.subject,
        body: data.body,
        companyName: form.companyName,
        role: form.role,
        recipient: form.recipient,
        timestamp: Date.now(),
      }, ...prev].slice(0, 10))
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Request took too long. Please try again.')
      } else if (err.message === 'Failed to fetch' || err.message.includes('NetworkError')) {
        setError('Connection failed. Is the backend running?')
      } else {
        setError(err.message || 'Something went wrong, please try again.')
      }
    } finally {
      clearTimeout(timeoutId)
      setLoading(false)
    }
  }

  const handleFollowup = async () => {
    if (!emailData) return
    setFollowupLoading(true)
    setError(null)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 20000)

    try {
      const res = await fetch(`${BASE_URL}/api/generate-followup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: form.companyName,
          role: form.role,
          tone: form.tone,
          originalSubject: emailData.subject,
          originalBody: emailData.body,
        }),
        signal: controller.signal,
      })
      clearTimeout(timeoutId)

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong, please try again.')
      }
      const data = await res.json()
      setEmailData({ subject: data.subject, body: data.body, isFollowup: true, recipient: form.recipient })
      setHistory(prev => [{
        id: Date.now(),
        subject: data.subject,
        body: data.body,
        companyName: form.companyName,
        role: form.role,
        recipient: form.recipient,
        timestamp: Date.now(),
        isFollowup: true,
      }, ...prev].slice(0, 10))
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Request took too long. Please try again.')
      } else if (err.message === 'Failed to fetch' || err.message.includes('NetworkError')) {
        setError('Connection failed. Is the backend running?')
      } else {
        setError(err.message || 'Something went wrong, please try again.')
      }
    } finally {
      clearTimeout(timeoutId)
      setFollowupLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen px-4 sm:px-6 py-6 sm:py-10 transition-colors duration-300"
      style={{
        background: dark
          ? 'linear-gradient(135deg, #181712 0%, #1e1d16 100%)'
          : 'linear-gradient(135deg, #fdf6e3 0%, #f5f0e8 50%, #ede8d0 100%)'
      }}
    >
      {/* Header */}
      <header className="text-center mb-10 sm:mb-12 relative flex flex-col items-center pt-10 sm:pt-0 animate-fade-in-up">
        {/* Dark mode toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="absolute right-0 top-0 sm:right-0 sm:top-0 flex items-center gap-2 border-2 px-3 py-1.5 text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer shadow-[2px_2px_0px_0px] hover:-translate-y-0.5"
          style={dark
            ? { borderColor: '#35332a', color: '#a09880', background: '#232219', boxShadow: '2px 2px 0px 0px #35332a' }
            : { borderColor: '#000', color: '#000', background: '#fff', boxShadow: '2px 2px 0px 0px #000' }
          }
        >
          {dark ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
          {dark ? 'Day' : 'Night'}
        </button>

        {/* Badge */}
        <div
          className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase px-3 py-1 mb-4"
          style={dark
            ? { background: '#2a2920', color: '#a09880', border: '1px solid #35332a' }
            : { background: '#000', color: '#facc15' }
          }
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
          AI Powered
        </div>

        {/* Wordmark */}
        <h1
          style={{ fontFamily: "'Sora', sans-serif", color: dark ? '#e8e2d5' : '#000' }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none mb-3"
        >
          Cold<span className="px-2 mx-0.5" style={dark
            ? { background: '#facc15', color: '#18170f' }
            : { background: '#facc15' }
          }>Mailer</span>
        </h1>

        {/* Tagline */}
        <div className="flex items-center justify-center gap-3">
          <p
            style={{ fontFamily: "'Inter', sans-serif", color: dark ? '#6b6755' : '#6b7280' }}
            className="text-sm font-medium tracking-wide max-w-md"
          >
            Write personalized cold emails that actually get replies.
          </p>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="w-5 h-5 shrink-0 flex items-center justify-center border-2 rounded-full text-[10px] font-bold transition-all duration-200 cursor-pointer"
            style={{
              borderColor: dark ? '#35332a' : '#000',
              color: showInfo ? (dark ? '#18170f' : '#000') : (dark ? '#6b6755' : '#6b7280'),
              background: showInfo ? '#facc15' : 'transparent',
            }}
            title="What is ColdMailer?"
          >
            i
          </button>
        </div>
      </header>

      {/* Info Card */}
      {showInfo && (
        <div
          className="max-w-3xl mx-auto mb-10 p-4 sm:p-5 border-2 animate-fade-in-up transition-all duration-300"
          style={{
            background: dark ? '#1c1b14' : '#fff',
            borderColor: dark ? '#35332a' : '#000',
            boxShadow: dark ? '3px 3px 0px 0px #35332a' : '3px 3px 0px 0px #000',
            color: dark ? '#c8c2b0' : '#4b5563'
          }}
        >
          <p className="text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
            <span className="inline-block px-2 py-0.5 mb-2 sm:mb-0 sm:mr-3 text-[10px] font-bold tracking-widest uppercase border-2 align-middle transition-colors duration-300"
              style={{ borderColor: dark ? '#b8960a' : '#000', background: '#facc15', color: '#18170f' }}>
              How it works
            </span>
            <strong style={{ color: dark ? '#e8e2d5' : '#111827' }}>ColdMailer</strong> is built for students and job seekers trying to break into the industry. Provide your background and target role, and it generates a highly personalized, context-aware cold email that recruiters actually want to reply to. No generic templates—just fill in the details and start networking.
          </p>
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div
          className="max-w-5xl mx-auto mb-4 px-4 py-3 text-sm font-medium border-2"
          style={dark
            ? { background: '#2a1a1a', borderColor: '#7f1d1d', color: '#fca5a5', boxShadow: '3px 3px 0px 0px #7f1d1d' }
            : { background: '#fef2f2', borderColor: '#ef4444', color: '#b91c1c', boxShadow: '3px 3px 0px 0px #ef4444' }
          }
        >
          ⚠️ {error}
        </div>
      )}

      {/* Two-panel layout */}
      <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto items-stretch md:items-start animate-fade-in-up delay-100 opacity-0">
        <InputDetails form={form} setForm={setForm} onGenerate={handleGenerate} loading={loading} dark={dark} />
        <GeneratedEmail emailData={emailData} loading={loading} onRegenerate={handleGenerate} onFollowup={handleFollowup} followupLoading={followupLoading} dark={dark} />
      </div>

      {/* History */}
      <div className="animate-fade-in-up delay-150 opacity-0">
        <EmailHistory
          history={history}
          onRestore={(item) => {
            setEmailData({ subject: item.subject, body: item.body, recipient: item.recipient || '' })
            setForm(prev => ({ ...prev, companyName: item.companyName, role: item.role }))
          }}
          onDelete={(id) => setHistory(history.filter(h => h.id !== id))}
          onClear={() => setHistory([])}
          dark={dark}
        />
      </div>

      {/* Footer */}
      <footer className="text-center mt-10 md:mt-14 pb-4 animate-fade-in-up delay-200 opacity-0" style={{ fontFamily: "'Inter', sans-serif" }}>
        <p className="text-xs tracking-wide mb-2" style={{ color: dark ? '#4a4840' : '#9ca3af' }}>Built for students and job seekers</p>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-medium" style={{ color: dark ? '#6b6755' : '#6b7280' }}>
          <span>Anuj Gupta</span>
          <span style={{ color: dark ? '#35332a' : '#d1d5db' }}>·</span>
          <a href="https://github.com/aanuj-guptaa" target="_blank" rel="noreferrer"
            className="flex items-center gap-1 transition-colors duration-150"
            style={{ color: dark ? '#6b6755' : '#6b7280' }}
            onMouseEnter={e => e.currentTarget.style.color = dark ? '#e8e2d5' : '#000'}
            onMouseLeave={e => e.currentTarget.style.color = dark ? '#6b6755' : '#6b7280'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.165c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.42-1.305.763-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.382 1.236-3.222-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.912 1.235 3.222 0 4.61-2.807 5.625-5.48 5.92.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
          <span style={{ color: dark ? '#35332a' : '#d1d5db' }}>·</span>
          <a href="https://www.linkedin.com/in/anuj-gupta-52254529a/" target="_blank" rel="noreferrer"
            className="flex items-center gap-1 transition-colors duration-150"
            style={{ color: dark ? '#6b6755' : '#6b7280' }}
            onMouseEnter={e => e.currentTarget.style.color = dark ? '#e8e2d5' : '#000'}
            onMouseLeave={e => e.currentTarget.style.color = dark ? '#6b6755' : '#6b7280'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a1.977 1.977 0 11.001-3.954 1.977 1.977 0 010 3.954zm1.977 13.019H3.36V9h3.954v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
