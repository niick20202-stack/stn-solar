import ProduktPage from './ProduktPage'
import type { ProduktData } from './ProduktPage'

const data: ProduktData = {
  icon: 'heat_pump',
  label: 'Wärmepumpe',
  badge: 'Heizen & Kühlen',
  color: '#e07018',
  tagline: 'Effizient heizen, kühlen und Warmwasser bereiten — mit erneuerbarer Energie aus der Umgebungsluft.',

  stats: [
    { value: 'bis COP 5',  label: 'Jahresarbeitszahl',   icon: 'show_chart' },
    { value: 'bis 70 %',   label: 'Förderung (BEG)',     icon: 'account_balance' },
    { value: '–35 %',      label: 'Heizkosten vs. Gas',  icon: 'trending_down' },
  ],

  intro: 'Wärmepumpen entziehen der Außenluft, dem Erdreich oder Grundwasser Wärme und heben sie auf Heiztemperatur. Das häufigste Modell für Bestandsgebäude ist die Luft-Wasser-Wärmepumpe — sie braucht keine aufwendige Erschließung und lässt sich gut mit einer PV-Anlage kombinieren, um die Betriebskosten weiter zu senken.',

  specs: [
    { label: 'Hersteller / Modell',      value: null },
    { label: 'Typ',                       value: null },
    { label: 'Heizleistung (kW)',         value: null },
    { label: 'Jahresarbeitszahl (JAZ)',   value: null },
    { label: 'Kühlfunktion',             value: null },
    { label: 'Warmwasserintegration',    value: null },
    { label: 'Garantie',                 value: null },
  ],

  benefits: [
    {
      icon: 'thermostat',
      title: 'Heizen & Kühlen in einem',
      desc: 'Viele Wärmepumpen können im Sommer als Klimaanlage arbeiten — ohne separates Gerät.',
    },
    {
      icon: 'account_balance',
      title: 'Hohe staatliche Förderung',
      desc: 'Über das Bundesförderungsprogramm BEG sind bis zu 70 % Zuschuss möglich.',
    },
    {
      icon: 'solar_power',
      title: 'Perfekt mit PV kombinierbar',
      desc: 'Tagsüber Solarstrom direkt in Wärme umwandeln — so sinken die Betriebskosten auf ein Minimum.',
    },
  ],

  faqs: [
    {
      q: 'Eignet sich mein Haus für eine Wärmepumpe?',
      a: null,
    },
    {
      q: 'Welche Heizkörper / Fußbodenheizung ist nötig?',
      a: null,
    },
    {
      q: 'Wie hoch sind die laufenden Kosten?',
      a: null,
    },
    {
      q: 'Wie lange dauert die Installation?',
      a: 'Die Montage einer Luft-Wasser-Wärmepumpe dauert in der Regel 2–4 Tage. Planung und Genehmigung sind im 6-Wochen-Zeitplan bereits enthalten.',
    },
  ],
}

export default function Waermepumpe() {
  return <ProduktPage data={data} />
}
