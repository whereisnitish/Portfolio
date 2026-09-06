import { useEffect, useState } from 'react'

/**
 * Scroll-spy. Returns the id of the section currently occupying the
 * reading position (just below the navbar).
 *
 * A scroll listener is used rather than IntersectionObserver because sections
 * here differ wildly in height — the observer's "most visible" heuristic makes
 * short sections un-selectable, while a fixed probe line does not.
 *
 * Positions come from getBoundingClientRect, not offsetTop: sections are
 * nested inside positioned band wrappers, so offsetTop is measured against the
 * band rather than the document and would report near-zero for every section.
 */
export function useActiveSection(sectionIds, offset = 120) {
  const [active, setActive] = useState(sectionIds[0])

  useEffect(() => {
    let frame = null

    const measure = () => {
      frame = null
      const scrollY = window.scrollY
      const probe = scrollY + offset
      let current = sectionIds[0]

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top + scrollY
        if (top <= probe) current = id
      }

      // Pin the last section once the page is scrolled to the bottom, otherwise
      // a short final section can never win the probe test.
      const atBottom =
        window.innerHeight + scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom) current = sectionIds[sectionIds.length - 1]

      setActive((prev) => (prev === current ? prev : current))
    }

    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sectionIds, offset])

  return active
}
