import ProduktPage from './ProduktPage'
import type { ProduktData } from './ProduktPage'

const data: ProduktData = {
  icon: 'bolt',
  label: 'Notstrom',
  badge: 'Blackout-Schutz',
  color: '#5dca8a',
  tagline: 'Vollständige Stromversorgung auch beim Netzausfall — automatisch, innerhalb von Millisekunden.',

  stats: [
    { value: '< 20 ms',    label: 'Umschaltzeit',     icon: 'timer' },
    { value: '100 %',      label: 'Autarkiegrad',     icon: 'offline_bolt' },
    { value: 'bis 40 kWh', label: 'Speicherkapazität', icon: 'battery_charging_full' },
  ],

  intro: 'Ein Notstromsystem erkennt automatisch den Netzausfall und versorgt Ihr Haus innerhalb von Millisekunden aus dem Batteriespeicher weiter — ohne Unterbrechung. In Kombination mit einer PV-Anlage kann der Speicher tagsüber geladen werden und steht nachts oder bei Ausfällen vollständig zur Verfügung.',

  specs: [
    { label: 'Speicherhersteller / Modell', value: null },
    { label: 'Kapazität (kWh)',             value: null },
    { label: 'Notstrom-Typ',               value: null },
    { label: 'Umschaltzeit',               value: '< 20 Millisekunden' },
    { label: 'Anschluss',                  value: null },
    { label: 'Kompatible Wechselrichter',  value: null },
    { label: 'Garantie',                   value: null },
  ],

  benefits: [
    {
      icon: 'offline_bolt',
      title: 'Kein Stromausfall spürbar',
      desc: 'Die Umschaltung auf Batterie erfolgt so schnell, dass laufende Geräte und Computer nicht unterbrochen werden.',
    },
    {
      icon: 'battery_charging_full',
      title: 'Großer Puffer',
      desc: 'Mit 10–40 kWh Kapazität versorgen Sie Ihren Haushalt problemlos über mehrere Stunden oder Tage.',
    },
    {
      icon: 'solar_power',
      title: 'Tagsüber selbst laden',
      desc: 'Kombiniert mit einer PV-Anlage lädt sich der Speicher kostenlos — und ist beim nächsten Ausfall bereit.',
    },
  ],

  faqs: [
    {
      q: 'Was kann ich beim Notstrom betreiben?',
      a: null,
    },
    {
      q: 'Brauche ich dafür eine PV-Anlage?',
      a: 'Nein — ein Batteriespeicher mit Notstromfunktion kann auch ohne PV eingebaut und über das Netz geladen werden. Mit PV ist er aber deutlich effizienter.',
    },
    {
      q: 'Ist eine Baugenehmigung nötig?',
      a: null,
    },
    {
      q: 'Wie wird das System überwacht?',
      a: null,
    },
  ],
}

export default function Notstrom() {
  return <ProduktPage data={data} />
}
