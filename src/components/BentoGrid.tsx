import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
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

const perfStats = [
  { value: '99%',    label: 'Wirkungsgrad',  icon: 'bolt',     color: '#f5b040' },
  { value: '2.400€', label: 'Ersparnis/Jahr', icon: 'savings',  color: '#5dca8a' },
  { value: '25 J.',  label: 'Garantie',       icon: 'verified', color: '#4a9eff' },
]

type ChartDef = {
  type: 'curve' | 'bars' | 'degradation'
  data: number[]
  labels: string[]
  yRange: [number, number]
  formatTip: (v: number, l: string) => string
  guaranteeLine?: number
}

// Realistic chart data per stat
const PERF_CHARTS: ChartDef[] = [
  {
    // Monthly solar yield (% of annual peak, Germany average)
    type: 'curve',
    data: [17, 27, 50, 73, 93, 100, 99, 90, 67, 43, 20, 13],
    labels: ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'],
    yRange: [0, 112],
    formatTip: (v, l) => `${l}: ${v}%`,
  },
  {
    // Monthly savings in € (10kWp system, 0.30€/kWh)
    type: 'bars',
    data: [75, 120, 225, 330, 420, 465, 450, 405, 300, 195, 90, 60],
    labels: ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'],
    yRange: [0, 510],
    formatTip: (v, l) => `${l}: ${v} €`,
  },
  {
    // Panel efficiency degradation over 25 years (−0.8%/yr)
    type: 'degradation',
    data: Array.from({ length: 26 }, (_, i) =>
      Math.round((100 - i * 0.8) * 10) / 10
    ),
    labels: Array.from({ length: 26 }, (_, i) => `${i}`),
    yRange: [74, 104],
    formatTip: (v, l) => `Jahr ${l}: ${v}%`,
    guaranteeLine: 80,
  },
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
    <div className="glow-card liquid-glass liquid-glass-hover rounded-3xl p-8 flex flex-col h-full min-h-[480px] relative overflow-hidden">
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
                key={p.title}
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

                  <button
                    onClick={() => document.getElementById('loesungen')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center gap-2 mt-8 text-[10px] font-bold uppercase tracking-[0.2em] hover:underline"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#f5b040', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Details ansehen
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex gap-2 justify-center mt-8">
        {products.map((p, i) => (
          <button
            key={p.title}
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
    <div className="glow-card liquid-glass liquid-glass-hover rounded-3xl p-6 flex flex-col justify-between min-h-[220px] relative overflow-hidden">
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

      <button
        onClick={() => document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' })}
        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mt-4 hover:opacity-70 transition-opacity"
        style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#f5b040', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        Bewertungen lesen
        <span className="material-symbols-outlined text-xs">open_in_new</span>
      </button>
    </div>
  )
}

function PerformanceCard() {
  const [active, setActive] = useState(0)
  const [entered, setEntered] = useState(false)
  const [mouseX, setMouseX] = useState<number | null>(null)
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const VW = 300, VH = 90
  const padL = 4, padR = 4, padT = 12, padB = 8

  const chart = PERF_CHARTS[active]
  const col = perfStats[active].color

  // Memoize expensive chart calculations — only recompute when active tab changes
  const { pts, linePath, areaPath, barW, barStep } = useMemo(() => {
    const toY = (v: number) => {
      const [yMin, yMax] = chart.yRange
      return VH - padB - ((v - yMin) / (yMax - yMin)) * (VH - padT - padB)
    }
    const toX = (i: number, total: number) =>
      padL + (i / (total - 1)) * (VW - padL - padR)

    const pts = chart.data.map((v, i) => ({
      x: toX(i, chart.data.length),
      y: toY(v),
      v,
      label: chart.labels[i],
    }))

    const linePath = pts.reduce((acc, pt, i) => {
      if (i === 0) return `M${pt.x},${pt.y}`
      const prev = pts[i - 1]
      const cpx = (prev.x + pt.x) / 2
      return `${acc} C${cpx},${prev.y} ${cpx},${pt.y} ${pt.x},${pt.y}`
    }, '')
    const areaPath = `${linePath} L${pts[pts.length-1].x},${VH} L${pts[0].x},${VH} Z`

    const totalBars = chart.data.length
    const barW = (VW - padL - padR) / (totalBars * 1.55)
    const barStep = (VW - padL - padR - barW) / (totalBars - 1)

    return { pts, linePath, areaPath, barW, barStep }
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps

  const hoveredPt = mouseX !== null && chart.type === 'curve'
    ? pts.reduce((c, p) => Math.abs(p.x - mouseX) < Math.abs(c.x - mouseX) ? p : c)
    : null

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setEntered(true) }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => { setMouseX(null); setHoveredBar(null) }, [active])

  const handleSvgMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const r = svgRef.current?.getBoundingClientRect()
    if (!r) return
    setMouseX(Math.max(padL, Math.min(VW - padR, ((e.clientX - r.left) / r.width) * VW)))
  }, [])

  const tooltipPt = hoveredPt ?? (hoveredBar !== null ? pts[hoveredBar] : null)

  return (
    <div
      ref={cardRef}
      id="performance"
      className="glow-card liquid-glass liquid-glass-hover rounded-3xl p-5 relative overflow-hidden flex flex-col gap-2"
      style={{ minHeight: '220px' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-bold uppercase tracking-[0.25em]"
          style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(255,255,255,0.45)' }}>
          Performance
        </span>
        <div className="flex items-center gap-1.5">
          <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: '#4ade80' }}
            animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          <span className="text-[8px] font-bold uppercase tracking-widest"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#4ade80' }}>Live</span>
        </div>
      </div>

      {/* Value */}
      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28, ease: [0.16,1,0.3,1] }}
          className="flex items-baseline gap-2">
          <span style={{ fontFamily: 'DM Sans', fontSize: 'clamp(1.5rem,3vw,1.9rem)', fontWeight: 900, letterSpacing: '-0.04em', color: col, lineHeight: 1 }}>
            {perfStats[active].value}
          </span>
          <span style={{ fontFamily: 'Space Grotesk', color: 'rgba(255,255,255,0.35)', fontSize: '11px', fontWeight: 700 }}>
            {perfStats[active].label}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Chart */}
      <div className="flex-1 relative" style={{ minHeight: '72px' }}>
        <AnimatePresence mode="wait">
          <motion.svg key={active} ref={svgRef}
            viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="none"
            className="w-full h-full cursor-crosshair"
            onMouseMove={handleSvgMove}
            onMouseLeave={() => { setMouseX(null); setHoveredBar(null) }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}
          >
            <defs>
              <linearGradient id={`c-fill-${active}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={col} stopOpacity="0.25" />
                <stop offset="100%" stopColor={col} stopOpacity="0" />
              </linearGradient>
              <linearGradient id={`c-line-${active}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={col} stopOpacity="0.1" />
                <stop offset="40%" stopColor={col} stopOpacity="1" />
                <stop offset="100%" stopColor={col} stopOpacity="0.65" />
              </linearGradient>
              <linearGradient id={`c-bar-${active}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={col} stopOpacity="0.9" />
                <stop offset="100%" stopColor={col} stopOpacity="0.3" />
              </linearGradient>
              <filter id="c-glow">
                <feGaussianBlur stdDeviation="1.3" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* ── CURVE: monthly yield ── */}
            {chart.type === 'curve' && entered && <>
              <path d={areaPath} fill={`url(#c-fill-${active})`} />
              <motion.path d={linePath} fill="none" stroke={`url(#c-line-${active})`}
                strokeWidth="1.5" strokeLinecap="round" filter="url(#c-glow)"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 1.7, ease: [0.16,1,0.3,1] }} />
              {/* Pulsing end dot */}
              <motion.circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r="5"
                fill={col} fillOpacity="0.15"
                animate={{ r:[4,8,4], fillOpacity:[0.15,0,0.15] }}
                transition={{ delay: 1.8, duration: 2.4, repeat: Infinity }} />
              <motion.circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r="2.5"
                fill={col} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} />
            </>}

            {/* ── BARS: monthly savings ── */}
            {chart.type === 'bars' && entered && chart.data.map((v, i) => {
              const bx = padL + i * barStep
              const bh = ((v - chart.yRange[0]) / (chart.yRange[1] - chart.yRange[0])) * (VH - padT - padB)
              const by = VH - padB - bh
              const isH = hoveredBar === i
              return (
                <motion.rect key={chart.labels[i]} x={bx} width={barW} rx={2.5}
                  initial={{ y: VH - padB, height: 0 }}
                  animate={{ y: by, height: bh }}
                  transition={{ delay: i * 0.04, duration: 0.55, ease: [0.16,1,0.3,1] }}
                  fill={isH ? col : `url(#c-bar-${active})`}
                  fillOpacity={isH ? 1 : 0.55}
                  onMouseEnter={() => setHoveredBar(i)}
                  style={{ cursor: 'pointer' }}
                />
              )
            })}

            {/* ── 25-YEAR CELL GRID ── */}
            {chart.type === 'degradation' && (() => {
              const COLS = 5, ROWS = 5
              const gap = 5
              const cW2 = (VW - padL - padR - (COLS - 1) * gap) / COLS
              const cH2 = (VH - padT - 12 - (ROWS - 1) * gap) / ROWS
              // color by warranty count
              const cellCol = (yr: number) =>
                yr <= 5 ? '#c084fc' : yr <= 10 ? '#4a9eff' : '#f5b040'
              const cellBaseOp = (yr: number) =>
                yr <= 5 ? 0.75 : yr <= 10 ? 0.55 : 0.32

              return <>
                {Array.from({ length: 25 }, (_, idx) => {
                  const yr = idx + 1
                  const c = idx % COLS
                  const r = Math.floor(idx / COLS)
                  const x = padL + c * (cW2 + gap)
                  const y = padT + r * (cH2 + gap)
                  const isH = hoveredBar === idx
                  const cc = cellCol(yr)
                  return (
                    <g key={yr}
                      onMouseEnter={() => setHoveredBar(idx)}
                      onMouseLeave={() => setHoveredBar(null)}
                      style={{ cursor: 'default' }}
                    >
                      {/* Glow ring when hovered */}
                      {isH && (
                        <rect x={x - 1.5} y={y - 1.5} width={cW2 + 3} height={cH2 + 3} rx={4}
                          fill="none" stroke={cc} strokeWidth="1.5" strokeOpacity="0.9"
                          style={{ filter: `drop-shadow(0 0 6px ${cc})` }}
                        />
                      )}
                      {/* Cell */}
                      <motion.rect
                        x={x} y={y} width={cW2} height={cH2} rx={2.5}
                        fill={cc}
                        initial={{ opacity: 0, scale: 0.4 }}
                        animate={{ opacity: isH ? 1 : cellBaseOp(yr), scale: 1 }}
                        transition={{
                          opacity: { duration: isH ? 0.1 : 0.35, delay: entered ? 0 : idx * 0.018 },
                          scale: { delay: idx * 0.018, duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                        }}
                      />
                      {/* Year label for col 4 (J5, J10, J15, J20, J25) */}
                      {c === 4 && (
                        <text x={x + cW2 / 2} y={y + cH2 / 2 + 0.5} textAnchor="middle" dominantBaseline="middle"
                          style={{ fontSize: '6px', fontFamily: 'DM Mono', fontWeight: 700, fill: isH ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.45)', pointerEvents: 'none' }}>
                          J{yr}
                        </text>
                      )}
                    </g>
                  )
                })}

                {/* Legend row */}
                {[
                  { label: 'J1–J5 · 4 Garantien', color: '#c084fc' },
                  { label: 'J6–J10 · 3',           color: '#4a9eff' },
                  { label: 'J11–J25 · Modul',       color: '#f5b040' },
                ].map((leg, i) => (
                  <g key={leg.label}>
                    <circle cx={padL + i * 95 + 4} cy={VH - 4} r={2.5} fill={leg.color} fillOpacity={0.75} />
                    <text x={padL + i * 95 + 10} y={VH - 1} dominantBaseline="middle"
                      style={{ fontSize: '6px', fontFamily: 'Space Grotesk', fontWeight: 700, fill: 'rgba(255,255,255,0.28)' }}>
                      {leg.label}
                    </text>
                  </g>
                ))}
              </>
            })()}

            {/* ── SHARED crosshair (curve + degradation) ── */}
            {hoveredPt && <>
              <line x1={hoveredPt.x} y1={padT} x2={hoveredPt.x} y2={VH-padB}
                stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 4" />
              <circle cx={hoveredPt.x} cy={hoveredPt.y} r="5" fill={col} fillOpacity="0.15" />
              <circle cx={hoveredPt.x} cy={hoveredPt.y} r="2.5" fill={col} />
            </>}
          </motion.svg>
        </AnimatePresence>

        {/* Tooltip — curve & bars */}
        {active !== 2 && tooltipPt && (
          <div className="absolute top-0 px-2 py-1 rounded-lg pointer-events-none"
            style={{
              left: `clamp(0px, calc(${(tooltipPt.x / VW) * 100}% - 30px), calc(100% - 76px))`,
              background: 'rgba(12,12,12,0.93)',
              border: `1px solid ${col}38`,
              backdropFilter: 'blur(8px)',
              fontFamily: 'DM Mono, monospace',
              fontSize: '10px', fontWeight: 700, color: col,
              whiteSpace: 'nowrap',
            }}>
            {chart.formatTip(tooltipPt.v, tooltipPt.label)}
          </div>
        )}
        {/* Tooltip — warranty timeline */}
        {active === 2 && mouseX !== null && (() => {
          const cW = VW - padL - padR
          const yr = Math.round(Math.min(25, Math.max(0, (mouseX - padL) / cW * 25)))
          const cnt = [25, 10, 10, 5].filter(y => yr <= y).length
          return (
            <div className="absolute top-0 px-2 py-1 rounded-lg pointer-events-none"
              style={{
                left: `clamp(0px, calc(${(mouseX / VW) * 100}% - 32px), calc(100% - 96px))`,
                background: 'rgba(12,12,12,0.93)',
                border: `1px solid ${col}38`,
                backdropFilter: 'blur(8px)',
                fontFamily: 'DM Mono, monospace',
                fontSize: '10px', fontWeight: 700, color: col,
                whiteSpace: 'nowrap',
              }}>
              Jahr {yr} · {cnt}/4 aktiv
            </div>
          )
        })()}
      </div>

      {/* Stat pills */}
      <div className="flex gap-1.5 flex-wrap">
        {perfStats.map((s, i) => (
          <button key={s.label} onClick={() => setActive(i)}
            className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              background: active === i ? `${s.color}15` : 'rgba(255,255,255,0.04)',
              border: active === i ? `1px solid ${s.color}35` : '1px solid rgba(255,255,255,0.07)',
              color: active === i ? s.color : 'rgba(255,255,255,0.35)',
              cursor: 'pointer', outline: 'none',
              transition: 'all 0.2s ease',
            }}>
            <span className="material-symbols-outlined icon-filled" style={{ fontSize: '11px' }}>{s.icon}</span>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function FeatureCard({ onAngebot }: { onAngebot: () => void }) {
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
            onClick={onAngebot}
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
            loading="lazy"
            decoding="async"
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

export default function BentoGrid({ onAngebot }: { onAngebot: () => void }) {
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
          <FeatureCard onAngebot={onAngebot} />
        </motion.div>
      </div>
    </section>
  )
}
