import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { lazy, Suspense } from 'react'
import Navbar from '../components/Navbar'
import CursorGlow from '../components/CursorGlow'
import ReonicModal from '../components/ReonicModal'
import CookieBanner from '../components/CookieBanner'
import FloatingContact from '../components/FloatingContact'

const Footer = lazy(() => import('../components/Footer'))

const PV_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCl6Xq-Haq8zHqKbEtkBdfCGPcx5rVOnDx8MCtlAG4vak1TgE1xvJpOei5LEOubNvKLX5gzu3Q-hys9edqnsMFmrujwhbDJ-BZQYNoYbSpYahkmaxtnzxovf7RNsd_SNoPNsD7CjTHc88rM4sBGsMkkhCkc6svaEIDglvGSlFkcBcC5-QEMvdrNL8ARShCVRD2qRuG05OulO0YUwtgZW8Dnon-psKDWU-OjV4mPMZaGv0G8Hf6ZrF-0gQkwYimGHFdpgIK1ZaS-k95A'
const STORAGE_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGa7gXnvuLmo3_aJVB7jybmm3jKMPWGzbFcOTn3tvgLOt29ssG3w7Qrg0u5RzX5ujk90id6QkEhnNamCMKpgWpFNTU3qS8WwN96DIlLzO0ZgQgJK4cZ-sB9mUrEBj9Qx8bqOAi8Kp5cqdvooEDiWX8AxPsx5AWu-PZ3dGjK-ddLhpbuN0p674pF9No8AGGkrN7Odq8iDXM8FAF2r7iXjkja1qD_g4gKT0A5U7x0FqXrJBbOVOFBER8JbIn_qPX6Wg52ouy8VuRvxt'

type Category = 'Alle' | 'Wohnhaus' | 'Gewerbe' | 'Mit Speicher'

const projects = [
  {
    id: 1,
    city: 'München',
    state: 'Bayern',
    type: 'Einfamilienhaus',
    kWp: 12.0,
    savings: 2400,
    storage: '10 kWh BYD LFP',
    modules: 'Trina Vertex S+ Full-Black',
    inverter: 'SMA STP10.0',
    date: 'Nov 2024',
    category: 'Wohnhaus' as Category,
    hasStorage: true,
    image: PV_IMG,
    highlight: 'Full-Black',
    highlightColor: '#c084fc',
  },
  {
    id: 2,
    city: 'Hamburg',
    state: 'Hamburg',
    type: 'Doppelhaus',
    kWp: 8.5,
    savings: 1750,
    storage: null,
    modules: 'Trina Vertex S+ 420W',
    inverter: 'Fronius Primo 8.0',
    date: 'Okt 2024',
    category: 'Wohnhaus' as Category,
    hasStorage: false,
    image: PV_IMG,
    highlight: 'Norddach',
    highlightColor: '#4a9eff',
  },
  {
    id: 3,
    city: 'Berlin',
    state: 'Berlin',
    type: 'Mehrfamilienhaus',
    kWp: 22.4,
    savings: 4600,
    storage: '16,98 kWh SMA',
    modules: 'Trina Vertex S+ 430W',
    inverter: 'SMA Tripower 20.0',
    date: 'Sep 2024',
    category: 'Wohnhaus' as Category,
    hasStorage: true,
    image: STORAGE_IMG,
    highlight: 'Mieterstrom',
    highlightColor: '#5dca8a',
  },
  {
    id: 4,
    city: 'Stuttgart',
    state: 'Baden-Württemberg',
    type: 'Gewerbehalle',
    kWp: 48.0,
    savings: 9800,
    storage: null,
    modules: 'Trina Vertex 670W Bifazial',
    inverter: 'SMA Sunny Highpower',
    date: 'Aug 2024',
    category: 'Gewerbe' as Category,
    hasStorage: false,
    image: PV_IMG,
    highlight: 'Gewerbe',
    highlightColor: '#f5b040',
  },
  {
    id: 5,
    city: 'Frankfurt',
    state: 'Hessen',
    type: 'Reihenhaus',
    kWp: 9.9,
    savings: 1980,
    storage: '10 kWh BYD',
    modules: 'Trina Vertex S+ Full-Black',
    inverter: 'SMA STP10.0',
    date: 'Jul 2024',
    category: 'Wohnhaus' as Category,
    hasStorage: true,
    image: STORAGE_IMG,
    highlight: 'Wärmebox',
    highlightColor: '#f97316',
  },
  {
    id: 6,
    city: 'Köln',
    state: 'NRW',
    type: 'Bürogebäude',
    kWp: 35.0,
    savings: 7200,
    storage: '20 kWh SMA',
    modules: 'Trina Vertex 580W',
    inverter: 'Fronius Symo Advanced',
    date: 'Jun 2024',
    category: 'Gewerbe' as Category,
    hasStorage: true,
    image: STORAGE_IMG,
    highlight: 'Gewerbe + Speicher',
    highlightColor: '#f5b040',
  },
  {
    id: 7,
    city: 'Nürnberg',
    state: 'Bayern',
    type: 'Einfamilienhaus',
    kWp: 7.5,
    savings: 1520,
    storage: null,
    modules: 'Trina Vertex S+ 415W',
    inverter: 'SMA SB7.0',
    date: 'Mai 2024',
    category: 'Wohnhaus' as Category,
    hasStorage: false,
    image: PV_IMG,
    highlight: 'Satteldach',
    highlightColor: '#4a9eff',
  },
  {
    id: 8,
    city: 'Dresden',
    state: 'Sachsen',
    type: 'Bungalow',
    kWp: 11.0,
    savings: 2200,
    storage: '13,8 kWh BYD',
    modules: 'Trina Vertex S+ Full-Black',
    inverter: 'SMA STP10.0',
    date: 'Apr 2024',
    category: 'Wohnhaus' as Category,
    hasStorage: true,
    image: STORAGE_IMG,
    highlight: 'Full-Black + Speicher',
    highlightColor: '#c084fc',
  },
  {
    id: 9,
    city: 'Düsseldorf',
    state: 'NRW',
    type: 'Produktionshalle',
    kWp: 80.0,
    savings: 16400,
    storage: '40 kWh BYD',
    modules: 'Trina Vertex 700W Bifazial',
    inverter: 'SMA Sunny Highpower 100',
    date: 'Mär 2024',
    category: 'Gewerbe' as Category,
    hasStorage: true,
    image: PV_IMG,
    highlight: 'Großanlage',
    highlightColor: '#5dca8a',
  },
]

