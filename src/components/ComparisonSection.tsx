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

type CellValue =
  | { type: 'yes'; label: string }
  | { type: 'no'; label: string }
  | { type: 'partial'; label: string }

interface Row {
  criteria: string
  stn: CellValue
  enpal: CellValue
  one5: CellValue
}

const rows: Row[] = [
  {
    criteria: 'Fester Ansprechpartner',
    stn:   { type: 'yes',     label: 'Von Tag 1 bis Inbetrieb' },
    enpal: { type: 'no',      label: 'Call-Center' },
    one5:  { type: 'partial', label: 'Je nach Standort' },
  },
  {
    criteria: 'Alles aus einer Hand',
    stn:   { type: 'yes',     label: 'Angebot → Montage → Start' },
    enpal: { type: 'partial', label: 'Komplett, aber Konzern' },
    one5:  { type: 'partial', label: 'Komplett, aber Konzern' },
  },
  {
    criteria: 'Regional & vor Ort',
    stn:   { type: 'yes',     label: 'Eigene Fachkräfte, Ihre Region' },
    enpal: { type: 'no',      label: 'Überregional' },
    one5:  { type: 'partial', label: '45 Standorte bundesweit' },
  },
  {
    criteria: 'Schnelle Umsetzung',
    stn:   { type: 'yes',     label: 'Innerhalb weniger Wochen' },
    enpal: { type: 'partial', label: 'Große Auftragslage' },
    one5:  { type: 'partial', label: 'Große Auftragslage' },
  },
  {
    criteria: 'Transparenter Festpreis',
    stn:   { type: 'yes',     label: 'Klares Angebot, keine Extras' },
    enpal: { type: 'partial', label: 'Miet- & Finanzierungsmodell' },
    one5:  { type: 'no',      label: 'Komplexe Pakete' },
  },
  {
    criteria: '0 % Mehrwertsteuer',
    stn:   { type: 'yes', label: 'Inklusive' },
    enpal: { type: 'yes', label: 'Inklusive' },
    one5:  { type: 'yes', label: 'Inklusive' },
  },
  {
    criteria: 'Produktgarantie',
    stn:   { type: 'yes',     label: '25 Jahre auf Module' },
    enpal: { type: 'partial', label: '20 Jahre' },
    one5:  { type: 'yes',     label: '30 Jahre' },
  },
]

function Cell({ value, highlight }: { value: CellValue; highlight?: boolean }) {
  const icon =
    value.type === 'yes'     ? 'check_circle' :
    value.type === 'no'      ? 'cancel' :
    'radio_button_partial'

  const iconColor =
    value.type === 'yes'     ? (highlight ? '#f5b040' : '#5dca8a') :
    value.type === 'no'      ? 'rgba(255,100,100,0.7)' :
    'rgba(255,255,255,0.35)'

  const textColor =
    value.type === 'yes'     ? (highlight ? 'rgba(255,255,255,0.92)' : 'rgba(229,226,225,0.85)') :
    value.type === 'no'      ? 'rgba(255,255,255,0.35)' :
    'rgba(255,255,255,0.5)'

  return (
    <div className="flex flex-col items-center gap-1.5 text-center px-2">
      <span
        className="material-symbols-outlined icon-filled"
        style={{ fontSize: '22px', color: iconColor }}
      >
        {icon}
      </span>
      <span
        className="text-[10px] font-semibold leading-snug"
        style={{ fontFamily: 'DM Sans, sans-serif', color: textColor, maxWidth: '9ch' }}
      >
        {value.label}
      </span>
    </div>
  )
}

