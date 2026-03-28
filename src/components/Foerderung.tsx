import { motion } from 'framer-motion'

const foerderungen = [
  {
    icon: 'account_balance',
    title: 'KfW 270',
    subtitle: 'Zinsgünstiges Darlehen',
    desc: 'Bis zu 150.000 € Kredit für Ihre Photovoltaikanlage zu attraktiven Konditionen der Kreditanstalt für Wiederaufbau.',
    color: '#4a9eff',
  },
  {
    icon: 'euro',
    title: '0 % MwSt.',
    subtitle: 'Seit Jan. 2023',
    desc: 'Solaranlagen und Speicher sind vollständig von der Mehrwertsteuer befreit – ein direkter Preisvorteil von 19 %.',
    color: '#f5b040',
  },
  {
    icon: 'receipt_long',
    title: 'Steuerfreiheit',
    subtitle: 'Bis 30 kWp',
    desc: 'Einnahmen aus der Einspeisung sind steuerbefreit. Kein Gewerbeschein, keine Steuererklärung – simpel und vorteilhaft.',
    color: '#5dca8a',
  },
  {
    icon: 'electric_bolt',
    title: 'EEG-Vergütung',
    subtitle: '20 Jahre garantiert',
    desc: 'Überschüssigen Strom ins Netz einspeisen und dafür vergütet werden – gesetzlich für 20 Jahre festgeschrieben.',
    color: '#e07018',
  },
]

const partners = [
  { label: 'SMA Solar', icon: 'solar_power' },
  { label: 'Fronius', icon: 'electric_bolt' },
  { label: 'BYD Energy', icon: 'battery_charging_full' },
  { label: 'LG Energy', icon: 'bolt' },
  { label: 'Enphase', icon: 'wb_sunny' },
  { label: 'Viessmann', icon: 'thermostat' },
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

export default function Foerderung() {
  return (
    <section id="foerderung" className="relative z-10 py-14 md:py-24 px-5 md:px-6 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-64 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(245,176,64,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          className="mb-8 md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="text-[10px] font-bold uppercase tracking-[0.35em]"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#f5b040' }}
          >
            Förderungen & Finanzierung
          </span>
          <h2
            className="font-black text-white mt-2 leading-tight"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              letterSpacing: '-0.04em',
            }}
          >
            Der Staat{' '}
            <span style={gradientText}>bezahlt mit</span>
          </h2>
          <p
            className="mt-4 max-w-xl text-base"
            style={{ color: 'rgba(209,197,176,0.65)', lineHeight: 1.7 }}
          >
            Kombinieren Sie staatliche Förderungen intelligent — und machen Sie Ihre
            Solaranlage zur rentabelsten Investition des Jahrzehnts.
          </p>
        </motion.div>

        {/* Förderung cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-10 md:mb-16">
          {foerderungen.map((f, i) => (
            <motion.div
              key={f.title}
              className="glow-card rounded-3xl p-4 md:p-6 flex flex-col gap-3 md:gap-4"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{
                  background: `${f.color}18`,
                  border: `1px solid ${f.color}30`,
                }}
              >
                <span
                  className="material-symbols-outlined icon-filled"
                  style={{ fontSize: '20px', color: f.color }}
                >
                  {f.icon}
                </span>
              </div>
              <div>
                <p
                  className="font-black text-white leading-tight"
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '1.1rem',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {f.title}
                </p>
                <p
                  className="text-[9px] font-bold uppercase tracking-widest mt-0.5"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    color: 'rgba(255,255,255,0.3)',
                  }}
                >
                  {f.subtitle}
                </p>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'rgba(209,197,176,0.6)', lineHeight: 1.65 }}
              >
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Partner strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p
            className="text-center text-[9px] font-bold uppercase tracking-[0.35em] mb-6"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              color: 'rgba(255,255,255,0.25)',
            }}
          >
            Zertifizierte Markenpartner
          </p>
          <div
            className="flex flex-wrap justify-center items-center gap-3 px-6 py-5 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {partners.map((p) => (
              <div
                key={p.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full opacity-40 hover:opacity-80 transition-opacity duration-300"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <span
                  className="material-symbols-outlined icon-filled text-sm"
                  style={{ color: '#f5b040' }}
                >
                  {p.icon}
                </span>
                <span
                  className="text-[10px] font-bold uppercase tracking-widest text-white"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {p.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
