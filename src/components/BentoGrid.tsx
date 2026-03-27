import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FEATURE_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGa7gXnvuLmo3_aJVB7jybmm3jKMPWGzbFcOTn3tvgLOt29ssG3w7Qrg0u5RzX5ujk90id6QkEhnNamCMKpgWpFNTU3qS8WwN96DIlLzO0ZgQgJK4cZ-sB9mUrEBj9Qx8bqOAi8Kp5cqdvooEDiWX8AxPsx5AWu-PZ3dGjK-ddLhpbuN0p674pF9No8AGGkrN7Odq8iDXM8FAF2r7iXjkja1qD_g4gKT0A5U7x0FqXrJBbOVOFBER8JbIn_qPX6Wg52ouy8VuRvxt'

const products = [
  {
    tag: 'Speicher',
    tagIcon: 'battery_charging_full',
    title: 'SMA Home Storage',
    subtitle: 'Bis zu 16,98 kWh',
    features: ['16,98 kWh Kapazität', '8.000 Ladezyklen', '10 Jahre Garantie'],
    icon: 'battery_charging_full',
  },
  {
    tag: 'Solarmodul',
    tagIcon: 'solar_power',
    title: 'Trina Vertex S+',
    subtitle: '22% Wirkungsgrad',
    features: ['22% Modulwirkungsgrad', 'Full Black Bifazial', '25 Jahre Garantie'],
    icon: 'solar_power',
  },
  {
    tag: 'Wechselrichter',
    tagIcon: 'settings_input_component',
    title: 'SMA STP10.0',
    subtitle: '98,1% Effizienz',
    features: ['98,1% Wirkungsgrad', 'Smart Home Ready', 'WLAN & Ethernet'],
    icon: 'settings_input_component',
  },
]

const reviews = [
  { text: '"Ästhetisch die schönste Lösung am Markt. Die Full-Black Module sehen auf unserem Dach fantastisch aus!"', author: 'Lukas Müller', city: 'München' },
  { text: '"Hervorragender Service von der Planung bis zum Anschluss. Die Anlage liefert mehr als versprochen!"', author: 'Markus Weber', city: 'Berlin' },
  { text: '"Endlich unabhängig vom Stromnetz. Der Speicher war die beste Investition des Jahres."', author: 'Sarah Jenkins', city: 'Hamburg' },
]

const benefits = [
  { text: '99% Effizienz', icon: 'bolt' },
  { text: '2.400€ Sparen/J.', icon: 'savings' },
  { text: 'Top Qualität', icon: 'verified' },
]

function ProductSlider() {
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goto = (idx: number) => setCurrent(idx)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % products.length)
    }, 6000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  return (
    <div className="liquid-glass liquid-glass-hover rounded-3xl p-8 flex flex-col h-full min-h-[480px] relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <span
          className="text-[10px] font-bold uppercase tracking-[0.25em]"
          style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(255,255,255,0.55)' }}
        >
          Produkte
        </span>
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <span className="material-symbols-outlined text-sm" style={{ color: '#f5b040' }}>
            arrow_forward_ios
          </span>
        </div>
      </div>

      {/* Slides */}
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          {products.map((p, i) =>
            i === current ? (
              <motion.div
                key={i}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Big icon background */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.07]">
                  <span className="material-symbols-outlined text-[130px] text-white icon-filled">
                    {p.icon}
                  </span>
                </div>

                <div className="relative z-10">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-5"
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      color: '#f5b040',
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <span className="material-symbols-outlined text-xs">{p.tagIcon}</span>
                    {p.tag}
                  </span>

                  <h3
                    className="text-white leading-tight mb-1"
                    style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 'clamp(1.6rem, 3vw, 2rem)', letterSpacing: '-0.03em' }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-sm font-bold mb-6"
                    style={{ color: '#f5b040', fontFamily: 'DM Mono, monospace' }}
                  >
                    {p.subtitle}
                  </p>

                  <div className="space-y-2.5">
                    {p.features.map((f) => (
                      <div key={f} className="flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-sm icon-filled" style={{ color: '#f5b040' }}>
                          check_circle
                        </span>
                        <span className="text-sm font-medium" style={{ color: 'rgba(229,226,225,0.8)' }}>
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#"
                    className="inline-flex items-center gap-2 mt-8 text-[10px] font-bold uppercase tracking-[0.2em] hover:underline"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#f5b040' }}
                  >
                    Details ansehen
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </a>
                </div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex gap-2 justify-center mt-8">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => goto(i)}
            className={`slider-dot ${i === current ? 'dot-active' : 'dot-inactive'}`}
          />
        ))}
      </div>
    </div>
  )
}

function ReviewCard() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % reviews.length), 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="liquid-glass liquid-glass-hover rounded-3xl p-6 flex flex-col justify-between min-h-[220px] relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <span className="material-symbols-outlined text-lg" style={{ color: '#f5b040' }}>
              account_circle
            </span>
          </div>
          <span
            className="text-[9px] font-bold uppercase tracking-[0.25em]"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(209,197,176,0.6)' }}
          >
            Kundenerfahrungen
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="font-black text-white text-lg"
            style={{ fontFamily: 'DM Mono, monospace' }}
          >
            4.8
          </span>
          <span className="material-symbols-outlined icon-filled star-glow text-lg" style={{ color: '#F5C518' }}>
            star
          </span>
        </div>
      </div>

      <div className="relative overflow-hidden" style={{ minHeight: '80px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-sm italic leading-relaxed font-medium text-white">
              {reviews[current].text}
            </p>
            <p
              className="text-[10px] font-bold uppercase tracking-widest mt-3"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#f5b040' }}
            >
              — {reviews[current].author}, {reviews[current].city}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <a
        href="#feedback"
        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mt-4 hover:opacity-70 transition-opacity"
        style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#f5b040' }}
      >
        Bewertungen lesen
        <span className="material-symbols-outlined text-xs">open_in_new</span>
      </a>
    </div>
  )
}

