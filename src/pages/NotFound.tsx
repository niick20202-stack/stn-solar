import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="grain relative min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: '#131313' }}>

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div style={{
          width: '60vw', height: '60vw', maxWidth: 600,
          background: 'radial-gradient(circle, rgba(245,176,64,0.05) 0%, transparent 65%)',
          borderRadius: '50%',
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        {/* Animated sun */}
        <motion.div className="flex justify-center mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
          <span className="material-symbols-outlined icon-filled"
            style={{ fontSize: '4rem', color: 'rgba(245,176,64,0.3)' }}>
            wb_sunny
          </span>
        </motion.div>

        {/* 404 */}
        <div className="font-black text-white mb-3 leading-none"
          style={{
            fontFamily: 'DM Sans',
            fontSize: 'clamp(6rem,20vw,14rem)',
            letterSpacing: '-0.06em',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(255,255,255,0.04))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
          404
        </div>

        <h1 className="text-white font-black mb-4"
          style={{ fontFamily: 'DM Sans', fontSize: 'clamp(1.4rem,3vw,2rem)', letterSpacing: '-0.04em' }}>
          Seite nicht gefunden
        </h1>
        <p className="text-base mb-10 max-w-sm mx-auto"
          style={{ color: 'rgba(209,197,176,0.5)', fontFamily: 'DM Sans', lineHeight: 1.7 }}>
          Die gesuchte Seite existiert nicht. Vielleicht wurde sie verschoben oder gelöscht.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/">
            <motion.div
              className="cta-pill inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-black text-xs uppercase"
              style={{
                fontFamily: 'Space Grotesk',
                background: 'linear-gradient(135deg, #f5b040, #e07018)',
                color: '#2a1600',
                letterSpacing: '0.12em',
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}>
              <span className="material-symbols-outlined icon-filled text-sm">home</span>
              Zur Startseite
            </motion.div>
          </Link>
          <Link to="/referenzen">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-black text-xs uppercase"
              style={{
                fontFamily: 'Space Grotesk',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.6)',
                letterSpacing: '0.12em',
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}>
              Referenzen ansehen
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
