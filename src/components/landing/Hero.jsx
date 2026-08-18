import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const typingText = "Hey Alex,\n\nLoved your recent post on AI agents for frontend dev. \n\nI'm a senior frontend engineer with 5 YOE (React/Tailwind) looking for a new role. I built a platform similar to what you described.\n\nWould you be open to a quick 10m chat this week?";
  
  useEffect(() => {
    if (textIndex < typingText.length) {
      const timeout = setTimeout(() => {
        setTextIndex(prev => prev + 1);
      }, 30 + Math.random() * 20);
      return () => clearTimeout(timeout);
    }
  }, [textIndex, typingText]);

  return (
    <section 
      style={{ 
        minHeight: '100vh', 
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '80px',
        overflow: 'hidden'
      }}
    >
      {/* Background Orbs */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(250,204,21,0.15) 0%, transparent 70%)',
        filter: 'blur(40px)',
        zIndex: 0,
        pointerEvents: 'none',
      }} className="animate-float" />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '20%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)',
        filter: 'blur(60px)',
        zIndex: 0,
        pointerEvents: 'none',
        animationDelay: '1s',
      }} className="animate-float" />

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px',
        width: '100%',
        position: 'relative',
        zIndex: 10,
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '48px',
        alignItems: 'center',
      }} className="lg:grid-cols-2">
        
        {/* Left: Text Content */}
        <div className="animate-slide-in-left">
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(250, 204, 21, 0.1)',
            border: '1px solid rgba(250, 204, 21, 0.2)',
            padding: '6px 16px',
            borderRadius: '9999px',
            marginBottom: '24px',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            <span style={{ color: '#FACC15', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600 }}>AI Powered Generator</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: '#fff',
            marginBottom: '24px',
            letterSpacing: '-1px'
          }}>
            Land Your Dream Role <br />
            <span style={{
              background: 'linear-gradient(135deg, #FACC15 0%, #06B6D4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block'
            }}>with AI Cold Emails</span><br />
            That Get Replies
          </h1>

          {/* Subtitle */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '18px',
            color: '#94a3b8',
            lineHeight: 1.6,
            marginBottom: '40px',
            maxWidth: '540px'
          }}>
            Stop sending generic messages. Our AI crafts hyper-personalized, 
            research-backed cold emails designed to bypass the noise and land 
            interviews with hiring managers.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
            <Link 
              to="/generator"
              className="glow-btn"
              style={{
                background: '#FACC15',
                color: '#0B0F19',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '16px',
                padding: '16px 32px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
              }}
            >
              Generate Email Now
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
            <a 
              href="#timeline"
              style={{
                background: 'rgba(255,255,255,0.05)',
                color: '#fff',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '16px',
                padding: '16px 32px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
            >
              See How It Works
            </a>
          </div>

          {/* Trust Metrics */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            flexWrap: 'wrap',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#06B6D4' }} />
              <span style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 500 }}>Powered by Gemini 1.5</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FACC15' }} />
              <span style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 500 }}>10,000+ Emails Generated</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8B5CF6' }} />
              <span style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 500 }}>85%+ Open Rate</span>
            </div>
          </div>
        </div>

        {/* Right: Email Preview Card */}
        <div className="animate-slide-in-right delay-200" style={{ position: 'relative' }}>
          {/* Decorative elements behind card */}
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, #FACC15, #06B6D4)',
            borderRadius: '20px',
            opacity: 0.5,
            filter: 'blur(30px)',
            zIndex: 0
          }} />
          
          <div className="glass-card" style={{
            position: 'relative',
            zIndex: 1,
            padding: '24px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            borderLeft: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            {/* Window Controls */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
            </div>

            {/* Email Header */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px',
              paddingBottom: '16px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: '#94a3b8', fontSize: '14px', width: '40px' }}>To:</span>
                <div style={{ 
                  background: 'rgba(255,255,255,0.05)', 
                  padding: '4px 12px', 
                  borderRadius: '6px',
                  color: '#e2e8f0',
                  fontSize: '14px'
                }}>alex@startup.com</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: '#94a3b8', fontSize: '14px', width: '40px' }}>Subj:</span>
                <div style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: 500 }}>
                  Loved your post on AI agents + quick question
                </div>
              </div>
            </div>

            {/* Email Body */}
            <div style={{ 
              color: '#cbd5e1', 
              fontSize: '15px', 
              lineHeight: 1.6,
              fontFamily: "'Inter', sans-serif",
              whiteSpace: 'pre-wrap',
              minHeight: '200px'
            }}>
              {typingText.substring(0, textIndex)}
              <span style={{
                display: 'inline-block',
                width: '8px',
                height: '16px',
                background: '#FACC15',
                marginLeft: '2px',
                verticalAlign: 'middle',
                animation: 'blink-caret 1s step-end infinite'
              }} />
            </div>
            
            {/* Sparkle Icon Bottom Right */}
            <div style={{
              position: 'absolute',
              bottom: '24px',
              right: '24px',
              background: 'rgba(250, 204, 21, 0.1)',
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }} className="animate-pulse-glow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