function PerformanceCard() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const id = setInterval(() => {
      setDirection(1)
      setCurrent((c) => (c + 1) % benefits.length)
    }, 4000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      id="performance"
      className="liquid-glass liquid-glass-hover rounded-3xl p-6 relative overflow-hidden min-h-[220px] flex flex-col justify-between"
    >
      {/* Background chart */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 opacity-30 pointer-events-none">
        <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="chartGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F5C518" stopOpacity="0" />
              <stop offset="40%" stopColor="#F5C518" stopOpacity="1" />
              <stop offset="100%" stopColor="#f5b040" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="fillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F5C518" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F5C518" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 50 Q 15 48, 25 52 T 45 35 T 65 18 T 100 5"
            fill="none"
            stroke="url(#chartGrad)"
            strokeWidth="1.5"
            className="chart-line"
          />
          <path
            d="M0 60 L0 50 Q 15 48, 25 52 T 45 35 T 65 18 T 100 5 L100 60 Z"
            fill="url(#fillGrad)"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <span
          className="text-[9px] font-bold uppercase tracking-[0.25em]"
          style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(255,255,255,0.55)' }}
        >
          Performance
        </span>

        <div className="relative mt-2" style={{ height: '2.5rem', overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="absolute inset-0 flex items-center"
              initial={{ opacity: 0, y: direction * 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -direction * 30 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <h4
                className="text-white text-2xl leading-none tracking-tighter"
                style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, letterSpacing: '-0.03em' }}
              >
                {benefits[current].text}
              </h4>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Icons */}
      <div className="relative z-10 flex items-center gap-4 mt-auto">
        {benefits.map((b, i) => (
          <motion.span
            key={b.icon}
            className="material-symbols-outlined text-xl"
            style={{ color: i === current ? '#f5b040' : 'rgba(255,255,255,0.25)' }}
            animate={{ color: i === current ? '#f5b040' : 'rgba(255,255,255,0.25)' }}
            transition={{ duration: 0.4 }}
          >
            {b.icon}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

function FeatureCard() {
  return (
    <div
      id="speicher"
      className="feature-card rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-10 md:gap-14"
    >
      <div className="flex-1 text-center md:text-left">
        <span
          className="text-[9px] font-bold uppercase tracking-[0.3em]"
          style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#f5b040' }}
        >
          Innovation 2024
        </span>
        <h3
          className="text-white mt-4 leading-tight"
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
            letterSpacing: '-0.04em',
          }}
        >
          Smart Solar
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
            Speicherbatterie
          </span>
        </h3>
        <p
          className="mt-5 text-base leading-relaxed"
          style={{ color: 'rgba(209,197,176,0.8)', lineHeight: 1.7, maxWidth: '36ch' }}
        >
          Kompakt, skalierbar und hocheffizient. Nutzen Sie Ihren Sonnenstrom auch nachts
          mit unserem preisgekrönten Speichersystem.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <motion.button
            className="cta-pill flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-xs uppercase tracking-widest border"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              color: 'white',
              background: 'rgba(255,255,255,0.06)',
              borderColor: 'rgba(255,255,255,0.12)',
              letterSpacing: '0.15em',
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Details ansehen
          </motion.button>
          <motion.button
            className="cta-pill flex items-center gap-2 rounded-full px-7 py-3.5 font-black text-xs uppercase tracking-widest"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              background: 'linear-gradient(135deg, #f5b040, #e07018)',
              color: '#2a1600',
              letterSpacing: '0.12em',
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="material-symbols-outlined icon-filled text-base">wb_sunny</span>
            Angebot anfragen
          </motion.button>
        </div>
      </div>

      {/* Product image */}
      <div className="flex-1 w-full max-w-xs md:max-w-sm">
        <motion.div
          className="relative"
          whileHover={{ scale: 1.03, rotate: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="absolute -inset-2 blur-3xl opacity-0 hover:opacity-40 transition-opacity duration-700 rounded-3xl"
            style={{ background: 'radial-gradient(circle, #f5b040, #e07018)' }}
          />
          <img
            src={FEATURE_IMG}
            alt="Smart Solar Speicherbatterie"
            className="relative w-full h-auto rounded-2xl shadow-2xl"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          />
          {/* Floating badge */}
          <motion.div
            className="absolute -top-3 -right-3 rounded-2xl px-3 py-2"
            style={{
              background: 'linear-gradient(135deg, #f5b040, #e07018)',
              color: '#2a1600',
            }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="text-xs font-black" style={{ fontFamily: 'DM Mono, monospace' }}>
              16,98 kWh
            </div>
            <div className="text-[8px] font-bold uppercase tracking-wider" style={{ fontFamily: 'Space Grotesk' }}>
              Kapazität
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default function BentoGrid() {
  return (
    <section id="loesungen" className="relative z-10 max-w-7xl mx-auto px-6 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Product Slider - tall left column */}
        <motion.div
          className="lg:row-span-2 reveal"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <ProductSlider />
        </motion.div>

        {/* Reviews */}
        <motion.div
          className="reveal"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <ReviewCard />
        </motion.div>

        {/* Performance */}
        <motion.div
          className="reveal"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <PerformanceCard />
        </motion.div>

        {/* Feature Card - spans 2 cols */}
        <motion.div
          className="md:col-span-2 reveal"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <FeatureCard />
        </motion.div>
      </div>
    </section>
  )
}
