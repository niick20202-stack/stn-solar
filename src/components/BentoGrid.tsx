import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Data ────────────────────────────────────────────────────────────────────

const products = [
  {
    tag: 'Speicher', tagIcon: 'battery_charging_full', title: 'SMA Home Storage', subtitle: 'Strom auch nachts nutzen',
    features: ['Strom für 2 Tage auf Vorrat', 'Lebensdauer über 20 Jahre', '10 Jahre Vollgarantie'],
  },
  {
    tag: 'Solarmodul', tagIcon: 'solar_power', title: 'Trina Vertex S+', subtitle: 'Auch bei Bewölkung stark',
    features: ['Leistungsstark — auch ohne pralle Sonne', 'Elegantes schwarzes Design', '25 Jahre Leistungsgarantie'],
  },
  {
    tag: 'Wechselrichter', tagIcon: 'settings_input_component', title: 'SMA STP10.0', subtitle: 'Das Herzstück Ihrer Anlage',
    features: ['Holt alles aus Ihrer Sonne heraus', 'Kompatibel mit Smart-Home-Systemen', 'Einfache Steuerung per App'],
  },
  {
    tag: 'Netzanschluss', tagIcon: 'electrical_services', title: 'Netzanschluss & Einspeisung', subtitle: 'Alles aus einer Hand',
    features: ['Anmeldung beim Netzbetreiber', 'Einspeisevertrag & Förderantrag', 'Inbetriebnahme & offizielle Abnahme'],
  },
]

const reviews = [
  { text: '"Die Full-Black Module sehen auf unserem Dach fantastisch aus — und der Ertrag übertrifft alle Erwartungen!"', author: 'Lisa M.', city: 'Köln' },
  { text: '"Von der Planung bis zum Netzanschluss war alles perfekt. Der Solarplan war in Minuten fertig!"', author: 'Markus W.', city: 'Düsseldorf' },
  { text: '"In weniger als einer Woche war die Anlage in Betrieb. Endlich unabhängig vom Stromnetz."', author: 'Stefan K.', city: 'Neuss' },
]

// Curve data — Solarertrag
const CURVE_DATA    = [210, 380, 520, 610, 640, 580, 490, 370, 250, 190, 160, 200]
const CURVE_LABELS  = ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez']
const CURVE_YRANGE: [number, number] = [100, 700]

// Bar data — Ersparnis
const BAR_DATA   = [720, 1080, 1680, 2220, 2520, 2400, 2160, 1920, 1440, 1020, 660, 780]
const BAR_LABELS = ['J','F','M','A','M','J','J','A','S','O','N','D']
const BAR_YRANGE: [number, number] = [0, 3000]

// SVG viewport
const VW = 300, VH = 90
const padL = 4, padR = 4, padT = 12, padB = 8

function buildCurve(data: number[], yRange: [number, number]) {
  const toY = (v: number) => VH - padB - ((v - yRange[0]) / (yRange[1] - yRange[0])) * (VH - padT - padB)
  const toX = (i: number) => padL + (i / (data.length - 1)) * (VW - padL - padR)
  const pts = data.map((v, i) => ({ x: toX(i), y: toY(v), v }))
  const line = pts.reduce((acc, pt, i) => {
    if (i === 0) return `M${pt.x},${pt.y}`
    const prev = pts[i - 1]
    const cpx = (prev.x + pt.x) / 2
    return `${acc} C${cpx},${prev.y} ${cpx},${pt.y} ${pt.x},${pt.y}`
  }, '')
  const area = `${line} L${pts[pts.length-1].x},${VH} L${pts[0].x},${VH} Z`
  return { pts, line, area }
}

function buildBars(data: number[], yRange: [number, number]) {
  const barW   = (VW - padL - padR) / (data.length * 1.55)
  const barStep = (VW - padL - padR - barW) / (data.length - 1)
  return data.map((v, i) => {
    const bh = ((v - yRange[0]) / (yRange[1] - yRange[0])) * (VH - padT - padB)
    return { x: padL + i * barStep, y: VH - padB - bh, h: bh, w: barW, v }
  })
}

