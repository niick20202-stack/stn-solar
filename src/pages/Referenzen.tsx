import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { lazy, Suspense } from 'react'
import Navbar from '../components/Navbar'
import CursorGlow from '../components/CursorGlow'
import ReonicModal from '../components/ReonicModal'
import CookieBanner from '../components/CookieBanner'
import FloatingContact from '../components/FloatingContact'
import pvmontage from '../assets/pvmontage.png'

const Footer = lazy(() => import('../components/Footer'))

type Category = 'Alle' | 'Photovoltaik' | 'Wärmepumpe' | 'Wallbox'

const projects = [
  {
    id: 1,
    city: 'München',
    state: 'Bayern',
    type: 'Einfamilienhaus',
    kWp: 12.0,
    savings: 2400,
    storage: '10 kWh BYD LFP',
    modules: 'JA Solar 500W Bifazial Full Black',
    inverter: 'SMA STP10.0',
    date: 'Nov 2024',
    category: 'Photovoltaik' as Category,
    image: pvmontage,
    highlight: 'Photovoltaik',
    highlightColor: '#f5b040',
  },
  {
    id: 2,
    city: 'Hamburg',
    state: 'Hamburg',
    type: 'Doppelhaus',
    kWp: 9.9,
    savings: 1980,
    storage: null,
    modules: 'Trina Vertex S+ Full Black',
    inverter: 'Fronius Primo 8.0',
    date: 'Okt 2024',
    category: 'Wärmepumpe' as Category,
    image: pvmontage,
    highlight: 'Wärmepumpe',
    highlightColor: '#f97316',
  },
  {
    id: 3,
    city: 'Berlin',
    state: 'Berlin',
    type: 'Einfamilienhaus',
    kWp: 8.5,
    savings: 1750,
    storage: null,
    modules: 'JA Solar 500W Bifazial Full Black',
    inverter: 'SMA SB7.0',
    date: 'Sep 2024',
    category: 'Wallbox' as Category,
    image: pvmontage,
    highlight: 'Wallbox',
    highlightColor: '#4a9eff',
  },
]

