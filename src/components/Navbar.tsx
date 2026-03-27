import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Solar-Lösungen', href: '#loesungen' },
  { label: 'Performance', href: '#performance' },
  { label: 'Kundenfeedback', href: '#feedback' },
]

const bottomNav = [
  { icon: 'home_max', label: 'Home', href: '#hero' },
  { icon: 'solar_power', label: 'Produkte', href: '#loesungen' },
  { icon: 'battery_charging_full', label: 'Speicher', href: '#speicher' },
  { icon: 'mail', label: 'Kontakt', href: '#feedback' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', 'loesungen', 'speicher', 'feedback']
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.3 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollTo = (href: string) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Desktop floating nav */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        initial={{ y: -20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          paddingLeft: scrolled ? 16 : 24,
          paddingRight: scrolled ? 16 : 24,
          paddingTop: scrolled ? 20 : 0,
        }}
        transition={{
          y: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
          opacity: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
          paddingLeft: { type: 'spring', stiffness: 320, damping: 28 },
          paddingRight: { type: 'spring', stiffness: 320, damping: 28 },
          paddingTop: { type: 'spring', stiffness: 320, damping: 28 },
        }}
      >
        <motion.header
          className="w-full flex justify-between items-center pointer-events-auto overflow-hidden"
          animate={{
            borderRadius: scrolled ? 9999 : 0,
            maxWidth: scrolled ? '60rem' : '76rem',
          }}
          transition={{
            borderRadius: { type: 'spring', stiffness: 320, damping: 28 },
            maxWidth: { type: 'spring', stiffness: 320, damping: 28 },
          }}
          style={{
            paddingLeft: scrolled ? '1.5rem' : '2rem',
            paddingRight: scrolled ? '1.5rem' : '2rem',
            paddingTop: scrolled ? '0.75rem' : '1.1rem',
            paddingBottom: scrolled ? '0.75rem' : '1.1rem',
            background: scrolled ? 'rgba(18,18,18,0.88)' : 'rgba(0,0,0,0)',
            backdropFilter: scrolled ? 'blur(14px) saturate(170%)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(170%)' : 'none',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: scrolled ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0)',
            boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.5)' : 'none',
            transition: [
              'padding 0.45s cubic-bezier(0.16,1,0.3,1)',
              'background 0.45s ease',
              'backdrop-filter 0.45s ease',
              '-webkit-backdrop-filter 0.45s ease',
              'border-color 0.45s ease',
              'box-shadow 0.45s ease',
            ].join(', '),
          }}
        >
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => scrollTo('#hero')}
          >
            <span
              className="material-symbols-outlined icon-filled text-2xl"
              style={{ color: '#f5b040' }}
            >
              wb_sunny
            </span>
            <span
              className="text-xl font-black text-white tracking-tighter"
              style={{ fontFamily: 'DM Sans, sans-serif', letterSpacing: '-0.04em' }}
            >
              STN Solar
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
                style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.01em' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <motion.button
            className="cta-pill hidden md:flex items-center gap-2 border border-white/10 text-white rounded-full px-5 py-2.5"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 700,
              background: 'rgba(255,255,255,0.06)',
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Jetzt starten
            <span className="material-symbols-outlined text-base" style={{ color: '#f5b040' }}>
              arrow_forward
            </span>
          </motion.button>

          {/* Mobile CTA */}
          <motion.button
            className="md:hidden flex items-center gap-1.5 rounded-full px-4 py-2 font-black text-[10px] uppercase tracking-widest"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              background: 'linear-gradient(135deg, #f5b040, #e07018)',
              color: '#2a1600',
              letterSpacing: '0.1em',
              border: 'none',
              cursor: 'pointer',
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="material-symbols-outlined icon-filled text-sm">wb_sunny</span>
            Angebot
          </motion.button>
        </motion.header>
      </motion.div>

      {/* Mobile bottom nav */}
      <nav
        className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 md:hidden"
        style={{
          background: 'rgba(13,13,13,0.92)',
          backdropFilter: 'blur(24px)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.5)',
        }}
      >
        {bottomNav.map((item) => {
          const id = item.href.replace('#', '')
          const isActive = activeSection === id
          return (
            <motion.button
              key={item.label}
              onClick={() => scrollTo(item.href)}
              className="flex flex-col items-center gap-1"
              style={{ color: isActive ? '#131313' : 'rgba(255,255,255,0.45)', background: 'none', border: 'none', cursor: 'pointer' }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="flex items-center justify-center rounded-full p-3"
                animate={
                  isActive
                    ? { background: 'linear-gradient(135deg, #f5b040, #e07018)', y: -8, boxShadow: '0 0 24px rgba(245,176,64,0.55)' }
                    : { background: 'transparent', y: 0, boxShadow: '0 0 0px transparent' }
                }
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  className={`material-symbols-outlined text-2xl ${isActive ? 'icon-filled' : ''}`}
                  style={{ color: isActive ? '#131313' : 'rgba(255,255,255,0.45)' }}
                >
                  {item.icon}
                </span>
              </motion.div>
              <span
                className="text-[9px] font-bold uppercase tracking-widest"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  color: isActive ? '#f5b040' : 'rgba(255,255,255,0.35)',
                }}
              >
                {item.label}
              </span>
            </motion.button>
          )
        })}
      </nav>
    </>
  )
}
