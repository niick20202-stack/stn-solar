import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookie-consent')) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'all')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie-consent', 'necessary')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed z-[100] left-4 right-4 md:left-auto md:right-6 md:max-w-sm"
          style={{ bottom: 'calc(env(safe-area-inset-bottom) + 5.5rem)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="rounded-2xl p-5"
            style={{
              background: 'rgba(20,20,20,0.96)',
              border: '1px solid rgba(255,255,255,0.10)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
            }}
          >
            <div className="flex items-start gap-3 mb-4">
              <span
                className="material-symbols-outlined icon-filled text-xl flex-shrink-0 mt-0.5"
                style={{ color: '#f5b040' }}
              >
                cookie
              </span>
              <div>
                <p
                  className="text-sm font-bold text-white mb-1"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  Cookies & Datenschutz
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'rgba(209,197,176,0.7)', fontFamily: 'DM Sans, sans-serif' }}
                >
                  Wir nutzen Cookies für Analyse und bessere Nutzererfahrung. Details in unserer{' '}
                  <Link to="/datenschutz" className="underline" style={{ color: '#f5b040' }}>
                    Datenschutzerklärung
                  </Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={decline}
                className="flex-1 rounded-xl py-2.5 text-xs font-bold uppercase tracking-wider transition-colors"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  color: 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  letterSpacing: '0.08em',
                }}
              >
                Nur notwendige
              </button>
              <button
                onClick={accept}
                className="flex-1 rounded-xl py-2.5 text-xs font-black uppercase tracking-wider"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  background: 'linear-gradient(135deg, #f5b040, #e07018)',
                  color: '#2a1600',
                  border: 'none',
                  cursor: 'pointer',
                  letterSpacing: '0.08em',
                }}
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