// ── Cards ────────────────────────────────────────────────────────────────────

function ProductSlider() {
  const [current, setCurrent] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const cardRef2 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef2.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        intervalRef.current = setInterval(() => setCurrent((c) => (c + 1) % products.length), 6000)
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => { obs.disconnect(); if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const p = products[current]

  return (
    <div
      ref={cardRef2}
      className="glow-card liquid-glass liquid-glass-hover rounded-3xl p-6 flex flex-col h-full"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onClick={() => setExpanded((e) => !e)}
      style={{ cursor: 'default', minHeight: '240px' }}
    >
      <div className="flex items-center justify-between mb-5">
        <span className="text-[10px] font-bold uppercase tracking-[0.25em]"
          style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(26,26,26,0.5)' }}>
          Produkte
        </span>
        <motion.span className="material-symbols-outlined text-sm" style={{ color: '#f5b040' }}
          animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }}>
          chevron_right
        </motion.span>
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div key={p.title}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest mb-3"
              style={{ fontFamily: 'Space Grotesk', color: '#f5b040', background: 'rgba(245,176,64,0.07)', border: '1px solid rgba(245,176,64,0.15)' }}>
              <span className="material-symbols-outlined text-xs">{p.tagIcon}</span>
              {p.tag}
            </span>
            <h3 className="leading-tight"
              style={{ color: '#1a1a1a', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', letterSpacing: '-0.03em' }}>
              {p.title}
            </h3>
            <p className="text-xs font-bold mt-1.5" style={{ color: '#f5b040', fontFamily: 'DM Mono' }}>
              {p.subtitle}
            </p>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.32, ease: [0.16,1,0.3,1] }} style={{ overflow: 'hidden' }}>
                  <div className="space-y-2 mt-4">
                    {p.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm icon-filled" style={{ color: '#f5b040' }}>check_circle</span>
                        <span className="text-xs" style={{ color: 'rgba(26,26,26,0.75)', fontFamily: 'DM Sans' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-2 mt-5">
        {products.map((_, i) => (
          <button key={i} onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
            className={`slider-dot ${i === current ? 'dot-active' : 'dot-inactive'}`} />
        ))}
      </div>
    </div>
  )
}

function ReviewCard() {
  const [current, setCurrent] = useState(0)
  const reviewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = reviewRef.current; if (!el) return
    let id: ReturnType<typeof setInterval>
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        id = setInterval(() => setCurrent((c) => (c + 1) % reviews.length), 5000)
      } else {
        clearInterval(id)
      }
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => { obs.disconnect(); clearInterval(id) }
  }, [])

  return (
    <div ref={reviewRef} className="glow-card liquid-glass liquid-glass-hover rounded-3xl p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(245,176,64,0.06)', border: '1px solid rgba(245,176,64,0.13)' }}>
            <span className="material-symbols-outlined text-base" style={{ color: '#f5b040' }}>account_circle</span>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-[0.25em]"
            style={{ fontFamily: 'Space Grotesk', color: 'rgba(26,26,26,0.6)' }}>Kundenerfahrungen</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-black text-base" style={{ color: '#1a1a1a', fontFamily: 'DM Mono' }}>4.8</span>
          <span className="material-symbols-outlined icon-filled star-glow text-base" style={{ color: '#f5b040' }}>star</span>
        </div>
      </div>

      {/* Review text — centered vertically */}
      <div className="flex-1 flex items-center overflow-hidden" style={{ position: 'relative', minHeight: '56px' }}>
        <AnimatePresence mode="wait">
          <motion.div key={current}
            style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.16,1,0.3,1] }}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', color: '#1a1a1a', lineHeight: 1.55, letterSpacing: '-0.02em' }}>
              {reviews[current].text}
            </p>
            <p className="text-xs font-bold uppercase tracking-widest mt-3"
              style={{ fontFamily: 'Space Grotesk', color: '#f5b040' }}>
              — {reviews[current].author}, {reviews[current].city}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-3"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <button onClick={() => document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest hover:opacity-70 transition-opacity"
          style={{ fontFamily: 'Space Grotesk', color: '#f5b040', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          Bewertungen lesen
          <span className="material-symbols-outlined text-xs">open_in_new</span>
        </button>
        {/* Dot indicators */}
        <div className="flex gap-1.5">
          {reviews.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className="w-1.5 h-1.5 rounded-full transition-all"
              style={{
                background: i === current ? '#f5b040' : 'rgba(0,0,0,0.12)',
                width: i === current ? '16px' : '6px',
                transition: 'all 0.3s ease',
                border: 'none', cursor: 'pointer', padding: 0,
              }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function SolarertragCard() {
  const [entered, setEntered] = useState(false)
  const [mouseX, setMouseX] = useState<number | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const svgRef  = useRef<SVGSVGElement>(null)
  const col = '#f5b040'

  const { pts, line, area } = useMemo(() => buildCurve(CURVE_DATA, CURVE_YRANGE), [])

  const hoveredPt = mouseX !== null
    ? pts.reduce((c, p) => Math.abs(p.x - mouseX) < Math.abs(c.x - mouseX) ? p : c)
    : null

  useEffect(() => {
    const el = cardRef.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setEntered(true) }, { threshold: 0.3 })
    obs.observe(el); return () => obs.disconnect()
  }, [])

  const onMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const r = svgRef.current?.getBoundingClientRect(); if (!r) return
    setMouseX(Math.max(padL, Math.min(VW - padR, ((e.clientX - r.left) / r.width) * VW)))
  }, [])

  return (
    <div ref={cardRef} className="glow-card liquid-glass liquid-glass-hover rounded-3xl p-5 flex flex-col gap-2 h-full" style={{ minHeight: '280px' }}>
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-bold uppercase tracking-[0.25em]"
          style={{ fontFamily: 'Space Grotesk', color: 'rgba(26,26,26,0.5)' }}>Solarertrag</span>
        <div className="flex items-center gap-1.5">
          <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: col }}
            animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          <span className="text-[8px] font-bold uppercase tracking-widest" style={{ fontFamily: 'Space Grotesk', color: col }}>Live</span>
        </div>
      </div>

      <div className="flex items-baseline gap-1.5">
        <span style={{ fontFamily: 'DM Sans', fontSize: 'clamp(1.4rem,3vw,1.8rem)', fontWeight: 900, letterSpacing: '-0.04em', color: col, lineHeight: 1 }}>
          5.200 kWh
        </span>
        <span style={{ fontFamily: 'Space Grotesk', color: 'rgba(26,26,26,0.4)', fontSize: '10px', fontWeight: 700 }}>/ Jahr</span>
      </div>

      <div className="flex-1 relative" style={{ minHeight: '100px' }}>
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet"
          style={{ width: '100%', height: '100%', cursor: 'crosshair', display: 'block' }}
          onMouseMove={onMove} onMouseLeave={() => setMouseX(null)}>
          <defs>
            <linearGradient id="se-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={col} stopOpacity="0.14" />
              <stop offset="80%" stopColor={col} stopOpacity="0.02" />
              <stop offset="100%" stopColor={col} stopOpacity="0" />
            </linearGradient>
          </defs>
          {entered && <>
            <path d={area} fill="url(#se-fill)" />
            <motion.path d={line} fill="none" stroke={col} strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.9"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1.7, ease: [0.16,1,0.3,1] }} />
            <motion.circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r="6"
              fill={col} fillOpacity="0.18"
              animate={{ r:[5,10,5], fillOpacity:[0.18,0,0.18] }} transition={{ delay: 1.8, duration: 2.4, repeat: Infinity }} />
            <motion.circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r="3.5"
              fill={col} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} />
          </>}
          {hoveredPt && <>
            <line x1={hoveredPt.x} y1={padT} x2={hoveredPt.x} y2={VH-padB}
              stroke="rgba(0,0,0,0.12)" strokeWidth="1" strokeDasharray="3 4" />
            <circle cx={hoveredPt.x} cy={hoveredPt.y} r="6" fill={col} fillOpacity="0.15" />
            <circle cx={hoveredPt.x} cy={hoveredPt.y} r="3.5" fill={col} />
          </>}
        </svg>
        {hoveredPt && (
          <div className="absolute top-0 px-2 py-1 rounded-lg pointer-events-none"
            style={{ left: `clamp(0px, calc(${(hoveredPt.x / VW) * 100}% - 30px), calc(100% - 80px))`, background: 'rgba(255,255,255,0.95)', border: `1px solid ${col}38`, backdropFilter: 'blur(8px)', fontFamily: 'DM Mono', fontSize: '10px', fontWeight: 700, color: col, whiteSpace: 'nowrap' }}>
            {CURVE_LABELS[pts.indexOf(hoveredPt)]} · {hoveredPt.v} kWh
          </div>
        )}
      </div>
    </div>
  )
}

