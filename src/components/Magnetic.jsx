import { useRef } from 'react'
import { prefersReducedMotion } from '../hooks/useInView.js'

// Nudges its child toward the pointer. Only active for fine pointers.
export default function Magnetic({ children, strength = 0.28, className = '' }) {
  const ref = useRef(null)

  const enabled = () =>
    !prefersReducedMotion() && window.matchMedia('(hover: hover) and (pointer: fine)').matches

  const onMove = (e) => {
    if (!enabled()) return
    const el = ref.current
    const r = el.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`
  }
  const reset = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <span
      ref={ref}
      className={`magnetic${className ? ` ${className}` : ''}`}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onBlur={reset}
    >
      {children}
    </span>
  )
}
