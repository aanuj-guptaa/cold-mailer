import { CursorGlow } from '../components/ui/CursorGlow'
import { Navbar } from '../components/landing/Navbar'
import { Hero } from '../components/landing/Hero'
import { ValueProp } from '../components/landing/ValueProp'
import { Features } from '../components/landing/Features'
import { UseCases } from '../components/landing/UseCases'
import { Timeline } from '../components/landing/Timeline'
import { FAQ } from '../components/landing/FAQ'
import { CTA } from '../components/landing/CTA'
import { Footer } from '../components/landing/Footer'

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0B0F19', color: '#e2e8f0', overflowX: 'hidden', position: 'relative' }}>
      <CursorGlow />
      <Navbar />
      <Hero />
      <ValueProp />
      <Features />
      <Timeline />
      <UseCases />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  )
}
