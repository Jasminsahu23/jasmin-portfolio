import { useEffect } from 'react'
import { prefersReducedMotion } from './useInView'

// Writes the pointer position to CSS variables so one fixed glow can follow it.
export function usePointerGlow() {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine || prefersReducedMotion()) return undefined
    const root = document.documentElement
    let raf = 0
    let x = window.innerWidth * 0.7
    let y = window.innerHeight * 0.3
    const apply = () => {
      root.style.setProperty('--mx', `${x}px`)
      root.style.setProperty('--my', `${y}px`)
      raf = 0
    }
    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      if (!raf) raf = requestAnimationFrame(apply)
    }
    apply()
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
}
