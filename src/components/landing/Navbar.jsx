import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { label: 'Features', href: '#features' },
    { label: 'How it Works', href: '#timeline' },
    { label: 'Use Cases', href: '#usecases' },
    { label: 'FAQ', href: '#faq' },
  ]

  const scrollTo = (href) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '0 24px',
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(11, 15, 25, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px',
      }}>
        {/* Logo */}
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '2px' }}>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: '22px', color: '#fff', letterSpacing: '-0.5px' }}>Cold</span>
          <span style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 800,
            fontSize: '22px',
            color: '#0B0F19',
            background: '#FACC15',
            padding: '1px 8px',
            letterSpacing: '-0.5px',
          }}>Mailer</span>
        </a>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="hidden md:flex">
          {links.map(link => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'color 0.2s',
                padding: '4px 0',
              }}
              onMouseEnter={e => e.target.style.color = '#FACC15'}
              onMouseLeave={e => e.target.style.color = '#94a3b8'}
            >
              {link.label}
            </button>
          ))}
          <Link
            to="/generator"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              fontWeight: 600,
              color: '#0B0F19',
              background: '#FACC15',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textDecoration: 'none',
              display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#eab308'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#FACC15'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Launch Generator →
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: 'none', border: 'none', color: '#e2e8f0', cursor: 'pointer', padding: '8px' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            padding: '16px 0 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            background: 'rgba(11, 15, 25, 0.95)',
            backdropFilter: 'blur(20px)',
          }}
          className="md:hidden"
        >
          {links.map(link => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                fontWeight: 500,
                cursor: 'pointer',
                padding: '8px 0',
                textAlign: 'left',
              }}
            >
              {link.label}
            </button>
          ))}
          <Link
            to="/generator"
            onClick={() => setMobileOpen(false)}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              fontWeight: 600,
              color: '#0B0F19',
              background: '#FACC15',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '8px',
              textDecoration: 'none',
              display: 'inline-block',
              textAlign: 'center',
            }}
          >
            Launch Generator →
          </Link>
        </div>
      )}
    </nav>
  )
}
