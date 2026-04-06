import { useEffect, useRef, useState } from 'react'

// Shared scroll state — one RAF loop + one listener for all consumers
let subscribers = new Set<(y: number) => void>()
let currentScrollY = 0
let rafId = 0
let listening = false

function startListening() {
  if (listening) return
  listening = true

  const onScroll = () => {
    cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(() => {
      currentScrollY = window.scrollY
      subscribers.forEach((cb) => cb(currentScrollY))
    })
  }

  window.addEventListener('scroll', onScroll, { passive: true })
}

export function useScrollY() {
  const [scrollY, setScrollY] = useState(() =>
    typeof window !== 'undefined' ? window.scrollY : 0
  )
  const cbRef = useRef(setScrollY)
  cbRef.current = setScrollY

  useEffect(() => {
    const cb = (y: number) => cbRef.current(y)
    subscribers.add(cb)
    startListening()
    return () => { subscribers.delete(cb) }
  }, [])

  return scrollY
}
