import { motion } from 'framer-motion'

const gradientText = {
  fontFamily: 'Instrument Serif, Arial, sans-serif',
  fontStyle: 'italic' as const,
  fontWeight: 400,
  background: 'linear-gradient(135deg, #f5b040 0%, #e07018 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const usps = [
  {
    icon: 'person',
    title: 'Ein Ansprechpartner',
    desc: 'Ihr fester Ansprechpartner begleitet Sie von der ersten Anfrage bis zum Netzanschluss — kein Weiterleiten, kein Ticketsystem.',
  },
  {
    icon: 'bolt',
    title: 'Inbetrieb in 6 Wochen*',
    desc: 'Kein bürokratischer Apparat. Unser schlankes Team handelt schnell — von der Planung bis zum ersten selbsterzeugten Strom.',
  },
  {
    icon: 'location_on',
    title: 'Regional in NRW',
    desc: '150+ installierte Anlagen in Ihrer Region. Wir kennen die lokalen Bedingungen, Netzbetreiber und Fördermöglichkeiten.',
  },
  {
    icon: 'construction',
    title: 'Eigene Monteure',
    desc: 'Keine Subunternehmer. Unser eigenes Fachteam installiert — das garantiert gleichbleibende Qualität und direkte Haftung.',
  },
  {
    icon: 'receipt_long',
    title: 'Fairer Festpreis',
    desc: 'Was wir anbieten, das kostet es auch. Kein verstecktes Kleingedrucktes, keine nachträglichen Zusatzkosten.',
  },
  {
    icon: 'support_agent',
    title: 'Langfristiger Service',
    desc: 'Wir sind auch nach der Installation erreichbar. Als lokales Unternehmen sind wir in 10 Jahren noch Ihr Ansprechpartner.',
  },
]

export default function ComparisonSection({ onAngebot }: { onAngebot: () => void }) {
  return (
    <section id="vergleich" className="relative z-10 py-14 md:py-24 px-5 md:px-6 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vw] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(245,176,64,0.04) 0%, transparent 65%)' }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="text-[10px] font-bold uppercase tracking-[0.35em]"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#f5b040' }}
          >
            Warum STN Solar?
          </span>
          <h2
            className="font-black mt-2 leading-tight"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 'clamp(1.9rem, 5vw, 3.2rem)',
              letterSpacing: '-0.04em',
              color: '#1a1a1a',
            }}
          >
            Regional. Persönlich.{' '}
            <span style={gradientText}>Komplett.</span>
          </h2>
          <p
            className="mt-4 max-w-xl mx-auto text-base"
            style={{ color: 'rgba(26,26,26,0.6)', lineHeight: 1.7, fontFamily: 'DM Sans' }}
          >
            Wir sind kein anonymer Großkonzern. Wir sind Ihr Solarpartner in NRW —
            150+ montierte Anlagen, ein festes Team und von der Anfrage bis zur
            Inbetriebnahme in{' '}
            <span style={{ color: '#f5b040', fontWeight: 700 }}>in 6 Wochen.</span>
          </p>
        </motion.div>

        {/* USP grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {usps.map((usp, i) => (
            <motion.div
              key={usp.title}
              className="feature-card glow-card rounded-2xl p-5 flex flex-col gap-3"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'rgba(245,176,64,0.08)',
                  border: '1px solid rgba(245,176,64,0.18)',
                }}
              >
                <span
                  className="material-symbols-outlined icon-filled"
                  style={{ fontSize: '18px', color: '#f5b040' }}
                >
                  {usp.icon}
                </span>
              </div>
              <div>
                <p
                  className="font-black leading-tight mb-1.5"
                  style={{ fontFamily: 'DM Sans', fontSize: '0.95rem', letterSpacing: '-0.02em', color: '#1a1a1a' }}
                >
                  {usp.title}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'rgba(26,26,26,0.6)', lineHeight: 1.65, fontFamily: 'DM Sans' }}
                >
                  {usp.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA strip */}
        <motion.div
          className="rounded-2xl p-5 md:p-7 flex flex-col sm:flex-row items-center justify-between gap-5"
          style={{
            background: 'rgba(245,176,64,0.05)',
            border: '1px solid rgba(245,176,64,0.15)',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div>
            <p
              className="font-black leading-tight"
              style={{ fontFamily: 'DM Sans', fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', letterSpacing: '-0.03em', color: '#1a1a1a' }}
            >
              Überzeugt? Kostenlos & unverbindlich anfragen.
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: 'rgba(26,26,26,0.5)', fontFamily: 'DM Sans' }}
            >
              Kein Callcenter. Direkt Ihr persönlicher Ansprechpartner.
            </p>
          </div>
          <motion.button
            onClick={onAngebot}
            className="cta-pill flex-shrink-0 flex items-center gap-2 rounded-full px-6 py-3 font-black text-xs uppercase"
            style={{
              fontFamily: 'Space Grotesk',
              background: '#f5900a',
              color: '#ffffff',
              letterSpacing: '0.1em',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="cta-icon"><span className="material-symbols-outlined icon-filled" style={{fontSize:"14px"}}>wb_sunny</span></span>
            Jetzt kostenlos anfragen
          </motion.button>
        </motion.div>

        <p
          className="text-center text-[9px] mt-4"
          style={{ color: 'rgba(26,26,26,0.35)', fontFamily: 'DM Sans' }}
        >
          *6 Wochen von Anfrage bis Inbetriebnahme (inkl. Planung, Montage & Netzanmeldung).
        </p>
      </div>
    </section>
  )
}
