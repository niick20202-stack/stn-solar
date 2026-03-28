import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PV_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCl6Xq-Haq8zHqKbEtkBdfCGPcx5rVOnDx8MCtlAG4vak1TgE1xvJpOei5LEOubNvKLX5gzu3Q-hys9edqnsMFmrujwhbDJ-BZQYNoYbSpYahkmaxtnzxovf7RNsd_SNoPNsD7CjTHc88rM4sBGsMkkhCkc6svaEIDglvGSlFkcBcC5-QEMvdrNL8ARShCVRD2qRuG05OulO0YUwtgZW8Dnon-psKDWU-OjV4mPMZaGv0G8Hf6ZrF-0gQkwYimGHFdpgIK1ZaS-k95A'
const STORAGE_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDGa7gXnvuLmo3_aJVB7jybmm3jKMPWGzbFcOTn3tvgLOt29ssG3w7Qrg0u5RzX5ujk90id6QkEhnNamCMKpgWpFNTU3qS8WwN96DIlLzO0ZgQgJK4cZ-sB9mUrEBj9Qx8bqOAi8Kp5cqdvooEDiWX8AxPsx5AWu-PZ3dGjK-ddLhpbuN0p674pF9No8AGGkrN7Odq8iDXM8FAF2r7iXjkja1qD_g4gKT0A5U7x0FqXrJBbOVOFBER8JbIn_qPX6Wg52ouy8VuRvxt'

// New order: Solar Montage → Wärmebox → Komplettpaket → Wartung
const services = [
  {
    label: 'Solar Montage',
    icon: 'solar_power',
    image: PV_IMG,
    tag: 'Installation',
    title: 'Solar Montage',
    description:
      'Maßgeschneiderte Solaranlagen von zertifizierten Experten — von der ersten Planung bis zum finalen Netzanschluss.',
    benefits: [
      { text: 'Professionelle Installation', icon: 'construction' },
      { text: 'Individuelle Planung & Beratung', icon: 'design_services' },
      { text: 'Schnelle & saubere Umsetzung', icon: 'speed' },
      { text: 'Hochwertige Komponenten', icon: 'verified' },
    ],
  },
  {
    label: 'Wärmebox',
    icon: 'thermostat',
    image: PV_IMG,
    tag: 'Energie',
    title: 'Wärmebox',
    description:
      'Heizen Sie mit Solarstrom — effizient, sauber und kostenarm. Bis zu 70 % Einsparung gegenüber konventioneller Heizung.',
    benefits: [
      { text: 'Bis zu 70 % Energieeinsparung', icon: 'savings' },
      { text: 'Smart-Home Integration', icon: 'home_iot_device' },
      { text: 'Effiziente Wärmegewinnung', icon: 'local_fire_department' },
      { text: 'Umweltfreundlich & leise', icon: 'eco' },
    ],
  },
  {
    label: 'Komplettpaket',
    icon: 'package_2',
    image: STORAGE_IMG,
    tag: 'Rundum-Sorglos',
    title: 'Komplettpaket',
    description:
      'Solaranlage, Speicher, Wärmebox und Wartung — alles aus einer Hand. Das Rundum-Sorglos-Paket für maximale Unabhängigkeit.',
    benefits: [
      { text: 'PV-Anlage + Speichersystem', icon: 'battery_charging_full' },
      { text: 'Wärmebox inklusive', icon: 'thermostat' },
      { text: 'Wartungsvertrag 10 Jahre', icon: 'task_alt' },
      { text: 'Ein Ansprechpartner', icon: 'support_agent' },
    ],
  },
  {
    label: 'Wartung',
    icon: 'build',
    image: STORAGE_IMG,
    tag: 'Service',
    title: 'Wartung & Service',
    description:
      'Wir halten Ihre Anlage dauerhaft auf Höchstleistung — mit proaktiver Inspektion und schnellem Support.',
    benefits: [
      { text: 'Regelmäßige Inspektion', icon: 'search' },
      { text: 'Leistungsoptimierung', icon: 'trending_up' },
      { text: '24 / 7 Notfall-Support', icon: 'support_agent' },
      { text: 'Garantierte Verfügbarkeit', icon: 'verified' },
    ],
  },
]

const contentVariants = {
  enter: (dir: number) => ({ opacity: 0, y: dir * 18 }),
  center: { opacity: 1, y: 0 },
  exit: (dir: number) => ({ opacity: 0, y: -dir * 18 }),
}

const imageVariants = {
  enter: { opacity: 0, scale: 1.04 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.97 },
}

