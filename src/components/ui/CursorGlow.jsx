import { useState, useEffect } from 'react'

export function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Don't show on touch devices
    if ('ontouchstart' in window) return

    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      if (!visible) setVisible(true)
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [visible])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(250, 204, 21, 0.04), rgba(6, 182, 212, 0.02), transparent 60%)`,
        transition: 'background 0.15s ease',
      }}
    />
  )
}
