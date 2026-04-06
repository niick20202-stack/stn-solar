import { useState, useEffect, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import CursorGlow from '../components/CursorGlow'
import ReonicModal from '../components/ReonicModal'
import CookieBanner from '../components/CookieBanner'
import FloatingContact from '../components/FloatingContact'

const Footer = lazy(() => import('../components/Footer'))

export interface ProduktData {
  icon: string
  label: string
  badge: string
  color: string
  tagline: string
  stats: Array<{ value: string; label: string; icon: string }>
  intro: string | null
  image?: string
  specs: Array<{ label: string; value: string | null }>
  benefits: Array<{ icon: string; title: string; desc: string }>
  faqs: Array<{ q: string; a: string | null }>
}

const gradientText = {
  fontFamily: 'Instrument Serif, Arial, sans-serif',
  fontStyle: 'italic' as const,
  fontWeight: 400,
  background: 'linear-gradient(135deg, #f5b040 0%, #e07018 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

function Placeholder({ text }: { text: string }) {
  return (
    <div
      style={{
        border: '1.5px dashed rgba(245,176,64,0.4)',
        borderRadius: '10px',
        padding: '0.75rem 1rem',
        background: 'rgba(245,176,64,0.05)',
        color: 'rgba(200,130,20,0.7)',
        fontFamily: 'DM Mono, monospace',
        fontSize: '11px',
        letterSpacing: '0.02em',
      }}
    >
      ✦ {text}
    </div>
  )
}

export default function ProduktPage({ data }: { data: ProduktData }) {
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('active') }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="grain relative min-h-screen" style={{ backgroundColor: '#f8f7f5' }}>
      <CursorGlow />
      <ReonicModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <Navbar onAngebot={() => setModalOpen(true)} />
      <FloatingContact />

      <main className="relative z-10">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden pt-32 pb-12 px-6">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vw] pointer-events-none"
            style={{ background: `radial-gradient(ellipse, ${data.color}14 0%, transparent 65%)` }}
          />
          <div className="max-w-5xl mx-auto">
            {/* Back link */}
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest mb-10"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(26,26,26,0.35)', textDecoration: 'none' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_back</span>
              Zurück
            </Link>

            <div className={`flex flex-col ${data.image ? 'md:flex-row md:items-center' : 'items-center text-center'} gap-10 md:gap-16`}>

              {/* Text side */}
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Badge */}
                <div className={`flex mb-5 ${data.image ? '' : 'justify-center'}`}>
                  <span
                    className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] px-4 py-2 rounded-full"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', color: data.color, background: `${data.color}14`, border: `1px solid ${data.color}40` }}
                  >
                    <span className="material-symbols-outlined icon-filled text-sm">{data.icon}</span>
                    {data.badge}
                  </span>
                </div>

                <h1
                  className="leading-tight mb-4"
                  style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 900, fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', letterSpacing: '-0.04em', color: '#1a1a1a' }}
                >
                  <span style={gradientText}>{data.label}</span>
                </h1>

                <p
                  className="text-base mb-10"
                  style={{ color: 'rgba(26,26,26,0.55)', lineHeight: 1.75, fontFamily: 'DM Sans, sans-serif', maxWidth: '480px' }}
                >
                  {data.tagline}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-6">
                  {data.stats.map((s) => (
                    <div key={s.label} className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${data.color}14`, border: `1px solid ${data.color}35` }}
                      >
                        <span className="material-symbols-outlined icon-filled" style={{ fontSize: '17px', color: data.color }}>{s.icon}</span>
                      </div>
                      <div>
                        <div className="font-black leading-none" style={{ fontFamily: 'DM Mono, monospace', fontSize: '1.1rem', letterSpacing: '-0.03em', color: '#1a1a1a' }}>{s.value}</div>
                        <div className="text-[9px] uppercase tracking-widest mt-0.5" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(26,26,26,0.4)' }}>{s.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Image side */}
              {data.image && (
                <motion.div
                  className="flex-1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                >
                  <div style={{ borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 8px 48px rgba(0,0,0,0.12)', border: '1px solid rgba(26,26,26,0.06)' }}>
                    <img
                      src={data.image}
                      alt={data.label}
                      style={{ width: '100%', height: '360px', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ── Intro + Specs ── */}
        <section className="px-6 pb-20">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">

            <motion.div
              className="reveal rounded-3xl p-8"
              style={{ background: '#ffffff', border: '1px solid rgba(26,26,26,0.07)', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p
                className="text-[9px] font-bold uppercase tracking-[0.3em] mb-4"
                style={{ fontFamily: 'Space Grotesk, sans-serif', color: data.color }}
              >
                Produktübersicht
              </p>
              {data.intro ? (
                <p style={{ color: 'rgba(26,26,26,0.65)', lineHeight: 1.8, fontFamily: 'DM Sans, sans-serif', fontSize: '15px' }}>
                  {data.intro}
                </p>
              ) : (
                <div className="space-y-2">
                  <Placeholder text="Produktbeschreibung — bitte ergänzen" />
                  <Placeholder text="Weiterer Absatz — bitte ergänzen" />
                </div>
              )}
            </motion.div>

            <motion.div
              className="reveal rounded-3xl p-8"
              style={{ background: '#ffffff', border: '1px solid rgba(26,26,26,0.07)', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <p
                className="text-[9px] font-bold uppercase tracking-[0.3em] mb-5"
                style={{ fontFamily: 'Space Grotesk, sans-serif', color: data.color }}
              >
                Technische Details
              </p>
              <div className="space-y-4">
                {data.specs.map((spec) => (
                  <div key={spec.label}>
                    <div
                      className="text-[9px] font-bold uppercase tracking-widest mb-1"
                      style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(26,26,26,0.35)' }}
                    >
                      {spec.label}
                    </div>
                    {spec.value ? (
                      <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
                        {spec.value}
                      </div>
                    ) : (
                      <Placeholder text="Bitte ergänzen" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Benefits ── */}
        <section className="px-6 pb-20">
          <div className="max-w-5xl mx-auto">
            <motion.p
              className="text-[9px] font-bold uppercase tracking-[0.3em] text-center mb-8"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(26,26,26,0.35)' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Vorteile
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  className="reveal rounded-2xl p-6"
                  style={{ background: '#ffffff', border: '1px solid rgba(26,26,26,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${data.color}14`, border: `1px solid ${data.color}30` }}
                  >
                    <span className="material-symbols-outlined icon-filled" style={{ fontSize: '18px', color: data.color }}>
                      {b.icon}
                    </span>
                  </div>
                  <h3
                    className="font-black mb-2"
                    style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#1a1a1a', letterSpacing: '-0.02em' }}
                  >
                    {b.title}
                  </h3>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'rgba(26,26,26,0.55)', lineHeight: 1.65 }}>
                    {b.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="px-6 pb-20">
          <div className="max-w-3xl mx-auto">
            <motion.p
              className="text-[9px] font-bold uppercase tracking-[0.3em] text-center mb-8"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(26,26,26,0.35)' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Häufige Fragen
            </motion.p>
            <div className="space-y-3">
              {data.faqs.map((faq, i) => (
                <motion.div
                  key={faq.q}
                  className="reveal rounded-2xl p-6"
                  style={{ background: '#ffffff', border: '1px solid rgba(26,26,26,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.07 }}
                >
                  <h4
                    className="font-black mb-3"
                    style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#1a1a1a', letterSpacing: '-0.02em' }}
                  >
                    {faq.q}
                  </h4>
                  {faq.a ? (
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'rgba(26,26,26,0.6)', lineHeight: 1.7 }}>
                      {faq.a}
                    </p>
                  ) : (
                    <Placeholder text="Antwort — bitte ergänzen" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="px-6 pb-28">
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="relative rounded-3xl p-10 md:p-14 overflow-hidden text-center"
              style={{
                background: 'linear-gradient(135deg, #fff8ee 0%, #fff3e0 100%)',
                border: '1px solid rgba(245,176,64,0.2)',
                boxShadow: '0 4px 32px rgba(245,176,64,0.1)',
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(245,176,64,0.12) 0%, transparent 70%)' }}
              />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.3em]"
                style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#e07018' }}
              >
                Jetzt anfragen
              </span>
              <h2
                className="mt-4 mb-5 leading-tight"
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  letterSpacing: '-0.04em',
                  color: '#1a1a1a',
                }}
              >
                Interesse an{' '}
                <span style={gradientText}>{data.label}?</span>
              </h2>
              <p
                className="text-base max-w-md mx-auto mb-8"
                style={{ color: 'rgba(26,26,26,0.55)', lineHeight: 1.7, fontFamily: 'DM Sans, sans-serif' }}
              >
                Kostenlose Beratung, transparente Preise, professionelle Umsetzung in 6 Wochen.
              </p>
              <motion.button
                className="cta-pill inline-flex items-center gap-3 rounded-full px-10 py-5 font-black text-sm uppercase tracking-wider"
                style={{
                  background: '#f5900a',
                  color: '#ffffff',
                  fontFamily: 'Space Grotesk, sans-serif',
                  letterSpacing: '0.12em',
                  fontSize: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(245,176,64,0.35)',
                }}
                onClick={() => setModalOpen(true)}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="cta-icon"><span className="material-symbols-outlined icon-filled" style={{fontSize:"18px"}}>wb_sunny</span></span>
                Kostenloses Angebot
              </motion.button>
            </motion.div>
          </div>
        </section>

      </main>

      <Suspense fallback={null}><Footer /></Suspense>
      <CookieBanner />
    </div>
  )
}
