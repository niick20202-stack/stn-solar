import { lazy, Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import ReonicModal from '../components/ReonicModal'

const Footer = lazy(() => import('../components/Footer'))

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-white font-black mb-3" style={{ fontFamily: 'DM Sans', fontSize: '1.1rem', letterSpacing: '-0.03em' }}>
        {title}
      </h2>
      <div className="text-sm leading-relaxed space-y-2" style={{ color: 'rgba(209,197,176,0.65)', fontFamily: 'DM Sans', lineHeight: 1.8 }}>
        {children}
      </div>
    </div>
  )
}

export default function Datenschutz() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div className="grain relative min-h-screen" style={{ backgroundColor: '#131313' }}>
      <ReonicModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <Navbar onAngebot={() => setModalOpen(true)} />
      <main className="relative z-10 pt-36 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block"
              style={{ fontFamily: 'Space Grotesk', color: '#f5b040' }}>
              Rechtliches
            </span>
            <h1 className="text-white font-black mb-12 leading-tight"
              style={{ fontFamily: 'DM Sans', fontSize: 'clamp(2rem,5vw,3rem)', letterSpacing: '-0.04em' }}>
              Datenschutzerklärung
            </h1>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '2.5rem' }}>
              <Section title="1. Datenschutz auf einen Blick">
                <p><strong style={{ color: 'rgba(255,255,255,0.7)' }}>Allgemeine Hinweise</strong><br />
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>

                <p><strong style={{ color: 'rgba(255,255,255,0.7)' }}>Datenerfassung auf dieser Website</strong><br />
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p>

                <p><strong style={{ color: 'rgba(255,255,255,0.7)' }}>Wie erfassen wir Ihre Daten?</strong><br />
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z.B. Daten, die Sie in ein Kontaktformular eingeben). Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst (v.a. technische Daten wie Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).</p>
              </Section>

              <Section title="2. Verantwortliche Stelle">
                <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br /><br />
                STN Solar GmbH<br />
                Musterstraße 1<br />
                12345 Musterstadt<br />
                Telefon: +49 (0) 123 456 7890<br />
                E-Mail: datenschutz@stn-solar.de</p>
              </Section>

              <Section title="3. Hosting">
                <p>Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Die Nutzung des Hosters erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO).</p>
              </Section>

              <Section title="4. Cookies">
                <p>Diese Website verwendet Cookies. Cookies sind kleine Textdateien, die Ihr Webbrowser auf Ihrem Endgerät speichert. Cookies helfen uns dabei, unser Angebot nutzerfreundlicher zu machen.</p>
                <p>Einige Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese löschen. Sie ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen. Wenn Sie dies nicht wünschen, können Sie Ihren Browser so einrichten, dass er Sie über das Setzen von Cookies informiert.</p>
                <p><strong style={{ color: 'rgba(255,255,255,0.7)' }}>Notwendige Cookies</strong><br />
                Wir setzen notwendige Cookies ein, um den ordnungsgemäßen Betrieb dieser Website sicherzustellen (Art. 6 Abs. 1 lit. f DSGVO). Die Speicherung Ihrer Cookie-Einstellungen erfolgt in Ihrem lokalen Browser-Speicher (localStorage).</p>
              </Section>

              <Section title="5. Anfrage per E-Mail oder Kontaktformular">
                <p>Wenn Sie uns per E-Mail oder über unser Kontaktformular (Reonic-Widget) kontaktieren, werden Ihre Angaben inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
                <p>Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist.</p>
              </Section>

              <Section title="6. Ihre Rechte">
                <p>Sie haben jederzeit das Recht:</p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Auskunft über Ihre bei uns gespeicherten Daten zu erhalten (Art. 15 DSGVO)</li>
                  <li>Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO)</li>
                  <li>Löschung Ihrer gespeicherten Daten zu verlangen (Art. 17 DSGVO)</li>
                  <li>Einschränkung der Datenverarbeitung zu verlangen (Art. 18 DSGVO)</li>
                  <li>Widerspruch gegen die Verarbeitung einzulegen (Art. 21 DSGVO)</li>
                  <li>Datenübertragbarkeit zu verlangen (Art. 20 DSGVO)</li>
                </ul>
                <p className="mt-2">Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer Daten zu beschweren.</p>
              </Section>

              <Section title="7. Widerruf Ihrer Einwilligung">
                <p>Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt. Kontaktieren Sie uns hierfür unter: datenschutz@stn-solar.de</p>
              </Section>

              <p className="text-[10px] mt-8" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'Space Grotesk' }}>
                Stand: März 2025
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Suspense fallback={null}><Footer /></Suspense>
    </div>
  )
}
