import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { lazy, Suspense } from 'react'
import Navbar from '../components/Navbar'
import CursorGlow from '../components/CursorGlow'
import ReonicModal from '../components/ReonicModal'
import CookieBanner from '../components/CookieBanner'

const Footer = lazy(() => import('../components/Footer'))

// ── Constants ──────────────────────────────────────────────────────
const ELECTRICITY_PRICE = 0.32   // €/kWh
const FEED_IN_RATE      = 0.082  // €/kWh EEG Vergütung
const BASE_YIELD        = 950    // kWh/kWp/Jahr (DE Durchschnitt)
const CO2_FACTOR        = 0.366  // kg CO₂/kWh Netzstrom
const COST_PER_KWP      = 1450   // €/kWp Installationskosten
const STORAGE_COST      = 7500   // € Speicher Pauschal

const ORIENTATIONS = [
  { label: 'Süd', icon: 'south', factor: 1.00 },
  { label: 'Südost / Südwest', icon: 'south_east', factor: 0.93 },
  { label: 'Ost / West', icon: 'east', factor: 0.85 },
  { label: 'Nord', icon: 'north', factor: 0.68 },
]

const HOUSEHOLD_PRESETS = [
  { label: '1 Person',    value: 1500 },
  { label: '2 Personen',  value: 2500 },
  { label: '3 Personen',  value: 3500 },
  { label: '4 Personen',  value: 4500 },
  { label: '5+ Personen', value: 6000 },
]

// ── Animated number hook ───────────────────────────────────────────
function useAnimatedNumber(target: number, decimals = 0) {
  const [display, setDisplay] = useState(target)
  const fromRef = useRef(target)
  const rafRef  = useRef(0)

  useEffect(() => {
    cancelAnimationFrame(rafRef.current)
    const from = fromRef.current
    fromRef.current = target
    if (from === target) return
    let start = 0
    const dur = 550
    rafRef.current = requestAnimationFrame(function tick(now) {
      if (!start) start = now
      const p = Math.min((now - start) / dur, 1)
      const e = 1 - Math.pow(1 - p, 3)
      const v = from + (target - from) * e
      setDisplay(decimals ? Math.round(v * 10 ** decimals) / 10 ** decimals : Math.round(v))
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    })
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, decimals])

  return display
}

// ── Calculation ────────────────────────────────────────────────────
function calculate(consumption: number, orientIdx: number, hasStorage: boolean) {
  const orientFactor    = ORIENTATIONS[orientIdx].factor
  const kWp             = Math.max(3, Math.round((consumption / 900) * 2) / 2)
  const annualProd      = kWp * BASE_YIELD * orientFactor
  const selfRate        = hasStorage ? 0.72 : 0.30
  const selfConsumed    = Math.min(annualProd * selfRate, consumption)
  const feedIn          = annualProd - selfConsumed
  const annualSavings   = Math.round(selfConsumed * ELECTRICITY_PRICE + feedIn * FEED_IN_RATE)
  const co2Kg           = Math.round(annualProd * CO2_FACTOR)
  const systemCost      = Math.round(kWp * COST_PER_KWP + (hasStorage ? STORAGE_COST : 0))
  return { kWp, annualProd: Math.round(annualProd), annualSavings, co2Kg, systemCost }
}

// ── Toggle switch ──────────────────────────────────────────────────
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="relative flex-shrink-0"
      style={{ width: 48, height: 26, border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
    >
      <div
        style={{
          width: '100%', height: '100%', borderRadius: 13,
          background: checked ? 'linear-gradient(135deg,#f5b040,#e07018)' : 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.12)',
          transition: 'background 0.25s ease',
        }}
      />
      <motion.div
        style={{
          position: 'absolute', top: 3, width: 20, height: 20, borderRadius: 10,
          background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
        }}
        animate={{ left: checked ? 25 : 3 }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
      />
    </button>
  )
}

