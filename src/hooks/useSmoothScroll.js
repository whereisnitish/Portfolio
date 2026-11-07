import { useEffect } from 'react'
import Lenis from 'lenis'
import { usePrefersReducedMotion } from './useMediaQuery'

let instance = null

/** The running Lenis instance, or null when smooth scrolling is off. */
export function getLenis() {
  return instance
}

/** Smooth scrolling and anchor links, skipped for reduced-motion visitors. */
export function useSmoothScroll() {
  const reduceMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reduceMotion) return undefined

    const lenis = new Lenis({ autoRaf: true, lerp: 0.12, anchors: true })
    instance = lenis

    return () => {
      lenis.destroy()
      instance = null
    }
  }, [reduceMotion])
}
