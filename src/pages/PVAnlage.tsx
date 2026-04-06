import ProduktPage from './ProduktPage'
import type { ProduktData } from './ProduktPage'
import pvmontage from '../assets/pvmontage.png'

const data: ProduktData = {
  icon: 'solar_power',
  label: 'PV Anlage',
  badge: 'Photovoltaik',
  color: '#f5b040',
  tagline: 'Eigenen Solarstrom erzeugen, Stromkosten drastisch senken und die Energiewende aktiv mitgestalten.',

  stats: [
    { value: 'bis 1.800 €', label: 'Ersparnis / Jahr',  icon: 'savings' },
    { value: 'bis 70 %',    label: 'Eigenverbrauch',    icon: 'electric_meter' },
    { value: '6 Wochen',    label: 'Bis zur Anlage',    icon: 'calendar_month' },
  ],

  intro: 'Ihre eigene Solaranlage — einmal installiert, jahrzehntelang kostenloser Strom vom Dach. Wir planen, liefern und montieren alles aus einer Hand. Von der Genehmigung bis zum Netzanschluss kümmern wir uns um alles.',

  image: pvmontage,

  specs: [
    { label: 'Module',          value: 'JA Solar 500W Bifazial Full Black · Trina Vertex S+ Full Black' },
    { label: 'Leistung',        value: 'ab 5 kWp — individuell nach Dachfläche & Verbrauch' },
    { label: 'Wechselrichter',  value: null },
    { label: 'Montage',        value: 'Schienenlos oder klassisch — je nach Dach' },
    { label: 'Garantie',       value: '25 Jahre Leistungsgarantie auf Module' },
  ],

  benefits: [
    {
      icon: 'savings',
      title: 'Bis 1.800 € / Jahr sparen',
      desc: 'Wer tagsüber zuhause ist oder ein E-Auto lädt, spart noch mehr — Strom den Sie selbst erzeugen kostet nichts.',
    },
    {
      icon: 'home',
      title: 'Immobilienwert steigt',
      desc: 'Eine PV-Anlage erhöht den Marktwert Ihrer Immobilie nachweislich — und macht sie attraktiver beim Verkauf.',
    },
    {
      icon: 'eco',
      title: 'Sauber & unabhängig',
      desc: 'Kein Ärger mit Strompreiserhöhungen. Eigener Strom, eigene Regeln.',
    },
  ],

  faqs: [
    {
      q: 'Welche Anlagengröße passt zu mir?',
      a: 'Für ein Einfamilienhaus reichen meist 8–12 kWp. Wir berechnen die optimale Größe kostenlos auf Basis Ihres Jahresverbrauchs.',
    },
    {
      q: 'Muss ich sich selbst um die Anmeldung kümmern?',
      a: 'Nein — wir übernehmen die komplette Netzanmeldung beim Netzbetreiber und die Anmeldung im Marktstammdatenregister.',
    },
    {
      q: 'Gibt es staatliche Förderung?',
      a: null,
    },
    {
      q: 'Was passiert bei Stromausfall?',
      a: 'Eine Standard-PV-Anlage schaltet sich bei Netzausfall ab. Mit einer Notstrom-Erweiterung bleibt Ihr Haushalt weiter versorgt.',
    },
  ],
}

export default function PVAnlage() {
  return <ProduktPage data={data} />
}
