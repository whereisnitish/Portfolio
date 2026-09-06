import { useEffect, useState } from 'react'

/** Subscribes to a CSS media query. SSR-safe: returns false before mount. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const list = window.matchMedia(query)
    const onChange = (event) => setMatches(event.matches)

    setMatches(list.matches)
    list.addEventListener('change', onChange)
    return () => list.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** True when the visitor has asked the OS to minimise animation. */
export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

/** True on pointer-precise devices — used to gate desktop-only flourishes. */
export function useHasFinePointer() {
  return useMediaQuery('(hover: hover) and (pointer: fine)')
}