const FILTERS: Category[] = ['Alle', 'Photovoltaik', 'Wärmepumpe', 'Wallbox']

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
      className="rounded-3xl overflow-hidden flex flex-col"
      style={{
        background: '#ffffff',
        border: '1px solid rgba(26,26,26,0.07)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
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
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55) 100%)' }}
        />
        {/* Badge */}
        <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
          <span
            className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{
              background: `${project.highlightColor}22`,
              border: `1px solid ${project.highlightColor}55`,
              color: project.highlightColor,
              fontFamily: 'Space Grotesk, sans-serif',
              backdropFilter: 'blur(8px)',
            }}
          >
            {project.highlight}
          </span>
        </div>
        {/* Location */}
        <div className="absolute bottom-3 left-4 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-sm icon-filled" style={{ color: '#f5b040' }}>
            location_on
          </span>
          <span className="text-xs font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(255,255,255,0.92)' }}>
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
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(26,26,26,0.4)' }}
            >
              {project.type} · {project.date}
            </p>
            <h3
              className="font-black leading-tight"
              style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.15rem', letterSpacing: '-0.03em', color: '#1a1a1a' }}
            >
              {project.kWp} kWp Anlage
            </h3>
          </div>
          <div className="text-right flex-shrink-0">
            <div
              className="font-black leading-none"
              style={{ fontFamily: 'DM Mono, monospace', fontSize: '1.3rem', letterSpacing: '-0.04em', color: '#16a34a' }}
            >
              {project.savings.toLocaleString('de-DE')} €
            </div>
            <div
              className="text-[8px] uppercase tracking-widest font-bold mt-0.5"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(26,26,26,0.35)' }}
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
              <span className="material-symbols-outlined icon-filled flex-shrink-0" style={{ fontSize: '13px', color: '#f5b040' }}>
                {spec.icon}
              </span>
              <span className="text-xs" style={{ fontFamily: 'DM Sans, sans-serif', color: 'rgba(26,26,26,0.55)' }}>
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
    : projects.filter((p) => p.category === activeFilter)

  const totalKwp = projects.reduce((s, p) => s + p.kWp, 0)
  const totalSavings = projects.reduce((s, p) => s + p.savings, 0)

  return (
    <div className="grain relative min-h-screen" style={{ backgroundColor: '#f8f7f5' }}>
      <CursorGlow />
      <ReonicModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <Navbar onAngebot={() => setModalOpen(true)} />

      <main className="relative z-10">
        {/* Page hero */}
        <section className="relative pt-40 pb-20 px-6">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vw] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, rgba(245,176,64,0.1) 0%, transparent 65%)',
              zIndex: 0,
            }}
          />

          <div className="max-w-7xl mx-auto relative z-10">
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
                  color: '#e07018',
                  background: 'rgba(245,176,64,0.1)',
                  border: '1px solid rgba(245,176,64,0.3)',
                }}
              >
                <span className="material-symbols-outlined icon-filled text-sm">verified</span>
                Abgeschlossene Projekte
              </span>

              <h1
                className="leading-tight mb-6"
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                  letterSpacing: '-0.04em',
                  color: '#1a1a1a',
                }}
              >
                Unsere{' '}
                <span style={gradientText}>Referenzen</span>
              </h1>

              <p
                className="text-lg max-w-xl mx-auto mb-14"
                style={{ color: 'rgba(26,26,26,0.55)', lineHeight: 1.7, fontFamily: 'DM Sans, sans-serif' }}
              >
                Echte Projekte, echte Einsparungen — direkt aus unserer Region.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                {[
                  { value: `${projects.length}`, label: 'Projekte gezeigt', icon: 'home_work' },
                  { value: `${totalKwp.toFixed(0)} kWp`, label: 'Installierte Leistung', icon: 'bolt' },
                  { value: `${(totalSavings / 1000).toFixed(1)}k €`, label: 'Jährliche Ersparnis', icon: 'savings' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(245,176,64,0.12)', border: '1px solid rgba(245,176,64,0.25)' }}
                    >
                      <span className="material-symbols-outlined icon-filled text-lg" style={{ color: '#f5b040' }}>
                        {stat.icon}
                      </span>
                    </div>
                    <div className="text-left">
                      <div
                        className="font-black leading-none"
                        style={{ fontFamily: 'DM Mono, monospace', fontSize: '1.25rem', letterSpacing: '-0.03em', color: '#1a1a1a' }}
                      >
                        {stat.value}
                      </div>
                      <div
                        className="text-[9px] uppercase tracking-widest mt-0.5"
                        style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(26,26,26,0.4)' }}
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
                style={{ background: 'rgba(26,26,26,0.06)', border: '1px solid rgba(26,26,26,0.08)' }}
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
                      color: f === activeFilter ? '#2a1600' : 'rgba(26,26,26,0.5)',
                      position: 'relative',
                      zIndex: 1,
                      background: 'none',
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {f === activeFilter && (
                      <motion.div
                        layoutId="filter-pill"
                        className="absolute inset-0 rounded-full"
                        style={{ background: '#f5900a', zIndex: -1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                    {f}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <motion.div className="text-center py-24" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <span className="material-symbols-outlined text-5xl" style={{ color: 'rgba(26,26,26,0.12)' }}>
                  search_off
                </span>
                <p className="mt-4 text-sm" style={{ color: 'rgba(26,26,26,0.35)', fontFamily: 'Space Grotesk' }}>
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
                background: 'linear-gradient(135deg, #fff8ee 0%, #fff3e0 100%)',
                border: '1px solid rgba(245,176,64,0.2)',
                boxShadow: '0 4px 32px rgba(245,176,64,0.1)',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(245,176,64,0.12) 0%, transparent 70%)' }}
              />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.3em]"
                style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#e07018' }}
              >
                Ihr Projekt als nächstes?
              </span>
              <h2
                className="mt-4 mb-6 leading-tight"
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                  letterSpacing: '-0.04em',
                  color: '#1a1a1a',
                }}
              >
                Jetzt Ihr individuelles{' '}
                <span style={gradientText}>Angebot sichern</span>
              </h2>
              <p
                className="text-base max-w-lg mx-auto mb-10"
                style={{ color: 'rgba(26,26,26,0.55)', lineHeight: 1.7 }}
              >
                Kostenlose Beratung, transparente Preise, professionelle Umsetzung.
              </p>
              <motion.button
                className="cta-pill inline-flex items-center gap-3 rounded-full px-10 py-5 font-black text-sm uppercase tracking-wider"
                style={{
                  background: '#f5900a',
                  color: '#ffffff',
                  fontFamily: 'Space Grotesk, sans-serif',
                  letterSpacing: '0.12em',
                  fontSize: '13px',
                  border: 'none',
                  cursor: 'pointer',
                  
                }}
                onClick={() => setModalOpen(true)}
                whileHover={{ scale: 1.06, y: -4 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="cta-icon"><span className="material-symbols-outlined icon-filled" style={{fontSize:"18px"}}>wb_sunny</span></span>
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
