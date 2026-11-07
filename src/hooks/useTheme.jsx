import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { flushSync } from 'react-dom'
import { playSound } from '../lib/sound'

const STORAGE_KEY = 'nk-theme'
const ThemeContext = createContext(null)

/** Ground colour per world, mirrored into <meta name="theme-color">. */
const THEME_COLOR = { light: '#F5EFE1', dark: '#0A0D0B' }

/** The two worlds a visitor can switch between. */
export const WORLD_NAMES = { light: 'Notebook', dark: 'GPU Room' }

const WIPE_MS = 750

/**
 * Reads the theme the inline boot script already resolved (see index.html), so
 * React's first render agrees with the class that is on <html> right now.
 *
 * The Notebook is the default: the OS preference is deliberately not consulted,
 * and the GPU Room applies only when the visitor has chosen it.
 */
function readInitialTheme() {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readInitialTheme)

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', THEME_COLOR[theme])

    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Private mode / blocked storage: the world still applies for this visit.
    }
  }, [theme])

  /**
   * Switches worlds with a circular wipe growing out of the control that was
   * pressed. Browsers without view transitions, and reduced-motion visitors, get
   * the same switch without the wipe.
   */
  const toggleTheme = useCallback(
    (event) => {
      const root = document.documentElement
      const next = theme === 'dark' ? 'light' : 'dark'

      const apply = () => {
        root.classList.toggle('dark', next === 'dark')
        flushSync(() => setTheme(next))
      }

      playSound('world')

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!document.startViewTransition || reduceMotion) {
        apply()
        return
      }

      const rect = event?.currentTarget?.getBoundingClientRect()
      const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
      const y = rect ? rect.top + rect.height / 2 : 0
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      )

      const transition = document.startViewTransition(apply)
      transition.ready
        .then(() => {
          root.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            {
              duration: WIPE_MS,
              easing: 'cubic-bezier(0.65, 0, 0.2, 1)',
              pseudoElement: '::view-transition-new(root)',
            },
          )
        })
        .catch(() => {
          // The transition was skipped; the switch itself has already applied.
        })
    },
    [theme],
  )

  const value = useMemo(
    () => ({ theme, isDark: theme === 'dark', toggleTheme }),
    [theme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used inside a ThemeProvider')
  return context
}
