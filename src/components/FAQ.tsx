import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'Wie lange dauert die Installation einer Solaranlage?',
    a: 'Die Montage selbst dauert in der Regel 1–2 Tage. Dazu kommt die Vorlaufzeit für Planung, Genehmigung und Netzanmeldung, die je nach Region 2–8 Wochen in Anspruch nehmen kann. Wir kümmern uns um den gesamten Prozess.',
  },
  {
    q: 'Lohnt sich eine Solaranlage auch bei bewölktem Wetter?',
    a: 'Ja. Moderne Hochleistungsmodule produzieren auch bei diffusem Licht oder Bewölkung signifikant Strom. In Deutschland sind durchschnittlich 950–1.300 Volllaststunden pro Jahr realistisch — Ihre Anlage arbeitet das ganze Jahr für Sie.',
  },
  {
    q: 'Welche Garantien erhalte ich auf die Anlage?',
    a: 'Sie erhalten 25 Jahre Garantie auf die Solarmodule, 10 Jahre auf Wechselrichter und Batteriespeicher — dazu unsere eigene Installationsgarantie. Sie sind rundum abgesichert.',
  },
  {
    q: 'Kann ich mein Elektroauto mit der Solaranlage laden?',
    a: 'Absolut. Mit unserer Wallbox-Integration laden Sie Ihr E-Fahrzeug direkt mit selbst erzeugtem Solarstrom – kostenlos und emissionsfrei. Das Energiemanagement priorisiert automatisch den Eigenverbrauch.',
  },
  {
    q: 'Brauche ich eine Baugenehmigung für die Solaranlage?',
    a: 'In den meisten Bundesländern sind Aufdach-Anlagen bis zu einer bestimmten Größe genehmigungsfrei. Wir prüfen die lokalen Vorschriften für Ihr Objekt und übernehmen alle nötigen Anmeldungen beim Netzbetreiber.',
  },
  {
    q: 'Was passiert bei Stromausfall – hat der Speicher Notstromfunktion?',
    a: 'Ja, unser Speichersystem bietet optionale Notstromversorgung. Im Falle eines Netzausfalls versorgt der Speicher Ihr Haus automatisch weiter – ohne Unterbrechung. Die Umschaltzeit beträgt unter 20 Millisekunden.',
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

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section
      id="faq"
      className="relative z-10 py-14 md:py-24 px-5 md:px-6"
    >
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-8 md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="text-[10px] font-bold uppercase tracking-[0.35em]"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#f5b040' }}
          >
            Häufige Fragen
          </span>
          <h2
            className="font-black mt-2 leading-tight"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              letterSpacing: '-0.04em',
              color: '#1a1a1a',
            }}
          >
            Alles Wichtige,{' '}
            <span style={gradientText}>klar beantwortet</span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              className="glow-card rounded-2xl overflow-hidden"
              style={{
                background: open === i ? 'rgba(245,176,64,0.04)' : '#ffffff',
                border:
                  open === i
                    ? '1px solid rgba(245,176,64,0.18)'
                    : '1px solid rgba(0,0,0,0.07)',
                transition: 'background 0.3s ease, border-color 0.3s ease',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-4 py-4 md:px-6 md:py-5 text-left"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span
                  className="font-bold text-sm leading-snug"
                  style={{ fontFamily: 'DM Sans, sans-serif', letterSpacing: '-0.01em', color: '#1a1a1a' }}
                >
                  {faq.q}
                </span>
                <motion.span
                  className="material-symbols-outlined flex-shrink-0"
                  style={{
                    color: open === i ? '#f5b040' : 'rgba(26,26,26,0.4)',
                    fontSize: '20px',
                  }}
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  add
                </motion.span>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p
                      className="px-4 pb-4 md:px-6 md:pb-5 text-sm leading-relaxed"
                      style={{ color: 'rgba(26,26,26,0.6)', lineHeight: 1.7 }}
                    >
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