// Reusable gradient text style for Cormorant italic accents
const gradientText = {
  fontFamily: 'Instrument Serif, Arial, sans-serif',
  fontStyle: 'italic' as const,
  fontWeight: 400,
  background: 'linear-gradient(135deg, #f5b040 0%, #e07018 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

export default function Services({ onAngebot }: { onAngebot: () => void }) {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)

  const switchTo = (idx: number) => {
    if (idx === active) return
    setDirection(idx > active ? 1 : -1)
    setActive(idx)
  }

  const s = services[active]

  return (
    <section id="angebote" className="relative z-10 max-w-7xl mx-auto px-5 md:px-6 py-12 md:py-20">
      {/* Heading */}
      <motion.div
        className="mb-6 md:mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span
          className="text-[10px] font-bold uppercase tracking-[0.35em]"
          style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#f5b040' }}
        >
          Unsere Leistungen
        </span>
        <h2
          className="font-black text-white mt-2 leading-tight"
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            letterSpacing: '-0.04em',
          }}
        >
          Was wir{' '}
          <span style={gradientText}>Anbieten</span>
        </h2>
      </motion.div>

      {/* Main card */}
      <motion.div
        className="glow-card rounded-3xl overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.12)',
          backdropFilter: 'blur(8px)',
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        {/* Content area: text left, image right */}
        <div className="flex flex-col md:flex-row md:min-h-[420px]">

          {/* LEFT — benefits content */}
          <div className="flex-1 p-5 md:p-10 flex flex-col justify-between relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-64 h-64 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(245,176,64,0.06) 0%, transparent 70%)',
                transform: 'translate(-30%, -30%)',
              }}
            />

            <div className="relative z-10">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={active}
                  custom={direction}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Tag */}
                  <span
                    className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.3em] px-3 py-1.5 rounded-full mb-5"
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      color: '#f5b040',
                      background: 'rgba(245,176,64,0.1)',
                      border: '1px solid rgba(245,176,64,0.2)',
                    }}
                  >
                    <span className="material-symbols-outlined icon-filled text-xs">{s.icon}</span>
                    {s.tag}
                  </span>

                  {/* Title */}
                  <h3
                    className="font-black text-white leading-tight mb-3"
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed mb-4 md:mb-7"
                    style={{ color: 'rgba(209,197,176,0.72)', lineHeight: 1.7, maxWidth: '38ch' }}
                  >
                    {s.description}
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-2 md:space-y-3">
                    {s.benefits.map((b, i) => (
                      <motion.li
                        key={b.text}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div
                          className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background: 'rgba(245,176,64,0.12)',
                            border: '1px solid rgba(245,176,64,0.2)',
                          }}
                        >
                          <span
                            className="material-symbols-outlined icon-filled"
                            style={{ fontSize: '14px', color: '#f5b040' }}
                          >
                            {b.icon}
                          </span>
                        </div>
                        <span className="text-sm font-medium" style={{ color: 'rgba(229,226,225,0.88)' }}>
                          {b.text}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CTA */}
            <motion.button
              className="cta-pill mt-5 md:mt-8 self-start flex items-center gap-2 rounded-full px-6 py-3 font-black text-xs uppercase"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                background: 'linear-gradient(135deg, #f5b040, #e07018)',
                color: '#2a1600',
                letterSpacing: '0.12em',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={onAngebot}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="material-symbols-outlined icon-filled text-sm">wb_sunny</span>
              Jetzt anfragen
            </motion.button>
          </div>

          {/* RIGHT — image */}
          <div
            className="w-full md:w-[48%] flex-shrink-0 relative overflow-hidden"
            style={{ minHeight: '180px' }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={s.image}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              />
            </AnimatePresence>
            <div
              className="absolute inset-y-0 left-0 w-16 pointer-events-none hidden md:block"
              style={{ background: 'linear-gradient(to right, rgba(22,22,22,0.7), transparent)' }}
            />
          </div>
        </div>

        {/* Bottom tab switcher */}
        <div
          className="flex items-center justify-center gap-2 px-4 py-4 flex-wrap"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div
            className="flex items-center gap-1 p-1 rounded-full flex-wrap justify-center"
            style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {services.map((svc, i) => (
              <motion.button
                key={svc.label}
                onClick={() => switchTo(i)}
                className="relative flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  letterSpacing: '0.02em',
                  border: 'none',
                  cursor: 'pointer',
                  outline: 'none',
                  color: i === active ? '#2a1600' : 'rgba(255,255,255,0.5)',
                  position: 'relative',
                  zIndex: 1,
                }}
                whileTap={{ scale: 0.95 }}
              >
                {i === active && (
                  <motion.div
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'linear-gradient(135deg, #f5b040, #e07018)', zIndex: -1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                <span
                  className={`material-symbols-outlined text-sm ${i === active ? 'icon-filled' : ''}`}
                  style={{ color: i === active ? '#2a1600' : 'rgba(255,255,255,0.4)' }}
                >
                  {svc.icon}
                </span>
                {svc.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
