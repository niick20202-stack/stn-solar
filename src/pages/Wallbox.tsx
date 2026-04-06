import ProduktPage from './ProduktPage'
import type { ProduktData } from './ProduktPage'

const data: ProduktData = {
  icon: 'ev_station',
  label: 'Wallbox',
  badge: 'E-Auto Laden',
  color: '#4a9eff',
  tagline: 'Laden Sie Ihr Elektroauto bequem zuhause — schnell, smart und wenn möglich mit eigenem Solarstrom.',

  stats: [
    { value: '11 – 22 kW', label: 'Ladeleistung',      icon: 'bolt' },
    { value: '0 → 80 %',   label: 'In ~4 Stunden',     icon: 'timer' },
    { value: '0 ct/kWh',   label: 'Mit PV-Strom',      icon: 'solar_power' },
  ],

  intro: 'Eine Wallbox lädt Ihr E-Auto 5–10× schneller als eine normale Haushaltssteckdose. Mit 11 kW Ladeleistung ist ein Akku über Nacht vollständig geladen. In Kombination mit einer PV-Anlage und einem Lademanagement-System können Sie priorisiert mit eigenem Solarstrom laden und so die Betriebskosten auf nahezu null senken.',

  specs: [
    { label: 'Hersteller / Modell',   value: null },
    { label: 'Ladeleistung',          value: null },
    { label: 'Phasen',               value: null },
    { label: 'Kabel oder Typ-2-Dose', value: null },
    { label: 'App-Steuerung',        value: null },
    { label: 'OCPP-fähig',           value: null },
    { label: 'Garantie',             value: null },
  ],

  benefits: [
    {
      icon: 'speed',
      title: 'Schnell & bequem',
      desc: 'Kein Umweg zur öffentlichen Ladesäule — abends einstecken, morgens vollgeladen losfahren.',
    },
    {
      icon: 'solar_power',
      title: 'Laden mit Solarstrom',
      desc: 'Intelligentes Lademanagement nutzt PV-Überschuss zuerst für das Auto — kostenlos und grün.',
    },
    {
      icon: 'smartphone',
      title: 'Smart & steuerbar',
      desc: 'Per App Ladezeiten planen, Verbrauch überwachen und Ladestrom anpassen — von überall.',
    },
  ],

  faqs: [
    {
      q: 'Welche Wallbox passt zu meinem Auto?',
      a: null,
    },
    {
      q: 'Brauche ich einen neuen Zähler / Hausanschluss?',
      a: null,
    },
    {
      q: 'Kann ich die Wallbox mit PV kombinieren?',
      a: 'Ja — mit einem kompatiblen Energiemanagementsystem lädt die Wallbox automatisch dann, wenn PV-Überschuss vorhanden ist. So fahren Sie de facto kostenlos.',
    },
    {
      q: 'Gibt es Förderung für Wallboxen?',
      a: null,
    },
  ],
}

export default function Wallbox() {
  return <ProduktPage data={data} />
}
