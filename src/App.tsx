import { useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BentoGrid from './components/BentoGrid'
import Services from './components/Services'
import Stats from './components/Stats'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
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
    <div className="grain relative min-h-screen overflow-x-hidden" style={{ backgroundColor: '#131313' }}>
      {/* Ambient solar top-right */}
      <div className="solar-ambient" />
      {/* Ambient bottom-left */}
      <div
        className="fixed bottom-0 left-0 w-[50vw] h-[50vw] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(235,193,83,0.04) 0%, transparent 65%)',
          transform: 'translate(-30%, 30%)',
        }}
      />

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <BentoGrid />
        <Services />
        <Stats />
      </main>
      <Footer />
    </div>
  )
}