function ErsparnisChard() {
  const [entered, setEntered] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const col = '#4ade80'

  const bars = useMemo(() => buildBars(BAR_DATA, BAR_YRANGE), [])

  useEffect(() => {
    const el = cardRef.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setEntered(true) }, { threshold: 0.3 })
    obs.observe(el); return () => obs.disconnect()
  }, [])

  return (
    <div ref={cardRef} className="glow-card liquid-glass liquid-glass-hover rounded-3xl p-5 flex flex-col gap-2 h-full" style={{ minHeight: '280px' }}>
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-bold uppercase tracking-[0.25em]"
          style={{ fontFamily: 'Space Grotesk', color: 'rgba(26,26,26,0.5)' }}>Ø Ersparnis</span>
        <span className="material-symbols-outlined icon-filled text-sm" style={{ color: col }}>savings</span>
      </div>

      <div className="flex items-baseline gap-1.5">
        <span style={{ fontFamily: 'DM Sans', fontSize: 'clamp(1.4rem,3vw,1.8rem)', fontWeight: 900, letterSpacing: '-0.04em', color: col, lineHeight: 1 }}>
          1.800 €
        </span>
        <span style={{ fontFamily: 'Space Grotesk', color: 'rgba(26,26,26,0.4)', fontSize: '10px', fontWeight: 700 }}>/ Jahr</span>
      </div>

      <div className="flex-1 relative" style={{ minHeight: '100px' }}>
        <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="sp-bar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={col} stopOpacity="0.9" />
              <stop offset="100%" stopColor={col} stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {entered && bars.map((b, i) => (
            <motion.rect key={BAR_LABELS[i]} x={b.x} width={b.w} rx={2.5}
              initial={{ y: VH - padB, height: 0 }}
              animate={{ y: b.y, height: b.h }}
              transition={{ delay: i * 0.04, duration: 0.55, ease: [0.16,1,0.3,1] }}
              fill={hoveredIdx === i ? col : 'url(#sp-bar)'}
              fillOpacity={hoveredIdx === i ? 1 : 0.6}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </svg>
        {hoveredIdx !== null && (
          <div className="absolute top-0 px-2 py-1 rounded-lg pointer-events-none"
            style={{ left: `clamp(0px, calc(${(bars[hoveredIdx].x / VW) * 100}% - 20px), calc(100% - 60px))`, background: 'rgba(255,255,255,0.95)', border: `1px solid ${col}38`, backdropFilter: 'blur(8px)', fontFamily: 'DM Mono', fontSize: '10px', fontWeight: 700, color: col, whiteSpace: 'nowrap' }}>
            {BAR_LABELS[hoveredIdx]} · {BAR_DATA[hoveredIdx].toLocaleString('de-DE')} €
          </div>
        )}
      </div>
    </div>
  )
}

function GarantieCard() {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasRun = useRef(false)
  const col = '#c084fc'

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !hasRun.current) {
        hasRun.current = true
        const dur = 1200, start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1)
          setCount(Math.round((1 - Math.pow(1 - p, 3)) * 25))
          if (p < 1) requestAnimationFrame(tick)
          else setCount(25)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.4 })
    obs.observe(el); return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="glow-card liquid-glass liquid-glass-hover rounded-3xl p-5 flex flex-col gap-2 h-full relative overflow-hidden" style={{ minHeight: '280px' }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div style={{ width: '180px', height: '180px', borderRadius: '50%', background: `radial-gradient(circle, ${col}14 0%, transparent 70%)` }} />
      </div>

      <div className="flex items-center justify-between relative z-10">
        <span className="text-[9px] font-bold uppercase tracking-[0.25em]"
          style={{ fontFamily: 'Space Grotesk', color: 'rgba(26,26,26,0.5)' }}>Garantie</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 gap-3">
        {/* Icon */}
        <div style={{
          width: '72px', height: '72px', borderRadius: '50%',
          background: `${col}12`, border: `1.5px solid ${col}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span className="material-symbols-outlined icon-filled" style={{ fontSize: '36px', color: col }}>
            verified_user
          </span>
        </div>

        {/* Count */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontWeight: 900, fontSize: '2.6rem', color: col, letterSpacing: '-0.04em', lineHeight: 1 }}>
            {count}
          </div>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: `${col}99`, marginTop: '2px' }}>
            Jahre Garantie*
          </div>
        </div>

        <p className="text-[9px] text-center" style={{ fontFamily: 'Space Grotesk', color: 'rgba(26,26,26,0.4)' }}>
          * Leistungsgarantie auf Solarmodule
        </p>
      </div>
    </div>
  )
}

// ── Grid ─────────────────────────────────────────────────────────────────────

export default function BentoGrid({ onAngebot: _onAngebot }: { onAngebot: () => void }) {
  const cardAnim = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay },
  })

  return (
    <section id="loesungen" className="relative z-10 max-w-7xl mx-auto px-6 pt-20 md:pt-28 pb-16">
      {/* Section intro */}
      <motion.div
        className="mb-10 md:mb-14"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span
          className="text-[10px] font-bold uppercase tracking-[0.35em]"
          style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#f5b040' }}
        >
          Unsere Lösungen
        </span>
        <h2
          className="font-black mt-2 leading-tight"
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            letterSpacing: '-0.04em',
            color: '#1a1a1a',
          }}
        >
          Alles aus einer Hand —{' '}
          <span style={{
            fontFamily: 'Instrument Serif, Arial, sans-serif',
            fontStyle: 'italic',
            fontWeight: 400,
            background: 'linear-gradient(135deg, #f5b040 0%, #e07018 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            von Modul bis Netz.
          </span>
        </h2>
        <p
          className="mt-3 text-sm max-w-lg"
          style={{ color: 'rgba(26,26,26,0.5)', lineHeight: 1.7, fontFamily: 'DM Sans, sans-serif' }}
        >
          Premium-Komponenten, direkte Montage, echte Garantien — und Zahlen, die für sich sprechen.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Row 1 */}
        <motion.div className="reveal" {...cardAnim(0)}>
          <ProductSlider />
        </motion.div>
        <motion.div className="md:col-span-2 reveal" {...cardAnim(0.1)}>
          <ReviewCard />
        </motion.div>

        {/* Row 2: 3 performance bentos */}
        <motion.div className="reveal" {...cardAnim(0.0)}>
          <SolarertragCard />
        </motion.div>
        <motion.div className="reveal" {...cardAnim(0.1)}>
          <ErsparnisChard />
        </motion.div>
        <motion.div className="reveal" {...cardAnim(0.2)}>
          <GarantieCard />
        </motion.div>

      </div>
    </section>
  )
}
