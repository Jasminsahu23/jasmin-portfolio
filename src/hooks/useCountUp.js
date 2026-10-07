import { useEffect, useState } from 'react'
import { prefersReducedMotion } from './useInView'

export function useCountUp(target, active, { duration = 1400, from = 0 } = {}) {
  const [value, setValue] = useState(prefersReducedMotion() ? target : from)

  useEffect(() => {
    if (!active) return undefined
    if (prefersReducedMotion()) {
      setValue(target)
      return undefined
    }
    let raf = 0
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 4)
      setValue(from + (target - from) * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, duration, from])

  return value
}
