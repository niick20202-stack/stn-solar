import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    icon: 'chat_bubble',
    title: 'Kostenlose Beratung',
    desc: 'Unverbindliches Gespräch, Bedarfsanalyse und Dachprüfung – wir hören zu und erstellen das perfekte Konzept für Sie.',
  },
  {
    number: '02',
    icon: 'design_services',
    title: 'Individuelle Planung',
    desc: '3D-Simulation, Wirtschaftlichkeitsanalyse und Förderermittlung – maßgeschneidert für Ihr Dach und Ihren Verbrauch.',
  },
  {
    number: '03',
    icon: 'construction',
    title: 'Saubere Montage',
    desc: 'Zertifizierte Techniker installieren normgerecht und schnell – inklusive Netzanmeldung und Inbetriebnahme.',
  },
  {
    number: '04',
    icon: 'bolt',
    title: 'Energie & Freiheit',
    desc: 'Ihre Anlage produziert – Sie sparen. Mit dauerhaftem Monitoring und proaktivem Service bleiben Sie auf Höchstleistung.',
  },
]

const gradientText = {
  fontFamily: 'Instrument Serif, Arial, sans-serif',
  fontStyle: 'italic' as const,
  fontWeight: 400,
  background: 'linear-gradient(135deg, #f5b040 0%, #e07018 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

export default function Process() {
  return (
    <section id="prozess" className="relative z-10 py-12 md:py-24 px-5 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          className="mb-8 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="text-[10px] font-bold uppercase tracking-[0.35em]"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#f5b040' }}
          >
            Der Prozess
          </span>
          <h2
            className="font-black text-white mt-2 leading-tight"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              letterSpacing: '-0.04em',
            }}
          >
            In 4 Schritten zu{' '}
            <span style={gradientText}>Ihrer Anlage</span>
          </h2>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Connector line desktop */}
          <div
            className="hidden md:block absolute top-[3.25rem] left-[12.5%] right-[12.5%] h-px pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(245,176,64,0.18) 20%, rgba(245,176,64,0.18) 80%, transparent)',
            }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="glow-card relative flex flex-col items-start md:items-center text-left md:text-center gap-4 p-5 md:p-7 rounded-3xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            >
              {/* Number badge */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 relative z-10"
                style={{
                  background: 'rgba(245,176,64,0.10)',
                  border: '1px solid rgba(245,176,64,0.22)',
                }}
              >
                <span
                  className="font-black"
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '13px',
                    letterSpacing: '-0.02em',
                    color: '#f5b040',
                  }}
                >
                  {step.number}
                </span>
              </div>

              <div>
                <h3
                  className="font-black text-white leading-tight mb-2"
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '1.05rem',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(209,197,176,0.6)', lineHeight: 1.65 }}
                >
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
