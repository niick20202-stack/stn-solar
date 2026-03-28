import { useEffect, useRef, useState } from 'react'

// Single shared rAF-throttled scroll value — prevents multiple setState calls
// from separate components all firing on the same scroll event.
export function useScrollY() {
  const [scrollY, setScrollY] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => setScrollY(window.scrollY))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return scrollY
}