export default function ComparisonSection({ onAngebot }: { onAngebot: () => void }) {
  return (
    <section id="vergleich" className="relative z-10 py-14 md:py-24 px-5 md:px-6 overflow-hidden">
      {/* Ambient glow */}
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
            className="font-black text-white mt-2 leading-tight"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 'clamp(1.9rem, 5vw, 3.2rem)',
              letterSpacing: '-0.04em',
            }}
          >
            Kein Konzern.{' '}
            <span style={gradientText}>Ihr direkter Partner.</span>
          </h2>
          <p
            className="mt-4 max-w-xl mx-auto text-base"
            style={{ color: 'rgba(209,197,176,0.65)', lineHeight: 1.7, fontFamily: 'DM Sans' }}
          >
            Enpal und 1komma5° sind Milliardenkonzerne mit Tausenden Aufträgen. Wir sind Ihr
            regionaler Solarpartner — ein Team, ein Ansprechpartner, von der ersten Anfrage bis
            zum letzten Kabel.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl overflow-hidden"
          style={{
            border: '1px solid rgba(255,255,255,0.09)',
            background: 'rgba(255,255,255,0.03)',
          }}
        >
          {/* Column headers */}
          <div
            className="grid"
            style={{ gridTemplateColumns: '1fr repeat(3, minmax(0, 1fr))' }}
          >
            {/* Criteria header (empty) */}
            <div className="p-4 md:p-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }} />

            {/* STN Solar header — highlighted */}
            <div
              className="flex flex-col items-center justify-center gap-1.5 p-4 md:p-6 relative"
              style={{
                background: 'rgba(245,176,64,0.08)',
                borderBottom: '1px solid rgba(245,176,64,0.2)',
                borderLeft: '1px solid rgba(245,176,64,0.15)',
                borderRight: '1px solid rgba(245,176,64,0.15)',
              }}
            >
              {/* "Empfohlen" pill */}
              <span
                className="absolute -top-3 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
                style={{
                  fontFamily: 'Space Grotesk',
                  background: 'linear-gradient(135deg, #f5b040, #e07018)',
                  color: '#2a1600',
                  whiteSpace: 'nowrap',
                }}
              >
                Ihr Partner
              </span>
              <span
                className="material-symbols-outlined icon-filled text-2xl"
                style={{ color: '#f5b040' }}
              >
                wb_sunny
              </span>
              <span
                className="font-black text-white text-sm md:text-base"
                style={{ fontFamily: 'DM Sans', letterSpacing: '-0.03em' }}
              >
                STN Solar
              </span>
              <span
                className="text-[9px] font-bold uppercase tracking-widest"
                style={{ fontFamily: 'Space Grotesk', color: '#f5b040' }}
              >
                Regional
              </span>
            </div>

            {/* Enpal header */}
            <div
              className="flex flex-col items-center justify-center gap-1.5 p-4 md:p-6"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
            >
              <span
                className="material-symbols-outlined text-2xl"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                business
              </span>
              <span
                className="font-bold text-center text-sm"
                style={{ fontFamily: 'DM Sans', color: 'rgba(255,255,255,0.45)', letterSpacing: '-0.02em' }}
              >
                Enpal
              </span>
              <span
                className="text-[9px] font-bold uppercase tracking-widest"
                style={{ fontFamily: 'Space Grotesk', color: 'rgba(255,255,255,0.2)' }}
              >
                Konzern
              </span>
            </div>

            {/* 1komma5 header */}
            <div
              className="flex flex-col items-center justify-center gap-1.5 p-4 md:p-6"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
            >
              <span
                className="material-symbols-outlined text-2xl"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                corporate_fare
              </span>
              <span
                className="font-bold text-center text-xs md:text-sm"
                style={{ fontFamily: 'DM Sans', color: 'rgba(255,255,255,0.45)', letterSpacing: '-0.02em' }}
              >
                1KOMMA5°
              </span>
              <span
                className="text-[9px] font-bold uppercase tracking-widest"
                style={{ fontFamily: 'Space Grotesk', color: 'rgba(255,255,255,0.2)' }}
              >
                Konzern
              </span>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.criteria}
              className="grid"
              style={{
                gridTemplateColumns: '1fr repeat(3, minmax(0, 1fr))',
                borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.05)',
                background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
              }}
            >
              {/* Criteria label */}
              <div
                className="flex items-center px-4 md:px-6 py-4 md:py-5"
              >
                <span
                  className="text-xs md:text-sm font-bold leading-snug"
                  style={{ fontFamily: 'DM Sans, sans-serif', color: 'rgba(209,197,176,0.8)' }}
                >
                  {row.criteria}
                </span>
              </div>

              {/* STN Solar cell — highlighted */}
              <div
                className="flex items-center justify-center py-4 md:py-5"
                style={{
                  background: 'rgba(245,176,64,0.05)',
                  borderLeft: '1px solid rgba(245,176,64,0.12)',
                  borderRight: '1px solid rgba(245,176,64,0.12)',
                }}
              >
                <Cell value={row.stn} highlight />
              </div>

              {/* Enpal cell */}
              <div className="flex items-center justify-center py-4 md:py-5">
                <Cell value={row.enpal} />
              </div>

              {/* 1komma5 cell */}
              <div className="flex items-center justify-center py-4 md:py-5">
                <Cell value={row.one5} />
              </div>
            </div>
          ))}

          {/* Bottom CTA row */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: '1fr repeat(3, minmax(0, 1fr))',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              background: 'rgba(245,176,64,0.03)',
            }}
          >
            <div className="px-4 md:px-6 py-5 flex items-center">
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ fontFamily: 'Space Grotesk', color: 'rgba(255,255,255,0.25)' }}
              >
                Jetzt starten
              </span>
            </div>
            <div
              className="flex items-center justify-center py-5 px-2"
              style={{
                background: 'rgba(245,176,64,0.07)',
                borderLeft: '1px solid rgba(245,176,64,0.15)',
                borderRight: '1px solid rgba(245,176,64,0.15)',
              }}
            >
              <motion.button
                onClick={onAngebot}
                className="cta-pill rounded-full px-4 py-2.5 font-black text-[10px] uppercase"
                style={{
                  fontFamily: 'Space Grotesk',
                  background: 'linear-gradient(135deg, #f5b040, #e07018)',
                  color: '#2a1600',
                  letterSpacing: '0.08em',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Kostenlos anfragen
              </motion.button>
            </div>
            <div className="flex items-center justify-center py-5">
              <span
                className="text-[9px] text-center"
                style={{ fontFamily: 'DM Sans', color: 'rgba(255,255,255,0.18)' }}
              >
                Eigene Website
              </span>
            </div>
            <div className="flex items-center justify-center py-5">
              <span
                className="text-[9px] text-center"
                style={{ fontFamily: 'DM Sans', color: 'rgba(255,255,255,0.18)' }}
              >
                Eigene Website
              </span>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <p
          className="text-center text-[9px] mt-5"
          style={{ color: 'rgba(255,255,255,0.18)', fontFamily: 'DM Sans' }}
        >
          Vergleich basiert auf öffentlich verfügbaren Angaben der jeweiligen Anbieter. Stand: 2025.
        </p>
      </div>
    </section>
  )
}
