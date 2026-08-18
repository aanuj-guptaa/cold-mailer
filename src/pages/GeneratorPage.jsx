import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CursorGlow } from '../components/ui/CursorGlow'
import InputDetails from '../components/InputDetails'
import GeneratedEmail from '../components/GeneratedEmail'
import EmailHistory from '../components/EmailHistory'

const BASE_URL = 'https://cold-mailer-3p32.onrender.com'

export default function GeneratorPage() {
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
  
  const [dark, setDark] = useState(false)

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('coldmailer_history')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('coldmailer_history', JSON.stringify(history))
  }, [history])

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
      style={{ 
        minHeight: '100vh', 
        background: dark ? 'linear-gradient(135deg, #181712 0%, #1e1d16 100%)' : 'linear-gradient(135deg, #fdf6e3 0%, #f5f0e8 50%, #ede8d0 100%)', 
        color: dark ? '#e2e8f0' : '#181712', 
        overflowX: 'hidden',
        transition: 'background 0.3s ease, color 0.3s ease'
      }}
    >
      {dark && <CursorGlow />}

      {/* Top Bar */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        padding: '0 24px',
        background: dark ? 'rgba(24, 23, 18, 0.85)' : 'rgba(253, 246, 227, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: dark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
        transition: 'background 0.3s ease, border-color 0.3s ease'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '2px' }}>
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: '20px', color: dark ? '#fff' : '#000', letterSpacing: '-0.5px' }}>Cold</span>
            <span style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 800,
              fontSize: '20px',
              color: '#0B0F19',
              background: '#FACC15',
              padding: '1px 7px',
              letterSpacing: '-0.5px',
            }}>Mailer</span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setDark(!dark)}
              className="flex items-center gap-2 border-2 px-3 py-1.5 text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer shadow-[2px_2px_0px_0px] hover:-translate-y-0.5"
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
            <Link
              to="/"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                fontWeight: 500,
                color: dark ? '#94a3b8' : '#475569',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#FACC15'}
              onMouseLeave={e => e.currentTarget.style.color = dark ? '#94a3b8' : '#475569'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Generator Content */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 24px 96px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '6px 16px',
              background: 'rgba(250, 204, 21, 0.1)',
              border: '1px solid rgba(250, 204, 21, 0.2)',
              borderRadius: '100px',
              color: '#FACC15',
              marginBottom: '16px',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            AI Email Generator
          </div>
          <h1
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 800,
              color: dark ? '#fff' : '#000',
              marginBottom: '12px',
              letterSpacing: '-0.5px',
            }}
          >
            Generate Your <span style={{ color: '#FACC15' }}>Cold Email</span>
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              color: dark ? '#94a3b8' : '#475569',
              maxWidth: '500px',
              margin: '0 auto',
            }}
          >
            Fill in your details below and let AI craft the perfect outreach email.
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div
            style={{
              margin: '0 auto 24px',
              padding: '14px 20px',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '12px',
              color: '#fca5a5',
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* Two-panel layout */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <InputDetails form={form} setForm={setForm} onGenerate={handleGenerate} loading={loading} dark={dark} />
          <GeneratedEmail emailData={emailData} loading={loading} onRegenerate={handleGenerate} onFollowup={handleFollowup} followupLoading={followupLoading} dark={dark} />
        </div>

        {/* History */}
        <div style={{ marginTop: '40px' }}>
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
      </div>
    </div>
  )
}
