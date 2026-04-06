import { motion } from 'framer-motion'

const STORAGE_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDGa7gXnvuLmo3_aJVB7jybmm3jKMPWGzbFcOTn3tvgLOt29ssG3w7Qrg0u5RzX5ujk90id6QkEhnNamCMKpgWpFNTU3qS8WwN96DIlLzO0ZgQgJK4cZ-sB9mUrEBj9Qx8bqOAi8Kp5cqdvooEDiWX8AxPsx5AWu-PZ3dGjK-ddLhpbuN0p674pF9No8AGGkrN7Odq8iDXM8FAF2r7iXjkja1qD_g4gKT0A5U7x0FqXrJBbOVOFBER8JbIn_qPX6Wg52ouy8VuRvxt'

const features = [
  { icon: 'battery_charging_full', label: 'Bis zu 20 kWh Kapazität' },
  { icon: 'offline_bolt', label: 'Notstromfähig & netzunabhängig' },
  { icon: 'home_iot_device', label: 'Smart-Home Integration' },
  { icon: 'schedule', label: '10.000+ Ladezyklen' },
  { icon: 'eco', label: 'Lithium-Eisenphosphat (LFP)' },
  { icon: 'verified', label: '10 Jahre Garantie' },
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

export default function Speicher({ onAngebot }: { onAngebot: () => void }) {
  return (
    <section
      id="speicher"
      className="relative z-10 py-14 md:py-24 px-5 md:px-6 overflow-hidden"
    >
      {/* Ambient glows */}
      <div
        className="absolute -top-32 right-0 w-[50vw] h-[50vw] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245,176,64,0.04) 0%, transparent 65%)',
          transform: 'translate(20%, -20%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[40vw] h-[40vw] pointer-events-none pulse-soft"
        style={{
          background: 'radial-gradient(circle, rgba(245,176,64,0.03) 0%, transparent 65%)',
          transform: 'translate(-30%, 30%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="text-[10px] font-bold uppercase tracking-[0.35em]"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#f5b040' }}
            >
              Energiespeicher
            </span>
            <h2
              className="font-black mt-3 mb-4 md:mb-6 leading-tight"
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                letterSpacing: '-0.04em',
                color: '#1a1a1a',
              }}
            >
              Strom speichern,{' '}
              <span style={gradientText}>wann immer</span>
              <br />
              Sie ihn brauchen
            </h2>
            <p
              className="text-base leading-relaxed mb-5 md:mb-8 max-w-md"
              style={{ color: 'rgba(26,26,26,0.6)', lineHeight: 1.7 }}
            >
              Unser Hochleistungsspeicher hält Ihren selbst erzeugten Solarstrom auch dann
              verfügbar, wenn die Sonne nicht scheint — für maximale Unabhängigkeit rund um
              die Uhr.
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 mb-5 md:mb-8">
              {features.map((f, i) => (
                <motion.div
                  key={f.label}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'rgba(245,176,64,0.08)',
                      border: '1px solid rgba(245,176,64,0.18)',
                    }}
                  >
                    <span
                      className="material-symbols-outlined icon-filled"
                      style={{ fontSize: '15px', color: '#f5b040' }}
                    >
                      {f.icon}
                    </span>
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: 'rgba(26,26,26,0.8)' }}
                  >
                    {f.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.button
              className="cta-pill flex items-center gap-2 rounded-full px-7 py-3.5 font-black text-xs uppercase"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                background: '#f5900a',
                color: '#ffffff',
                letterSpacing: '0.12em',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={onAngebot}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Speicher anfragen
              <span className="cta-icon"><span className="material-symbols-outlined icon-filled" style={{fontSize:"14px"}}>battery_charging_full</span></span>
            </motion.button>
          </motion.div>

          {/* Right: image + floating stat cards */}
          <motion.div
            className="relative rounded-3xl overflow-hidden"
            style={{ minHeight: 'clamp(260px, 50vw, 440px)' }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <img
              src={STORAGE_IMG}
              alt="Batteriespeicher"
              className="w-full h-full object-cover absolute inset-0"
              loading="lazy"
              decoding="async"
              style={{ opacity: 0.4 }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)',
              }}
            />

            {/* Floating stat cards */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
              <motion.div
                className="self-end px-4 py-3 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.92)',
                  border: '1px solid rgba(245,176,64,0.15)',
                  backdropFilter: 'blur(12px)',
                }}
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div
                  className="font-black leading-none"
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '1.8rem',
                    letterSpacing: '-0.04em',
                  }}
                >
                  <span className="text-gradient">98%</span>
                </div>
                <div
                  className="text-[9px] uppercase tracking-widest font-bold mt-1"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    color: 'rgba(26,26,26,0.5)',
                  }}
                >
                  Eigenverbrauch
                </div>
              </motion.div>

              <motion.div
                className="self-start px-4 py-3 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.92)',
                  border: '1px solid rgba(245,176,64,0.15)',
                  backdropFilter: 'blur(12px)',
                }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div
                  className="font-black leading-none"
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '1.8rem',
                    letterSpacing: '-0.04em',
                  }}
                >
                  <span className="text-gradient">20 kWh</span>
                </div>
                <div
                  className="text-[9px] uppercase tracking-widest font-bold mt-1"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    color: 'rgba(26,26,26,0.5)',
                  }}
                >
                  Max. Kapazität
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
