import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './useMediaQuery'

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

/**
 * Animates 0 → `target` once `active` flips true. Reduced-motion visitors get
 * the final value immediately rather than a frozen zero.
 */
export function useCountUp(target, active, { duration = 1600, delay = 0 } = {}) {
  const reduceMotion = usePrefersReducedMotion()
  const [value, setValue] = useState(0)
  const doneRef = useRef(false)

  useEffect(() => {
    if (!active || doneRef.current) return
    doneRef.current = true

    if (reduceMotion) {
      setValue(target)
      return
    }

    let frame = null
    let start = null

    const tick = (now) => {
      if (start === null) start = now
      const elapsed = now - start - delay

      if (elapsed < 0) {
        frame = requestAnimationFrame(tick)
        return
      }

      const progress = Math.min(elapsed / duration, 1)
      setValue(Math.round(easeOutExpo(progress) * target))

      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => frame && cancelAnimationFrame(frame)
  }, [active, target, duration, delay, reduceMotion])

  return value
}
