import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useScrollY } from '../hooks/useScrollY'

const navLinks = [
  { label: 'Home', href: '/#hero' },
  { label: 'Lösungen', href: '/#loesungen' },
  { label: 'Förderung', href: '/#foerderung' },
  { label: 'Feedback', href: '/#feedback' },
]

const bottomNav = [
  { icon: 'home_max', label: 'Home', href: '/#hero' },
  { icon: 'solar_power', label: 'Produkte', href: '/#loesungen' },
  { icon: 'battery_charging_full', label: 'Speicher', href: '/#speicher' },
  { icon: 'mail', label: 'Kontakt', href: '/#feedback' },
]

const menuPages = [
  { icon: 'photo_library', label: 'Referenzen', to: '/referenzen', desc: 'Abgeschlossene Projekte' },
  { icon: 'calculate', label: 'Spar-Rechner', to: '/rechner', desc: 'Ersparnis berechnen' },
]

const menuLegal = [
  { label: 'Impressum', to: '/impressum' },
  { label: 'Datenschutz', to: '/datenschutz' },
]

export default function Navbar({ onAngebot }: { onAngebot: () => void }) {
  const [activeSection, setActiveSection] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome   = location.pathname === '/'
  const scrollY  = useScrollY()
  const scrolled = scrollY > 40

  // close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  useEffect(() => {
    if (!isHome) return
    const sectionIds = ['hero', 'loesungen', 'speicher', 'feedback']
    const observers: IntersectionObserver[] = []
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [isHome])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const id = href.replace('/#', '').replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = href
    }
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
          className="w-full flex justify-between items-center pointer-events-auto"
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
            onClick={() => scrollTo('/#hero')}
          >
            <span className="material-symbols-outlined icon-filled text-2xl" style={{ color: '#f5b040' }}>
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
          <nav className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { if (isHome) { e.preventDefault(); scrollTo(link.href) } }}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 whitespace-nowrap"
                style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.01em' }}
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/referenzen"
              className="text-sm font-medium transition-colors duration-200 whitespace-nowrap"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: '0.01em',
                color: location.pathname === '/referenzen' ? '#f5b040' : 'rgba(255,255,255,0.7)',
              }}
            >
              Referenzen
            </Link>
            <Link
              to="/rechner"
              className="text-sm font-medium transition-colors duration-200 whitespace-nowrap"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: '0.01em',
                color: location.pathname === '/rechner' ? '#f5b040' : 'rgba(255,255,255,0.7)',
              }}
            >
              Rechner
            </Link>
          </nav>

          {/* Desktop CTA */}
          <motion.button
            className="cta-pill hidden md:flex items-center gap-2 rounded-full px-5 py-2.5 relative overflow-hidden whitespace-nowrap"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #f5b040 0%, #e07018 100%)',
              color: '#1a0a00',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={onAngebot}
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.96 }}
            variants={{
              rest: { scale: 1, y: 0, boxShadow: '0 2px 10px rgba(245,176,64,0.18)' },
              hover: { scale: 1.05, y: -2, boxShadow: '0 4px 22px rgba(245,176,64,0.38), 0 1px 8px rgba(224,112,24,0.22)' },
            }}
            transition={{ type: 'spring', stiffness: 420, damping: 26 }}
          >
            <motion.span
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: 'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.28) 50%, transparent 75%)' }}
              variants={{ rest: { x: '-110%' }, hover: { x: '110%' } }}
              transition={{ duration: 0.52, ease: [0.4, 0, 0.2, 1] }}
            />
            Angebot einholen
            <motion.span
              className="material-symbols-outlined text-base"
              variants={{ rest: { x: 0 }, hover: { x: 3 } }}
              transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            >
              arrow_forward
            </motion.span>
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
            onClick={onAngebot}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="material-symbols-outlined icon-filled text-sm">wb_sunny</span>
            Angebot
          </motion.button>
        </motion.header>
      </motion.div>

      {/* ── Mobile bottom nav ── */}
      <nav
        className="fixed z-50 flex justify-around items-center px-4 py-3 md:hidden"
        style={{
          left: '1rem',
          right: '1rem',
          bottom: 'calc(env(safe-area-inset-bottom) + 1rem)',
          background: 'rgba(18,18,18,0.5)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '9999px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.09), inset 0 -1px 0 rgba(0,0,0,0.15)',
        }}
      >
        {bottomNav.map((item) => {
          const id = item.href.replace('/#', '')
          const isActive = isHome && activeSection === id
          return (
            <motion.button
              key={item.label}
              onClick={() => scrollTo(item.href)}
              className="relative flex flex-col items-center gap-1 px-3 py-2.5 rounded-2xl"
              style={{ background: 'none', border: 'none', cursor: 'pointer', minWidth: '56px' }}
              whileTap={{ scale: 0.93 }}
            >
              {isActive && (
                <motion.div
                  layoutId="bottom-pill"
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: 'rgba(245,176,64,0.15)',
                    border: '1px solid rgba(245,176,64,0.25)',
                    boxShadow: '0 0 16px rgba(245,176,64,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span
                className={`material-symbols-outlined text-2xl relative z-10 ${isActive ? 'icon-filled' : ''}`}
                style={{
                  color: isActive ? '#f5b040' : 'rgba(255,255,255,0.4)',
                  filter: isActive ? 'drop-shadow(0 0 6px rgba(245,176,64,0.5))' : 'none',
                  transition: 'color 0.25s ease, filter 0.25s ease',
                }}
              >
                {item.icon}
              </span>
              <span
                className="relative z-10 text-[9px] font-bold uppercase tracking-widest"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  color: isActive ? '#f5b040' : 'rgba(255,255,255,0.3)',
                  transition: 'color 0.25s ease',
                }}
              >
                {item.label}
              </span>
            </motion.button>
          )
        })}

        {/* More button */}
        <motion.button
          onClick={() => setMenuOpen((v) => !v)}
          className="relative flex flex-col items-center gap-1 px-3 py-2.5 rounded-2xl"
          style={{ background: 'none', border: 'none', cursor: 'pointer', minWidth: '56px' }}
          whileTap={{ scale: 0.93 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={menuOpen ? 'close' : 'open'}
              className="material-symbols-outlined text-2xl"
              style={{ color: menuOpen ? '#f5b040' : 'rgba(255,255,255,0.4)' }}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {menuOpen ? 'close' : 'apps'}
            </motion.span>
          </AnimatePresence>
          <span
            className="text-[9px] font-bold uppercase tracking-widest"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              color: menuOpen ? '#f5b040' : 'rgba(255,255,255,0.3)',
              transition: 'color 0.2s ease',
            }}
          >
            Mehr
          </span>
        </motion.button>
      </nav>

      {/* ── Mobile full-screen menu sheet ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Sheet */}
            <motion.div
              className="fixed z-50 md:hidden"
              style={{
                left: '1rem',
                right: '1rem',
                bottom: 'calc(env(safe-area-inset-bottom) + 5.5rem)',
                background: 'rgba(16,16,16,0.97)',
                backdropFilter: 'blur(32px) saturate(180%)',
                WebkitBackdropFilter: 'blur(32px) saturate(180%)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: '2rem',
                boxShadow: '0 -8px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset',
                overflow: 'hidden',
              }}
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            >
              {/* Ambient glow top */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(245,176,64,0.08) 0%, transparent 70%)' }}
              />

              <div className="relative p-5 space-y-4">
                {/* Header */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined icon-filled text-lg" style={{ color: '#f5b040' }}>wb_sunny</span>
                  <span className="text-xs font-black tracking-tight text-white" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    STN Solar
                  </span>
                  <span
                    className="ml-auto text-[9px] font-bold uppercase tracking-[0.2em]"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(255,255,255,0.25)' }}
                  >
                    Navigation
                  </span>
                </div>

                {/* Page links */}
                <div className="grid grid-cols-2 gap-2">
                  {menuPages.map((page, i) => (
                    <motion.div
                      key={page.to}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 + 0.08, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        to={page.to}
                        className="flex flex-col gap-2 rounded-2xl p-4"
                        style={{
                          background: location.pathname === page.to ? 'rgba(245,176,64,0.1)' : 'rgba(255,255,255,0.04)',
                          border: location.pathname === page.to ? '1px solid rgba(245,176,64,0.25)' : '1px solid rgba(255,255,255,0.07)',
                        }}
                      >
                        <span
                          className="material-symbols-outlined icon-filled text-xl"
                          style={{ color: location.pathname === page.to ? '#f5b040' : 'rgba(255,255,255,0.5)' }}
                        >
                          {page.icon}
                        </span>
                        <div>
                          <p
                            className="text-sm font-black leading-tight"
                            style={{
                              fontFamily: 'DM Sans, sans-serif',
                              color: location.pathname === page.to ? '#f5b040' : 'rgba(255,255,255,0.9)',
                            }}
                          >
                            {page.label}
                          </p>
                          <p
                            className="text-[10px] mt-0.5"
                            style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(255,255,255,0.3)' }}
                          >
                            {page.desc}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Section links */}
                <motion.div
                  className="grid grid-cols-4 gap-1.5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {navLinks.map((link) => (
                    <button
                      key={link.label}
                      onClick={() => scrollTo(link.href)}
                      className="flex flex-col items-center gap-1.5 rounded-xl py-3"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        cursor: 'pointer',
                      }}
                    >
                      <span
                        className="text-[9px] font-bold uppercase tracking-wider text-center"
                        style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(255,255,255,0.5)' }}
                      >
                        {link.label}
                      </span>
                    </button>
                  ))}
                </motion.div>

                {/* CTA */}
                <motion.button
                  onClick={() => { setMenuOpen(false); onAngebot() }}
                  className="w-full flex items-center justify-center gap-2.5 rounded-2xl py-4 font-black text-xs uppercase"
                  style={{
                    background: 'linear-gradient(135deg, #f5b040, #e07018)',
                    color: '#1a0a00',
                    fontFamily: 'Space Grotesk, sans-serif',
                    letterSpacing: '0.12em',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(245,176,64,0.3)',
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.24, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="material-symbols-outlined icon-filled text-base">wb_sunny</span>
                  Angebot einholen
                </motion.button>

                {/* Legal */}
                <motion.div
                  className="flex justify-center gap-6 pt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {menuLegal.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className="text-[9px] font-bold uppercase tracking-widest"
                      style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(255,255,255,0.2)' }}
                    >
                      {l.label}
                    </Link>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
