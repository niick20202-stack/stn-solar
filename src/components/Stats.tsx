import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    initial: 'M',
    name: 'Markus Weber',
    location: 'Berlin, DE',
    text: '"Hervorragender Service von der Planung bis zum Anschluss. Die Anlage liefert mehr als versprochen!"',
    rating: 5,
  },
  {
    initial: 'S',
    name: 'Sarah Jenkins',
    location: 'Hamburg, DE',
    text: '"Endlich unabhängig vom Stromnetz. Der Speicher war die beste Investition des Jahres."',
    rating: 5,
  },
  {
    initial: 'L',
    name: 'Lukas Müller',
    location: 'München, DE',
    text: '"Ästhetisch die schönste Lösung am Markt. Die Full-Black Module sehen auf unserem Dach fantastisch aus."',
    rating: 5,
  },
]

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="material-symbols-outlined icon-filled star-glow"
          style={{ color: '#F5C518', fontSize: '20px' }}
        >
          star
        </span>
      ))}
    </div>
  )
}

function CounterSection() {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasRun = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true
          const target = 1000
          const duration = 2200
          const start = performance.now()
          const tick = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 4)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
            else setCount(target)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div
        className="font-black text-white leading-none tracking-tighter"
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 'clamp(5rem, 12vw, 10rem)',
          letterSpacing: '-0.06em',
        }}
      >
        <span style={{ fontFamily: 'DM Mono, monospace' }}>
          {count.toLocaleString('de-DE')}
        </span>
        <span className="text-gradient">+</span>
      </div>
      <p
        className="text-sm font-bold uppercase tracking-[0.4em] text-center"
        style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(255,255,255,0.4)' }}
      >
        Zufriedene Kunden weltweit
      </p>
    </div>
  )
}

export default function Stats({ onAngebot }: { onAngebot: () => void }) {
  return (
    <section
      id="feedback"
      className="relative overflow-hidden py-32 px-6"
      style={{ background: 'linear-gradient(to bottom, #131313, #0a0f1e, #131313)' }}
    >
      {/* Ambient glows */}
      <div
        className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full pulse-soft pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,176,64,0.06) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-24 right-0 w-80 h-80 rounded-full pulse-soft pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(100,149,237,0.04) 0%, transparent 70%)',
          animationDelay: '1.5s',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Social proof badges */}
        <motion.div
          className="flex justify-center mb-12 reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="flex flex-wrap justify-center items-center gap-6 px-8 py-4 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {[
              { icon: 'G', label: 'Google Reviews' },
              { icon: null, label: 'Trusted Shops', matIcon: 'verified_user' },
              { icon: null, label: 'Trustpilot', matIcon: 'star' },
            ].map((badge, i) => (
              <div key={badge.label} className="flex items-center gap-5">
                {i > 0 && (
                  <div className="w-px h-4" style={{ background: 'rgba(255,255,255,0.15)' }} />
                )}
                <div
                  className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300"
                >
                  {badge.icon ? (
                    <span
                      className="font-black text-white text-lg"
                      style={{ fontFamily: 'DM Sans, sans-serif', letterSpacing: '-0.05em' }}
                    >
                      {badge.icon}
                    </span>
                  ) : (
                    <span className="material-symbols-outlined text-sm text-white">
                      {badge.matIcon}
                    </span>
                  )}
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest text-white"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {badge.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Counter */}
        <div className="text-center mb-16 reveal">
          <CounterSection />
        </div>

        {/* Rating widget */}
        <motion.div
          className="flex justify-center mb-20 reveal"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="glow-card flex flex-col items-center px-10 py-8 rounded-3xl"
            style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.09)',
            }}
          >
            <Stars />
            <div className="flex items-baseline gap-2 mt-4">
              <span
                className="font-black text-white"
                style={{ fontFamily: 'DM Mono, monospace', fontSize: '2.5rem', letterSpacing: '-0.04em' }}
              >
                4.8
              </span>
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(255,255,255,0.35)' }}
              >
                / 5.0
              </span>
            </div>
            <p
              className="text-[10px] font-bold uppercase tracking-[0.2em] mt-1"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(255,255,255,0.3)' }}
            >
              Durchschnittliche Gesamtbewertung
            </p>
          </div>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="customer-card rounded-3xl p-8 reveal"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-black text-lg"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.7)',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  {t.initial}
                </div>
                <div>
                  <p className="text-white font-bold text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {t.name}
                  </p>
                  <p
                    className="text-[9px] uppercase tracking-widest font-bold mt-0.5"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(255,255,255,0.35)' }}
                  >
                    {t.location}
                  </p>
                </div>
              </div>

              <Stars count={t.rating} />

              <p
                className="text-sm italic leading-relaxed mt-4"
                style={{ color: 'rgba(209,197,176,0.8)', lineHeight: 1.7 }}
              >
                {t.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          className="mt-20 reveal"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div
            className="relative rounded-3xl p-10 md:p-16 overflow-hidden text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.04) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {/* Decorative glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(245,176,64,0.08) 0%, transparent 70%)' }}
            />

            <span
              className="text-[10px] font-bold uppercase tracking-[0.3em]"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#f5b040' }}
            >
              Bereit loszulegen?
            </span>
            <h2
              className="text-white mt-4 mb-6 leading-tight"
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
                letterSpacing: '-0.04em',
              }}
            >
              Ihre Energiezukunft
              <br />
              <span
                style={{
                  fontFamily: 'Instrument Serif, Arial, sans-serif',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  background: 'linear-gradient(135deg, #f5b040 0%, #e07018 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                beginnt heute.
              </span>
            </h2>
            <p
              className="text-base max-w-lg mx-auto mb-10"
              style={{ color: 'rgba(209,197,176,0.7)', lineHeight: 1.7 }}
            >
              Kostenlose Beratung, transparente Angebote, professionelle Installation —
              alles aus einer Hand.
            </p>
            <motion.button
              className="cta-pill inline-flex items-center gap-3 rounded-full px-10 py-5 font-black text-sm uppercase tracking-wider"
              style={{
                background: 'linear-gradient(135deg, #f5b040, #e07018)',
                color: '#2a1600',
                fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: '0.12em',
                fontSize: '13px',
              }}
              onClick={onAngebot}
              whileHover={{ scale: 1.06, y: -4 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="material-symbols-outlined icon-filled text-xl">wb_sunny</span>
              Jetzt kostenlos beraten lassen
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
