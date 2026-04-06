import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useScrollY } from '../hooks/useScrollY'
import logoDark from '../assets/logo-dark.svg'
import logoIcon from '../assets/logo-icon.svg'

const products = [
  { icon: 'solar_power', label: 'PV Anlage',  desc: 'Photovoltaik für Ihr Dach',   href: '/produkte/pv-anlage'   },
  { icon: 'heat_pump',   label: 'Wärmepumpe', desc: 'Effizient heizen & kühlen',   href: '/produkte/waermepumpe' },
  { icon: 'bolt',        label: 'Notstrom',   desc: 'Unabhängig bei Stromausfall', href: '/produkte/notstrom'    },
  { icon: 'ev_station',  label: 'Wallbox',    desc: 'E-Auto zuhause laden',        href: '/produkte/wallbox'     },
]

const menuLegal = [
  { label: 'Impressum',  to: '/impressum'  },
  { label: 'Datenschutz', to: '/datenschutz' },
]

const MotionLink = motion(Link)

/* ─── Liquid product dropdown (desktop) ── */
function ProductDropdown({
  visible,
  top,
  centerX,
  onEnter,
  onLeave,
}: {
  visible: boolean
  top: number
  centerX: number
  onEnter: () => void
  onLeave: () => void
}) {
  const WIDTH = 236
  const left = Math.max(8, Math.min(centerX - WIDTH / 2, (typeof window !== 'undefined' ? window.innerWidth : 1200) - WIDTH - 8))

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Invisible bridge fills the gap between nav button and panel */}
          <div
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            style={{
              position: 'fixed',
              top: top - 12,
              left,
              width: WIDTH,
              height: 14,
              zIndex: 9998,
            }}
          />
          <motion.div
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{    opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top,
              left,
              zIndex: 9999,
              width: `${WIDTH}px`,
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(32px) saturate(180%)',
              WebkitBackdropFilter: 'blur(32px) saturate(180%)',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '1.375rem',
              boxShadow: '0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1)',
              padding: '0.5rem',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '56px', background: 'linear-gradient(180deg, rgba(245,196,66,0.07) 0%, transparent 100%)', pointerEvents: 'none' }} />

            {products.map((p) => (
              <Link
                key={p.label}
                to={p.href}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.65rem 0.8rem', borderRadius: '0.875rem',
                  textDecoration: 'none', cursor: 'pointer',
                  position: 'relative',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(245,180,64,0.1)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ width: '34px', height: '34px', borderRadius: '10px', flexShrink: 0, background: 'rgba(245,176,64,0.13)', border: '1px solid rgba(245,176,64,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined icon-filled" style={{ fontSize: '17px', color: '#e07018' }}>{p.icon}</span>
                </div>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 700, color: '#1a1a1a' }}>
                  {p.label}
                </span>
              </Link>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ─── Mobile product panel (liquid glass slide-up) ───────────────── */
function MobileProductPanel({
  visible,
  onClose,
}: {
  visible: boolean
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.08)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
          />
          <div
            className="fixed z-50 md:hidden"
            style={{
              left: '1rem', right: '1rem',
              bottom: 'calc(env(safe-area-inset-bottom) + 5.5rem)',
            }}
          >
            <motion.div
              initial={{ clipPath: 'circle(0% at 50% 100%)', filter: 'blur(10px)', opacity: 0 }}
              animate={{ clipPath: 'circle(160% at 50% 100%)', filter: 'blur(0px)', opacity: 1 }}
              exit={{    clipPath: 'circle(0% at 50% 100%)', filter: 'blur(8px)',  opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28, mass: 0.9 }}
              style={{
                background: 'rgba(255,255,255,0.88)',
                backdropFilter: 'blur(32px) saturate(180%)',
                WebkitBackdropFilter: 'blur(32px) saturate(180%)',
                border: '1px solid rgba(255,255,255,0.95)',
                borderRadius: '1.75rem',
                boxShadow: '0 -8px 56px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,1)',
                overflow: 'hidden',
              }}
            >
              {/* top prismatic sheen */}
              <div
                style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '70px',
                  background: 'linear-gradient(180deg, rgba(245,196,66,0.08) 0%, transparent 100%)',
                  pointerEvents: 'none',
                }}
              />
              <div style={{ position: 'relative', padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem' }}>
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.4)' }}>
                    Produkte
                  </span>
                  <motion.button
                    onClick={onClose}
                    style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    whileTap={{ scale: 0.88 }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '15px', color: 'rgba(26,26,26,0.5)' }}>close</span>
                  </motion.button>
                </div>

                {/* vertical list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {products.map((p, i) => (
                    <MotionLink
                      key={p.label}
                      to={p.href}
                      onClick={onClose}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.055 + 0.1, duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                        padding: '0.7rem 0.8rem', borderRadius: '0.875rem',
                        textDecoration: 'none',
                      }}
                      whileHover={{ background: 'rgba(245,180,64,0.08)' } as never}
                      whileTap={{ scale: 0.96 }}
                    >
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0, background: 'rgba(245,176,64,0.13)', border: '1px solid rgba(245,176,64,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span className="material-symbols-outlined icon-filled" style={{ fontSize: '18px', color: '#e07018' }}>{p.icon}</span>
                      </div>
                      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 700, color: '#1a1a1a' }}>
                        {p.label}
                      </span>
                    </MotionLink>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ─── Main Navbar ──────────────────────────────────────────────────── */
export default function Navbar({ onAngebot }: { onAngebot: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [productOpen, setProductOpen] = useState(false)
  const [mobileProductOpen, setMobileProductOpen] = useState(false)
  const [dropdownPos, setDropdownPos] = useState({ top: 0, centerX: 0 })
  const location = useLocation()
  const isHome  = location.pathname === '/'
  const scrollY = useScrollY()
  const scrolled = scrollY > 40
  const productRef = useRef<HTMLDivElement>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => { setMenuOpen(false); setMobileProductOpen(false); setProductOpen(false) }, [location.pathname])

  // Close dropdown on actual scroll (not on every scrollY state change)
  useEffect(() => {
    const onScroll = () => { if (productOpen) setProductOpen(false) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [productOpen])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    setMobileProductOpen(false)
    const id = href.replace('/#', '').replace('#', '')
    if (!isHome) { window.location.href = href; return }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleProductEnter = () => {
    if (leaveTimer.current) { clearTimeout(leaveTimer.current); leaveTimer.current = null }
    // Only recompute position when opening — not on re-entry from the panel
    if (!productOpen && productRef.current) {
      const r = productRef.current.getBoundingClientRect()
      setDropdownPos({ top: r.bottom + 2, centerX: r.left + r.width / 2 })
    }
    setProductOpen(true)
  }
  const handleProductLeave = () => {
    leaveTimer.current = setTimeout(() => setProductOpen(false), 350)
  }

  return (
    <>
      {/* ── Page blur backdrop when product dropdown is open ── */}
      <AnimatePresence>
        {(productOpen || mobileProductOpen) && (
          <motion.div
            className="fixed inset-0 pointer-events-none"
            style={{
              zIndex: 45,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              background: 'rgba(255,255,255,0.06)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        )}
      </AnimatePresence>

      {/* ── Desktop product dropdown — fixed, outside any clipping ancestor ── */}
      <div className="hidden md:block">
        <ProductDropdown
          visible={productOpen}
          top={dropdownPos.top}
          centerX={dropdownPos.centerX}
          onEnter={handleProductEnter}
          onLeave={handleProductLeave}
        />
      </div>

      {/* ── Desktop floating nav ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        initial={{ y: -20, opacity: 0 }}
        animate={{
          y: 0, opacity: 1,
          paddingLeft: scrolled ? 16 : 24,
          paddingRight: scrolled ? 16 : 24,
          paddingTop: scrolled ? 20 : 0,
        }}
        transition={{
          y: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
          opacity: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
          paddingLeft:  { type: 'spring', stiffness: 320, damping: 28 },
          paddingRight: { type: 'spring', stiffness: 320, damping: 28 },
          paddingTop:   { type: 'spring', stiffness: 320, damping: 28 },
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
            maxWidth:     { type: 'spring', stiffness: 320, damping: 28 },
          }}
          style={{
            paddingLeft:   scrolled ? '1.5rem' : '2rem',
            paddingRight:  scrolled ? '1.5rem' : '2rem',
            paddingTop:    scrolled ? '0.75rem' : '1.1rem',
            paddingBottom: scrolled ? '0.75rem' : '1.1rem',
            background:    scrolled ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0)',
            backdropFilter: scrolled ? 'blur(10px) saturate(180%)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(10px) saturate(180%)' : 'none',
            borderStyle: 'solid', borderWidth: '1px',
            borderColor: scrolled ? 'rgba(0,0,0,0.10)' : 'rgba(0,0,0,0)',
            boxShadow: scrolled
              ? '0 4px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9), 0 0 0 1px rgba(245,176,64,0.04)'
              : 'none',
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
            className="flex items-center cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => scrollTo('/#hero')}
          >
            <AnimatePresence mode="wait">
              {scrolled ? (
                <motion.img key="icon" src={logoIcon} alt="STN Solar"
                  style={{ height: '32px', width: 'auto', display: 'block' }}
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }} transition={{ duration: 0.2 }} />
              ) : (
                <motion.img key="full" src={logoDark} alt="STN Solar"
                  style={{ height: '32px', width: 'auto', display: 'block' }}
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} />
              )}
            </AnimatePresence>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6" style={{ position: 'relative' }}>
            {/* Produkte with dropdown */}
            <div
              ref={productRef}
              style={{ position: 'relative' }}
              onMouseEnter={handleProductEnter}
              onMouseLeave={handleProductLeave}
            >
              <button
                className="flex items-center gap-1 text-sm font-medium transition-colors duration-200 whitespace-nowrap"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  letterSpacing: '0.01em',
                  color: productOpen ? '#f5b040' : 'rgba(26,26,26,0.6)',
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'color 0.2s ease',
                }}
              >
                Produkte
                <motion.span
                  className="material-symbols-outlined"
                  style={{ fontSize: '14px', lineHeight: 1 }}
                  animate={{ rotate: productOpen ? 180 : 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                >
                  expand_more
                </motion.span>
              </button>
            </div>

            {/* Referenzen */}
            <Link
              to="/referenzen"
              className="text-sm font-medium transition-colors duration-200 whitespace-nowrap"
              style={{
                fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.01em',
                color: location.pathname === '/referenzen' ? '#f5b040' : 'rgba(26,26,26,0.6)',
              }}
            >
              Referenzen
            </Link>

            {/* Über uns */}
            <Link
              to="/ueber-uns"
              className="text-sm font-medium transition-colors duration-200 whitespace-nowrap"
              style={{
                fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.01em',
                color: location.pathname === '/ueber-uns' ? '#f5b040' : 'rgba(26,26,26,0.6)',
              }}
            >
              Über uns
            </Link>

            {/* Kontakt */}
            <a
              href="https://wa.me/491234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium transition-colors duration-200 whitespace-nowrap"
              style={{
                fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.01em',
                color: 'rgba(26,26,26,0.6)',
              }}
            >
              Kontakt
            </a>
          </nav>

          {/* Desktop CTA */}
          <motion.button
            className="cta-pill hidden md:flex items-center gap-2 rounded-full px-5 py-2.5 relative overflow-hidden whitespace-nowrap"
            style={{
              fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px',
              letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700,
              background: 'linear-gradient(135deg, #f5b040 0%, #e07018 100%)',
              color: '#ffffff', border: 'none', cursor: 'pointer',
            }}
            onClick={onAngebot}
            initial="rest" whileHover="hover" whileTap={{ scale: 0.96 }}
            variants={{
              rest: { scale: 1, y: 0, boxShadow: '0 2px 10px rgba(245,176,64,0.25)' },
              hover: { scale: 1.05, y: -2, boxShadow: '0 4px 22px rgba(245,176,64,0.45), 0 1px 8px rgba(224,112,24,0.3)' },
            }}
            transition={{ type: 'spring', stiffness: 420, damping: 26 }}
          >
            <motion.span
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: 'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.22) 50%, transparent 75%)' }}
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
              background: '#f5900a',
              color: '#ffffff', letterSpacing: '0.1em', border: 'none', cursor: 'pointer',
            }}
            onClick={onAngebot}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="cta-icon"><span className="material-symbols-outlined icon-filled" style={{fontSize:"14px"}}>wb_sunny</span></span>
            Angebot
          </motion.button>
        </motion.header>
      </motion.div>

      {/* ── Mobile bottom nav ── */}
      <nav
        className="fixed z-50 flex justify-around items-center px-4 py-3 md:hidden"
        style={{
          left: '1rem', right: '1rem',
          bottom: 'calc(env(safe-area-inset-bottom) + 1rem)',
          background: 'rgba(255,255,255,0.90)',
          backdropFilter: 'blur(12px) saturate(180%)',
          WebkitBackdropFilter: 'blur(12px) saturate(180%)',
          border: '1px solid rgba(0,0,0,0.10)',
          borderRadius: '9999px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,1), 0 0 0 1px rgba(245,176,64,0.06)',
        }}
      >
        {/* Home */}
        <motion.button
          onClick={() => scrollTo('/#hero')}
          className="relative flex flex-col items-center gap-1 px-3 py-2.5 rounded-2xl"
          style={{ background: 'none', border: 'none', cursor: 'pointer', minWidth: '56px' }}
          whileTap={{ scale: 0.93 }}
        >
          <span className="material-symbols-outlined text-2xl" style={{ color: 'rgba(26,26,26,0.35)' }}>home_max</span>
          <span className="text-[9px] font-bold uppercase tracking-widest"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(26,26,26,0.35)' }}>Home</span>
        </motion.button>

        {/* Produkte — liquid tap */}
        <motion.button
          onClick={() => setMobileProductOpen((v) => !v)}
          className="relative flex flex-col items-center gap-1 px-3 py-2.5 rounded-2xl"
          style={{ background: 'none', border: 'none', cursor: 'pointer', minWidth: '56px' }}
          whileTap={{ scale: 0.93 }}
        >
          {mobileProductOpen && (
            <motion.div
              layoutId="mobile-pill"
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'rgba(245,176,64,0.12)',
                border: '1px solid rgba(245,176,64,0.25)',
                boxShadow: '0 0 16px rgba(245,176,64,0.15)',
              }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          <span
            className="material-symbols-outlined icon-filled text-2xl relative z-10"
            style={{ color: mobileProductOpen ? '#f5b040' : 'rgba(26,26,26,0.35)', transition: 'color 0.25s' }}
          >solar_power</span>
          <span className="text-[9px] font-bold uppercase tracking-widest relative z-10"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: mobileProductOpen ? '#f5b040' : 'rgba(26,26,26,0.35)', transition: 'color 0.25s' }}>
            Produkte
          </span>
        </motion.button>

        {/* Kontakt / WhatsApp */}
        <motion.a
          href="https://wa.me/491234567890"
          target="_blank" rel="noopener noreferrer"
          className="relative flex flex-col items-center gap-1 px-3 py-2.5 rounded-2xl"
          style={{ textDecoration: 'none', minWidth: '56px' }}
          whileTap={{ scale: 0.93 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="rgba(26,26,26,0.35)" style={{ position: 'relative', zIndex: 10 }}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="relative z-10 text-[9px] font-bold uppercase tracking-widest"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(26,26,26,0.35)' }}>
            Kontakt
          </span>
        </motion.a>

        {/* Mehr */}
        <motion.button
          onClick={() => { setMenuOpen((v) => !v); setMobileProductOpen(false) }}
          className="relative flex flex-col items-center gap-1 px-3 py-2.5 rounded-2xl"
          style={{ background: 'none', border: 'none', cursor: 'pointer', minWidth: '56px' }}
          whileTap={{ scale: 0.93 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={menuOpen ? 'close' : 'open'}
              className="material-symbols-outlined text-2xl"
              style={{ color: menuOpen ? '#f5b040' : 'rgba(26,26,26,0.35)' }}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {menuOpen ? 'close' : 'apps'}
            </motion.span>
          </AnimatePresence>
          <span className="text-[9px] font-bold uppercase tracking-widest"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: menuOpen ? '#f5b040' : 'rgba(26,26,26,0.35)', transition: 'color 0.2s' }}>
            Mehr
          </span>
        </motion.button>
      </nav>

      {/* Mobile product panel */}
      <MobileProductPanel
        visible={mobileProductOpen}
        onClose={() => setMobileProductOpen(false)}
      />

      {/* ── Mobile full-screen menu sheet ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="fixed z-50 md:hidden"
              style={{
                left: '1rem', right: '1rem',
                bottom: 'calc(env(safe-area-inset-bottom) + 5.5rem)',
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(16px) saturate(180%)',
                WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                border: '1px solid rgba(0,0,0,0.10)',
                borderRadius: '2rem',
                boxShadow: '0 -4px 40px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,1), 0 0 0 1px rgba(245,176,64,0.07)',
                overflow: 'hidden',
              }}
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(245,176,64,0.08) 0%, transparent 70%)' }}
              />

              <div className="relative p-5 space-y-3">
                {/* Header */}
                <div className="flex items-center gap-2 mb-1">
                  <img src={logoDark} alt="STN Solar" style={{ height: '24px', width: 'auto' }} />
                  <span className="ml-auto text-[9px] font-bold uppercase tracking-[0.2em]"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(26,26,26,0.35)' }}>
                    Navigation
                  </span>
                </div>

                {/* Page links */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: 'photo_library', label: 'Referenzen', to: '/referenzen', desc: 'Abgeschlossene Projekte' },
                    { icon: 'groups',        label: 'Über uns',   to: '/ueber-uns',  desc: 'Unser Team & Mission' },
                  ].map((page, i) => (
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
                          background: location.pathname === page.to ? 'rgba(245,176,64,0.08)' : 'rgba(0,0,0,0.03)',
                          border: location.pathname === page.to ? '1px solid rgba(245,176,64,0.22)' : '1px solid rgba(0,0,0,0.08)',
                          textDecoration: 'none',
                        }}
                      >
                        <span className="material-symbols-outlined icon-filled text-xl"
                          style={{ color: location.pathname === page.to ? '#f5b040' : 'rgba(26,26,26,0.4)' }}>
                          {page.icon}
                        </span>
                        <div>
                          <p className="text-sm font-black leading-tight"
                            style={{ fontFamily: 'DM Sans, sans-serif', color: location.pathname === page.to ? '#f5b040' : '#1a1a1a' }}>
                            {page.label}
                          </p>
                          <p className="text-[10px] mt-0.5"
                            style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(26,26,26,0.4)' }}>
                            {page.desc}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <motion.button
                  onClick={() => { setMenuOpen(false); onAngebot() }}
                  className="w-full flex items-center justify-center gap-2.5 rounded-2xl py-4 font-black text-xs uppercase"
                  style={{
                    background: '#f5900a',
                    color: '#ffffff', fontFamily: 'Space Grotesk, sans-serif',
                    letterSpacing: '0.12em', border: 'none', cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(245,176,64,0.3)',
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="cta-icon"><span className="material-symbols-outlined icon-filled" style={{fontSize:"16px"}}>wb_sunny</span></span>
                  Angebot einholen
                </motion.button>

                {/* Legal */}
                <motion.div
                  className="flex justify-center gap-6 pt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.26 }}
                >
                  {menuLegal.map((l) => (
                    <Link key={l.to} to={l.to}
                      className="text-[9px] font-bold uppercase tracking-widest"
                      style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(26,26,26,0.35)' }}>
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
