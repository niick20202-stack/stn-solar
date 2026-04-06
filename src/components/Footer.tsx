import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const links = [
  { label: 'Referenzen', to: '/referenzen' },
  { label: 'Spar-Rechner', to: '/rechner' },
  { label: 'Impressum', to: '/impressum' },
  { label: 'Datenschutz', to: '/datenschutz' },
]

const socials = [
  { icon: 'language', label: 'Website', href: '/' },
  { icon: 'mail', label: 'Email', href: 'mailto:info@stn-solar.de' },
  { icon: 'phone', label: 'Telefon', href: 'tel:+491234567890' },
]

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden pb-36 md:pb-0 reveal"
      style={{ background: '#f8f7f5', borderTop: '1px solid rgba(0,0,0,0.07)' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row justify-between items-center gap-10">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <motion.div
            className="flex items-center gap-2.5 cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <span
              className="material-symbols-outlined icon-filled text-2xl"
              style={{ color: '#f5b040' }}
            >
              wb_sunny
            </span>
            <span
              className="font-black text-2xl tracking-tighter"
              style={{
                fontFamily: 'DM Sans, sans-serif',
                letterSpacing: '-0.05em',
                color: 'rgba(26,26,26,0.6)',
              }}
            >
              STN Solar
            </span>
          </motion.div>
          <p
            className="text-[9px] font-bold uppercase tracking-widest text-center md:text-left"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(26,26,26,0.4)' }}
          >
            © {new Date().getFullYear()} STN Solar · Neuss, NRW · Seit 2018
          </p>

          {/* Social icons */}
          <div className="flex gap-3 mt-1">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(0,0,0,0.04)',
                  border: '1px solid rgba(0,0,0,0.08)',
                }}
                whileHover={{ scale: 1.1, borderColor: 'rgba(245,176,64,0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="material-symbols-outlined text-base" style={{ color: 'rgba(26,26,26,0.5)' }}>
                  {s.icon}
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-8">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-200"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(26,26,26,0.5)' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Tagline */}
        <div className="text-center md:text-right">
          <p
            className="text-xs font-bold"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(26,26,26,0.4)' }}
          >
            Made with ☀ in Deutschland
          </p>
          <p
            className="text-[9px] uppercase tracking-widest mt-1"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(26,26,26,0.3)' }}
          >
            Energie. Heute. Morgen.
          </p>
        </div>
      </div>

      {/* Large background text */}
      <div
        className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none overflow-hidden"
        style={{ bottom: '-0.15em' }}
      >
        <span
          className="font-black text-white select-none"
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(6rem, 18vw, 16rem)',
            letterSpacing: '-0.06em',
            opacity: 0.025,
            lineHeight: 1,
          }}
        >
          SOLAR
        </span>
      </div>
    </footer>
  )
}