const FILTERS: Category[] = ['Alle', 'Wohnhaus', 'Gewerbe', 'Mit Speicher']

const gradientText = {
  fontFamily: 'Instrument Serif, Arial, sans-serif',
  fontStyle: 'italic' as const,
  fontWeight: 400,
  background: 'linear-gradient(135deg, #f5b040 0%, #e07018 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.div
      className="glow-card rounded-3xl overflow-hidden flex flex-col"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
      layout
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: '200px' }}>
        <img
          src={project.image}
          alt={`${project.type} in ${project.city}`}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          style={{ opacity: 0.6 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(13,13,13,0.9) 100%)' }}
        />
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
          <span
            className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{
              background: `${project.highlightColor}20`,
              border: `1px solid ${project.highlightColor}50`,
              color: project.highlightColor,
              fontFamily: 'Space Grotesk, sans-serif',
            }}
          >
            {project.highlight}
          </span>
          {project.hasStorage && (
            <span
              className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(93,202,138,0.15)',
                border: '1px solid rgba(93,202,138,0.3)',
                color: '#5dca8a',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              + Speicher
            </span>
          )}
        </div>
        {/* Location */}
        <div className="absolute bottom-3 left-4 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-sm icon-filled" style={{ color: '#f5b040' }}>
            location_on
          </span>
          <span
            className="text-xs font-bold"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(255,255,255,0.9)' }}
          >
            {project.city}, {project.state}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <p
              className="text-[9px] font-bold uppercase tracking-[0.25em] mb-1"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(255,255,255,0.35)' }}
            >
              {project.type} · {project.date}
            </p>
            <h3
              className="text-white font-black leading-tight"
              style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.15rem', letterSpacing: '-0.03em' }}
            >
              {project.kWp} kWp Anlage
            </h3>
          </div>
          {/* Savings highlight */}
          <div className="text-right flex-shrink-0">
            <div
              className="font-black leading-none"
              style={{ fontFamily: 'DM Mono, monospace', fontSize: '1.3rem', letterSpacing: '-0.04em', color: '#5dca8a' }}
            >
              {project.savings.toLocaleString('de-DE')} €
            </div>
            <div
              className="text-[8px] uppercase tracking-widest font-bold mt-0.5"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(255,255,255,0.3)' }}
            >
              / Jahr gespart
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="space-y-2 mt-auto">
          {[
            { icon: 'solar_power', label: project.modules },
            { icon: 'settings_input_component', label: project.inverter },
            ...(project.storage ? [{ icon: 'battery_charging_full', label: project.storage }] : []),
          ].map((spec) => (
            <div key={spec.label} className="flex items-center gap-2.5">
              <span
                className="material-symbols-outlined icon-filled flex-shrink-0"
                style={{ fontSize: '13px', color: 'rgba(245,176,64,0.7)' }}
              >
                {spec.icon}
              </span>
              <span
                className="text-xs"
                style={{ fontFamily: 'DM Sans, sans-serif', color: 'rgba(209,197,176,0.65)' }}
              >
                {spec.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Referenzen() {
  const [activeFilter, setActiveFilter] = useState<Category>('Alle')
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active')
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const filtered = activeFilter === 'Alle'
    ? projects
    : activeFilter === 'Mit Speicher'
      ? projects.filter((p) => p.hasStorage)
      : projects.filter((p) => p.category === activeFilter)

  const totalKwp = projects.reduce((s, p) => s + p.kWp, 0)
  const totalSavings = projects.reduce((s, p) => s + p.savings, 0)

  return (
    <div className="grain relative min-h-screen" style={{ backgroundColor: '#131313' }}>
      <CursorGlow />
      <ReonicModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <Navbar onAngebot={() => setModalOpen(true)} />

      <main className="relative z-10">
        {/* Page hero */}
        <section className="relative overflow-hidden pt-40 pb-20 px-6">
          {/* Ambient */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vw] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(245,176,64,0.06) 0%, transparent 65%)' }}
          />

          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <span
                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] mb-6 px-4 py-2 rounded-full"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  color: '#f5b040',
                  background: 'rgba(245,176,64,0.08)',
                  border: '1px solid rgba(245,176,64,0.2)',
                }}
              >
                <span className="material-symbols-outlined icon-filled text-sm">verified</span>
                Abgeschlossene Projekte
              </span>

              <h1
                className="text-white leading-tight mb-6"
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                  letterSpacing: '-0.04em',
                }}
              >
                Unsere{' '}
                <span style={gradientText}>Referenzen</span>
              </h1>

              <p
                className="text-lg max-w-xl mx-auto mb-14"
                style={{ color: 'rgba(209,197,176,0.7)', lineHeight: 1.7, fontFamily: 'DM Sans, sans-serif' }}
              >
                Von der Dachvilla bis zur Produktionshalle — echte Projekte, echte Einsparungen.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                {[
                  { value: `${projects.length}+`, label: 'Projekte gezeigt', icon: 'home_work' },
                  { value: `${totalKwp.toFixed(0)} kWp`, label: 'Installierte Leistung', icon: 'bolt' },
                  { value: `${(totalSavings / 1000).toFixed(0)}k €`, label: 'Jährliche Ersparnis', icon: 'savings' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(245,176,64,0.1)', border: '1px solid rgba(245,176,64,0.2)' }}
                    >
                      <span className="material-symbols-outlined icon-filled text-lg" style={{ color: '#f5b040' }}>
                        {stat.icon}
                      </span>
                    </div>
                    <div className="text-left">
                      <div
                        className="font-black text-white leading-none"
                        style={{ fontFamily: 'DM Mono, monospace', fontSize: '1.25rem', letterSpacing: '-0.03em' }}
                      >
                        {stat.value}
                      </div>
                      <div
                        className="text-[9px] uppercase tracking-widest mt-0.5"
                        style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(255,255,255,0.35)' }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filter + Grid */}
        <section className="px-6 pb-24">
          <div className="max-w-7xl mx-auto">
            {/* Filter bar */}
            <motion.div
              className="flex justify-center mb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div
                className="flex items-center gap-1 p-1 rounded-full flex-wrap justify-center"
                style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {FILTERS.map((f) => (
                  <motion.button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className="relative rounded-full px-5 py-2 text-xs font-bold"
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      letterSpacing: '0.04em',
                      border: 'none',
                      cursor: 'pointer',
                      color: f === activeFilter ? '#2a1600' : 'rgba(255,255,255,0.5)',
                      position: 'relative',
                      zIndex: 1,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {f === activeFilter && (
                      <motion.div
                        layoutId="filter-pill"
                        className="absolute inset-0 rounded-full"
                        style={{ background: 'linear-gradient(135deg, #f5b040, #e07018)', zIndex: -1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                    {f}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <motion.div
                className="text-center py-24"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="material-symbols-outlined text-5xl" style={{ color: 'rgba(255,255,255,0.1)' }}>
                  search_off
                </span>
                <p className="mt-4 text-sm" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Space Grotesk' }}>
                  Keine Projekte für diesen Filter
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="px-6 pb-24">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="relative rounded-3xl p-10 md:p-16 overflow-hidden text-center reveal"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(245,176,64,0.08) 0%, transparent 70%)' }}
              />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.3em]"
                style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#f5b040' }}
              >
                Ihr Projekt als nächstes?
              </span>
              <h2
                className="text-white mt-4 mb-6 leading-tight"
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                  letterSpacing: '-0.04em',
                }}
              >
                Jetzt Ihr individuelles{' '}
                <span style={gradientText}>Angebot sichern</span>
              </h2>
              <p
                className="text-base max-w-lg mx-auto mb-10"
                style={{ color: 'rgba(209,197,176,0.7)', lineHeight: 1.7 }}
              >
                Kostenlose Beratung, transparente Preise, professionelle Umsetzung.
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
                onClick={() => setModalOpen(true)}
                whileHover={{ scale: 1.06, y: -4 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="material-symbols-outlined icon-filled text-xl">wb_sunny</span>
                Jetzt kostenlos beraten lassen
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <CookieBanner />
      <FloatingContact />
    </div>
  )
}
