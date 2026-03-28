import { lazy, Suspense, useEffect, useState } from 'react'
import Lenis from 'lenis'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import BentoGrid from '../components/BentoGrid'
import CursorGlow from '../components/CursorGlow'
import ReonicModal from '../components/ReonicModal'
import StickyCTA from '../components/StickyCTA'
import CookieBanner from '../components/CookieBanner'
import FloatingContact from '../components/FloatingContact'

const Process = lazy(() => import('../components/Process'))
const Services = lazy(() => import('../components/Services'))
const Speicher = lazy(() => import('../components/Speicher'))
const Foerderung = lazy(() => import('../components/Foerderung'))
const Stats = lazy(() => import('../components/Stats'))
const FAQ = lazy(() => import('../components/FAQ'))
const Footer = lazy(() => import('../components/Footer'))

function Divider() {
  return (
    <div className="relative z-10 flex justify-center items-center" style={{ height: '1px', margin: '0 3rem' }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, transparent, rgba(245,176,64,0.12) 30%, rgba(245,176,64,0.12) 70%, transparent)',
      }} />
      <div style={{
        position: 'relative',
        width: '5px',
        height: '5px',
        borderRadius: '50%',
        background: 'rgba(245,176,64,0.5)',
        boxShadow: '0 0 10px 3px rgba(245,176,64,0.2)',
        zIndex: 1,
      }} />
    </div>
  )
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true)

  useEffect(() => {
    if ('ontouchstart' in window) return
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => { lenis.destroy() }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active')
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="grain relative min-h-screen" style={{ backgroundColor: '#131313' }}>
      <CursorGlow />
      <ReonicModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <Navbar onAngebot={openModal} />
      <StickyCTA onAngebot={openModal} />
      <FloatingContact />
      <main className="relative z-10 pb-36 md:pb-0">
        <Hero onAngebot={openModal} />
        <BentoGrid onAngebot={openModal} />
        <Suspense fallback={null}>
          <Divider />
          <Process />
          <Divider />
          <Services onAngebot={openModal} />
          <Divider />
          <Speicher onAngebot={openModal} />
          <Divider />
          <Foerderung />
          <Divider />
          <Stats onAngebot={openModal} />
          <Divider />
          <FAQ />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <CookieBanner />
    </div>
  )
}
