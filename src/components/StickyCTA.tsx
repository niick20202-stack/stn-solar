import { motion, AnimatePresence } from 'framer-motion'
import { useScrollY } from '../hooks/useScrollY'

export default function StickyCTA({ onAngebot }: { onAngebot: () => void }) {
  const scrollY  = useScrollY()
  const visible  = scrollY > window.innerHeight * 0.8

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={onAngebot}
          className="fixed z-40 hidden md:flex items-center gap-2.5 rounded-full px-5 py-3 font-black text-xs uppercase"
          style={{
            right: '1.5rem',
            bottom: '2rem',
            background: 'linear-gradient(135deg, #f5b040, #e07018)',
            color: '#2a1600',
            fontFamily: 'Space Grotesk, sans-serif',
            letterSpacing: '0.12em',
            boxShadow: '0 8px 32px rgba(245,176,64,0.35), 0 2px 8px rgba(0,0,0,0.4)',
            border: 'none',
            cursor: 'pointer',
          }}
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.06, y: -3, boxShadow: '0 12px 40px rgba(245,176,64,0.45)' }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="material-symbols-outlined icon-filled text-base">wb_sunny</span>
          Kostenlos beraten lassen
        </motion.button>
      )}
    </AnimatePresence>
  )
}
