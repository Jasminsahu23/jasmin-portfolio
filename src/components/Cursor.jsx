import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../hooks/useInView.js'

// Dot + trailing ring. Never mounts on touch devices or with reduced motion,
// so the native cursor stays untouched there.
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine || prefersReducedMotion()) return undefined

    const root = document.documentElement
    root.classList.add('has-cursor')

    let x = 0
    let y = 0
    let rx = 0
    let ry = 0
    let raf = 0
    let seen = false

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      if (!seen) {
        seen = true
        rx = x
        ry = y
        dot.current.classList.add('is-visible')
        ring.current.classList.add('is-visible')
      }
      dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      const target = e.target instanceof Element ? e.target : null
      const field = target?.closest('input, textarea')
      const interactive = target?.closest('a, button, [data-cursor], label, summary')
      ring.current.classList.toggle('is-active', Boolean(interactive) && !field)
      dot.current.classList.toggle('is-hidden', Boolean(field))
      ring.current.classList.toggle('is-hidden', Boolean(field))
    }
    const onLeave = () => {
      dot.current?.classList.remove('is-visible')
      ring.current?.classList.remove('is-visible')
      seen = false
    }
    const loop = () => {
      rx += (x - rx) * 0.18
      ry += (y - ry) * 0.18
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      root.classList.remove('has-cursor')
    }
  }, [])

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