// ── Result card ────────────────────────────────────────────────────
function ResultCard({ icon, label, value, sub, color }: {
  icon: string; label: string; value: string; sub?: string; color: string
}) {
  return (
    <div
      className="glow-card rounded-2xl p-5 flex items-center gap-4"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
      >
        <span className="material-symbols-outlined icon-filled text-lg" style={{ color }}>{icon}</span>
      </div>
      <div className="min-w-0">
        <p className="text-[9px] font-bold uppercase tracking-widest mb-0.5"
          style={{ fontFamily: 'Space Grotesk', color: 'rgba(255,255,255,0.35)' }}>
          {label}
        </p>
        <p className="font-black text-white leading-none"
          style={{ fontFamily: 'DM Mono, monospace', fontSize: '1.15rem', letterSpacing: '-0.03em' }}>
          {value}
        </p>
        {sub && <p className="text-[9px] mt-0.5" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Space Grotesk' }}>{sub}</p>}
      </div>
    </div>
  )
}


// ── Main page ──────────────────────────────────────────────────────
export default function Rechner() {
  const [consumption, setConsumption] = useState(4000)
  const [orientIdx,   setOrientIdx]   = useState(0)
  const [hasStorage,  setHasStorage]  = useState(false)
  const [modalOpen,   setModalOpen]   = useState(false)

  const result = calculate(consumption, orientIdx, hasStorage)

  const animSavings  = useAnimatedNumber(result.annualSavings)
  const animCo2      = useAnimatedNumber(result.co2Kg)
  const animCost     = useAnimatedNumber(result.systemCost)
  const animMonthly  = useAnimatedNumber(Math.round(result.annualSavings / 12))
  const animLifetime = useAnimatedNumber(result.annualSavings * 25)

  const handleConsumption = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setConsumption(Number(e.target.value))
  }, [])

  const gradientText = {
    fontFamily: 'Instrument Serif, Arial, sans-serif',
    fontStyle: 'italic' as const,
    fontWeight: 400,
    background: 'linear-gradient(135deg, #f5b040 0%, #e07018 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }

  return (
    <div className="grain relative min-h-screen" style={{ backgroundColor: '#131313' }}>
      <CursorGlow />
      <ReonicModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <Navbar onAngebot={() => setModalOpen(true)} />

      <main className="relative z-10 pt-32 pb-24 px-6">
        {/* Ambient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[40vw] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(245,176,64,0.05) 0%, transparent 65%)' }} />

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] mb-5 px-4 py-2 rounded-full"
              style={{ fontFamily: 'Space Grotesk', color: '#f5b040', background: 'rgba(245,176,64,0.08)', border: '1px solid rgba(245,176,64,0.2)' }}>
              <span className="material-symbols-outlined icon-filled text-sm">calculate</span>
              Kostenloser Rechner
            </span>
            <h1 className="text-white leading-tight mb-4"
              style={{ fontFamily: 'DM Sans', fontWeight: 900, fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', letterSpacing: '-0.04em' }}>
              Was spart Ihre{' '}
              <span style={gradientText}>Solaranlage?</span>
            </h1>
            <p className="text-base max-w-lg mx-auto"
              style={{ color: 'rgba(209,197,176,0.65)', lineHeight: 1.7, fontFamily: 'DM Sans' }}>
              Geben Sie Ihren Stromverbrauch ein — wir berechnen Ihre jährliche Ersparnis und CO₂-Bilanz.
            </p>
          </motion.div>

          {/* Calculator grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 items-start">

            {/* ── LEFT: Inputs ── */}
            <motion.div className="glow-card rounded-3xl p-7 space-y-8"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}
              initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}>

              {/* Consumption */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-xs font-bold uppercase tracking-widest"
                    style={{ fontFamily: 'Space Grotesk', color: 'rgba(255,255,255,0.5)' }}>
                    Jahresstromverbrauch
                  </label>
                  <span className="font-black text-white"
                    style={{ fontFamily: 'DM Mono', fontSize: '1.1rem', letterSpacing: '-0.03em' }}>
                    {consumption.toLocaleString('de-DE')}{' '}
                    <span style={{ fontSize: '0.65em', color: 'rgba(255,255,255,0.4)' }}>kWh</span>
                  </span>
                </div>

                {/* Household presets */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {HOUSEHOLD_PRESETS.map((p) => (
                    <button key={p.label} onClick={() => setConsumption(p.value)}
                      className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full transition-all"
                      style={{
                        fontFamily: 'Space Grotesk',
                        background: consumption === p.value ? 'rgba(245,176,64,0.15)' : 'rgba(255,255,255,0.05)',
                        border: consumption === p.value ? '1px solid rgba(245,176,64,0.4)' : '1px solid rgba(255,255,255,0.08)',
                        color: consumption === p.value ? '#f5b040' : 'rgba(255,255,255,0.4)',
                        cursor: 'pointer',
                      }}>
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* Slider */}
                <input type="range" min={1000} max={12000} step={100}
                  value={consumption} onChange={handleConsumption}
                  className="w-full"
                  style={{ accentColor: '#f5b040', cursor: 'pointer', height: '4px' }} />
                <div className="flex justify-between mt-1">
                  <span className="text-[8px]" style={{ fontFamily: 'Space Grotesk', color: 'rgba(255,255,255,0.2)' }}>1.000 kWh</span>
                  <span className="text-[8px]" style={{ fontFamily: 'Space Grotesk', color: 'rgba(255,255,255,0.2)' }}>12.000 kWh</span>
                </div>
              </div>

              {/* Orientation */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest block mb-3"
                  style={{ fontFamily: 'Space Grotesk', color: 'rgba(255,255,255,0.5)' }}>
                  Dachausrichtung
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {ORIENTATIONS.map((o, i) => (
                    <button key={o.label} onClick={() => setOrientIdx(i)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-all"
                      style={{
                        background: orientIdx === i ? 'rgba(245,176,64,0.12)' : 'rgba(255,255,255,0.04)',
                        border: orientIdx === i ? '1px solid rgba(245,176,64,0.35)' : '1px solid rgba(255,255,255,0.07)',
                        cursor: 'pointer',
                      }}>
                      <span className="material-symbols-outlined icon-filled text-base"
                        style={{ color: orientIdx === i ? '#f5b040' : 'rgba(255,255,255,0.3)' }}>
                        {o.icon}
                      </span>
                      <span className="text-xs font-bold"
                        style={{ fontFamily: 'Space Grotesk', color: orientIdx === i ? '#f5b040' : 'rgba(255,255,255,0.5)' }}>
                        {o.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Storage toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest"
                    style={{ fontFamily: 'Space Grotesk', color: 'rgba(255,255,255,0.5)' }}>
                    Batteriespeicher
                  </p>
                  <p className="text-[10px] mt-0.5"
                    style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'DM Sans' }}>
                    {hasStorage ? 'Eigenverbrauch bis 72 %' : 'Eigenverbrauch ~30 %'}
                  </p>
                </div>
                <Toggle checked={hasStorage} onChange={setHasStorage} />
              </div>

              {/* Disclaimer */}
              <p className="text-[9px] leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'DM Sans', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem' }}>
                Schätzwerte basierend auf deutschen Durchschnittswerten. Individuelle Begebenheiten können abweichen.
              </p>
            </motion.div>

            {/* ── RIGHT: Results ── */}
            <motion.div className="space-y-5"
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}>

              {/* Main savings */}
              <div className="glow-card rounded-3xl p-7 text-center"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}>
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] mb-2"
                  style={{ fontFamily: 'Space Grotesk', color: 'rgba(255,255,255,0.35)' }}>
                  Geschätzte Ersparnis
                </p>
                <div className="flex items-end justify-center gap-2">
                  <AnimatePresence mode="wait">
                    <motion.span key={result.annualSavings}
                      className="font-black text-white"
                      style={{ fontFamily: 'DM Mono', fontSize: 'clamp(3rem,8vw,5rem)', letterSpacing: '-0.05em', lineHeight: 1, color: '#5dca8a' }}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                      {animSavings.toLocaleString('de-DE')}
                    </motion.span>
                  </AnimatePresence>
                  <span style={{ fontFamily: 'Space Grotesk', color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem', fontWeight: 700, paddingBottom: '0.4rem' }}>
                    € / Jahr
                  </span>
                </div>
                <p className="text-xs mt-3"
                  style={{ color: 'rgba(209,197,176,0.5)', fontFamily: 'DM Sans' }}>
                  Empfohlene Anlage: <strong style={{ color: 'rgba(255,255,255,0.75)' }}>{result.kWp} kWp</strong>
                  {hasStorage && <> + <strong style={{ color: 'rgba(255,255,255,0.75)' }}>Speicher</strong></>}
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3">
                <ResultCard icon="bolt" label="Jahresproduktion"
                  value={`${result.annualProd.toLocaleString('de-DE')} kWh`} color="#f5b040" />
                <ResultCard icon="eco" label="CO₂ gespart"
                  value={`${animCo2.toLocaleString('de-DE')} kg`} sub="pro Jahr" color="#5dca8a" />
                <ResultCard icon="payments" label="Systemkosten"
                  value={`~${animCost.toLocaleString('de-DE')} €`} color="#4a9eff" />
                <ResultCard icon="savings" label="Ersparnis / Monat"
                  value={`~${animMonthly.toLocaleString('de-DE')} €`} color="#c084fc" />
              </div>

              {/* Lifetime savings */}
              <div className="glow-card rounded-2xl p-5"
                style={{ background: 'rgba(93,202,138,0.06)', border: '1px solid rgba(93,202,138,0.15)' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest"
                      style={{ fontFamily: 'Space Grotesk', color: 'rgba(93,202,138,0.7)' }}>
                      Gesamtersparnis über 25 Jahre
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'DM Sans' }}>
                      bei gleichbleibenden Strompreisen
                    </p>
                  </div>
                  <span className="font-black"
                    style={{ fontFamily: 'DM Mono', fontSize: '1.4rem', letterSpacing: '-0.04em', color: '#5dca8a' }}>
                    +{animLifetime.toLocaleString('de-DE')} €
                  </span>
                </div>
              </div>

              {/* CTA */}
              <motion.button
                onClick={() => setModalOpen(true)}
                className="cta-pill w-full flex items-center justify-center gap-3 rounded-2xl py-5 font-black text-sm uppercase"
                style={{
                  background: '#f5900a',
                  color: '#ffffff',
                  fontFamily: 'Space Grotesk',
                  letterSpacing: '0.12em',
                  fontSize: '13px',
                  border: 'none',
                  cursor: 'pointer',
                }}
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}>
                Persönliches Angebot anfordern
                <span className="cta-icon"><span className="material-symbols-outlined icon-filled" style={{fontSize:"18px"}}>wb_sunny</span></span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </main>

      <Suspense fallback={null}><Footer /></Suspense>
      <CookieBanner />
    </div>
  )
}
