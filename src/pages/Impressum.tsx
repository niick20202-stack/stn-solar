import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import ReonicModal from '../components/ReonicModal'
import { useState } from 'react'

const Footer = lazy(() => import('../components/Footer'))

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="font-black mb-3" style={{ fontFamily: 'DM Sans', fontSize: '1.1rem', letterSpacing: '-0.03em', color: '#1a1a1a' }}>
        {title}
      </h2>
      <div className="text-sm leading-relaxed space-y-2" style={{ color: 'rgba(26,26,26,0.65)', fontFamily: 'DM Sans', lineHeight: 1.8 }}>
        {children}
      </div>
    </div>
  )
}

export default function Impressum() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div className="grain relative min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      <ReonicModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <Navbar onAngebot={() => setModalOpen(true)} />
      <main className="relative z-10 pt-36 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block"
              style={{ fontFamily: 'Space Grotesk', color: '#f5b040' }}>
              Rechtliches
            </span>
            <h1 className="font-black mb-12 leading-tight"
              style={{ fontFamily: 'DM Sans', fontSize: 'clamp(2rem,5vw,3rem)', letterSpacing: '-0.04em', color: '#1a1a1a' }}>
              Impressum
            </h1>

            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '2.5rem' }}>
              <Section title="Angaben gemäß § 5 TMG">
                <p>STN Solar<br />
                Inhaber: Serhiy Panasyuk<br />
                In der Hött 1<br />
                41469 Neuss<br />
                Deutschland</p>
              </Section>

              <Section title="Kontakt">
                <p>Telefon: [BITTE EINTRAGEN]<br />
                E-Mail: info@stn-solar.de<br />
                Website: www.stn-solar.de</p>
              </Section>

              <Section title="Umsatzsteuer">
                <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                [BITTE USt-IdNr. oder Steuernummer eintragen]</p>
              </Section>

              <Section title="EU-Streitschlichtung">
                <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer"
                  style={{ color: '#f5b040' }}>https://ec.europa.eu/consumers/odr</a>.<br />
                Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
              </Section>

              <Section title="Haftung für Inhalte">
                <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
                <p>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
              </Section>

              <Section title="Haftung für Links">
                <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>
              </Section>

              <Section title="Urheberrecht">
                <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
              </Section>
            </div>
          </motion.div>
        </div>
      </main>
      <Suspense fallback={null}><Footer /></Suspense>
    </div>
  )
}
