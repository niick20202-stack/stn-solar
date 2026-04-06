import { motion } from 'framer-motion'
import HERO_HAUS from '../assets/hero_haus.webp'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
}
const item = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } },
}

function Avatar({ bg, letter }: { bg: string; letter: string }) {
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
      style={{ background: bg, border: '2.5px solid #ffffff', color: '#fff', fontFamily: 'DM Sans, sans-serif' }}
    >
      {letter}
    </div>
  )
}

export default function Hero({ onAngebot }: { onAngebot: () => void }) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{
        height: '100vh',
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.055) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        backgroundColor: '#f8f7f5',
      }}
    >
      {/* ── House image — bottom 58% of viewport, full-bleed ── */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '68%',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={HERO_HAUS}
          alt="Haus mit Solaranlage"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 65%',
            display: 'block',
          }}
        />

      </motion.div>

      {/* ── Text & CTA — top portion, sits above image ── */}
      <div
        className="relative w-full flex flex-col items-center px-6 text-center"
        style={{ paddingTop: 'calc(80px + 5vh)', zIndex: 10 }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center w-full max-w-3xl"
        >
          {/* Eyebrow pill */}
          <motion.div variants={item}>
            <span
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] mb-6 px-4 py-2 rounded-full"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                color: 'rgba(245,176,64,0.9)',
                background: 'rgba(245,176,64,0.08)',
                border: '1px solid rgba(245,176,64,0.2)',
              }}
            >
              <span className="material-symbols-outlined text-sm icon-filled" style={{ color: '#f5b040' }}>location_on</span>
              Ihr Solarpartner in NRW · Seit 2018
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="leading-none"
            style={{ fontSize: 'clamp(2.6rem, 7.5vw, 5.5rem)', lineHeight: 0.93, letterSpacing: '-0.04em' }}
          >
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, color: '#1a1a1a' }}>
              Strom selbst erzeugen.{' '}
            </span>
            <span style={{
              fontFamily: 'Instrument Serif, Arial, sans-serif', fontStyle: 'italic', fontWeight: 400,
              background: 'linear-gradient(135deg, #f5c842 0%, #f5b040 50%, #e07018 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Kosten drastisch senken.</span>
          </motion.h1>

          {/* Subline */}
          <motion.p variants={item}
            className="mt-5 text-base md:text-lg"
            style={{ fontFamily: 'DM Sans, sans-serif', color: 'rgba(26,26,26,0.55)', lineHeight: 1.65, maxWidth: '42ch' }}>
            Planung, Montage &amp; Netzanschluss —{' '}
            <span style={{ color: '#1a1a1a', fontWeight: 600 }}>alles aus einer Hand.</span>{' '}
            Ihr Solarplan in Minuten. Kostenlos.
          </motion.p>

          {/* CTA row — dark liquid glass capsule */}
          <motion.div variants={item} className="mt-8 w-full flex justify-center">
            <div
              className="flex flex-col sm:flex-row items-center gap-4 px-4 py-3 sm:px-5 sm:py-3"
              style={{
                borderRadius: '999px',
                background: 'rgba(15,12,8,0.55)',
                backdropFilter: 'blur(20px) saturate(1.6)',
                WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
                border: '1px solid rgba(255,255,255,0.10)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              <motion.button
                className="cta-pill flex items-center justify-center gap-3 rounded-full px-8 py-3.5 font-black text-xs uppercase"
                style={{
                  background: '#f5900a',
                  color: '#ffffff',
                  fontFamily: 'Space Grotesk, sans-serif',
                  letterSpacing: '0.1em',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
                onClick={onAngebot}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Kostenlosen Solarplan erstellen
                <span className="cta-icon"><span className="material-symbols-outlined icon-filled" style={{fontSize:"16px"}}>calculate</span></span>
              </motion.button>

              {/* Divider */}
              <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.12)', flexShrink: 0 }} className="hidden sm:block" />

              {/* Social proof */}
              <div className="flex items-center gap-3 pr-1">
                <div className="flex -space-x-2.5">
                  <Avatar bg="linear-gradient(135deg,#7c3aed,#a855f7)" letter="M" />
                  <Avatar bg="linear-gradient(135deg,#0ea5e9,#38bdf8)" letter="S" />
                  <Avatar bg="linear-gradient(135deg,#f59e0b,#f97316)" letter="L" />
                </div>
                <div style={{ borderLeft: '1px solid rgba(255,255,255,0.12)', paddingLeft: '12px' }}>
                  <p className="font-bold text-sm text-left" style={{ color: 'rgba(255,255,255,0.92)', fontFamily: 'DM Sans, sans-serif', letterSpacing: '-0.01em' }}>
                    +40 Kunden
                  </p>
                  <p className="text-xs flex items-center gap-1.5 mt-0.5"
                    style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Space Grotesk, sans-serif' }}>
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#4ade80', boxShadow: '0 0 6px #4ade8088' }} />
                    2 Plätze frei
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
