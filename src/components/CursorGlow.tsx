import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const gridRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const mouse   = useRef({ x: -9999, y: -9999 })
  const dirty   = useRef(false)
  const rafRef  = useRef<number>(0)

  useEffect(() => {
    const gridEl = gridRef.current
    const glowEl = glowRef.current
    if (!gridEl || !glowEl || 'ontouchstart' in window) return

    // ── Card cache ────────────────────────────────────────────────
    let cards: HTMLElement[] = []
    let rects: DOMRect[]    = []
    let prevOp: number[]    = []

    const refreshCards = () => {
      cards  = Array.from(document.querySelectorAll<HTMLElement>('.glow-card, .feature-card, .customer-card'))
      rects  = cards.map((c) => c.getBoundingClientRect())
      prevOp = new Array(cards.length).fill(0)
    }
    refreshCards()

    // Rects shift on scroll — re-snapshot them (no DOM queries, just fast reads)
    const onScroll = () => { rects = cards.map((c) => c.getBoundingClientRect()) }
    const onResize = () => { refreshCards() }
    // Catch lazy-loaded cards entering the DOM
    const cardInterval = setInterval(refreshCards, 3000)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    // ── Mouse: only set dirty flag ────────────────────────────────
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      dirty.current = true
    }

    // ── RAF: skip all work when mouse is still ────────────────────
    const tick = () => {
      if (dirty.current) {
        dirty.current = false
        const { x, y } = mouse.current

        // Grid mask (GPU composited — essentially free)
        const mask = `radial-gradient(340px circle at ${x}px ${y}px, black 0%, transparent 100%)`
        gridEl.style.webkitMaskImage = mask
        gridEl.style.maskImage       = mask

        // Ambient spotlight
        glowEl.style.background = `radial-gradient(260px circle at ${x}px ${y}px, rgba(245,176,64,0.045) 0%, rgba(224,112,24,0.012) 55%, transparent 70%)`

        // Edge glow — cached rects, skip if near-zero on both frames
        for (let i = 0; i < cards.length; i++) {
          const rect    = rects[i]
          const dx      = Math.max(0, rect.left - x, x - rect.right)
          const dy      = Math.max(0, rect.top  - y, y - rect.bottom)
          const dist    = Math.sqrt(dx * dx + dy * dy)
          const opacity = dist < 280 ? Math.pow(1 - dist / 280, 1.5) : 0

          if (opacity < 0.002 && prevOp[i] < 0.002) continue

          prevOp[i] = opacity
          const card = cards[i]
          card.style.setProperty('--glow-x',  `${x - rect.left}px`)
          card.style.setProperty('--glow-y',  `${y - rect.top}px`)
          card.style.setProperty('--glow-op', `${opacity}`)
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll',    onScroll)
      window.removeEventListener('resize',    onResize)
      cancelAnimationFrame(rafRef.current)
      clearInterval(cardInterval)
    }
  }, [])

  return (
    <>
      <div
        ref={gridRef}
        style={{
          position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
          backgroundImage: [
            'radial-gradient(circle, rgba(245,176,64,0.25) 1px, transparent 1px)',
            'linear-gradient(rgba(245,176,64,0.07) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(245,176,64,0.07) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '80px 80px',
          WebkitMaskImage: 'radial-gradient(340px circle at -9999px -9999px, black 0%, transparent 100%)',
          maskImage:        'radial-gradient(340px circle at -9999px -9999px, black 0%, transparent 100%)',
        }}
      />
      <div ref={glowRef} style={{ position: 'fixed', inset: 0, zIndex: 2, pointerEvents: 'none' }} />
    </>
  )
}
