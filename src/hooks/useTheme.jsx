import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'nk-theme'
const ThemeContext = createContext(null)

/** Ground colour per theme, mirrored into <meta name="theme-color">. */
const THEME_COLOR = { light: '#FFFFFF', dark: '#0C0D10' }

/**
 * Reads the theme the inline boot script already resolved (see index.html), so
 * React's first render agrees with the class that is on <html> right now.
 *
 * Light is the default: the OS preference is deliberately not consulted, and
 * dark applies only when the visitor has chosen it.
 */
function readInitialTheme() {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readInitialTheme)
  // True only while a switch is in flight, so the cross-fade in index.css never
  // applies to ordinary hover or scroll work.
  const [switching, setSwitching] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')

    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', THEME_COLOR[theme])

    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Private mode / blocked storage: the theme still applies for this visit.
    }
  }, [theme])

  useEffect(() => {
    if (!switching) return
    const root = document.documentElement
    root.classList.add('theme-switching')
    const timer = setTimeout(() => {
      root.classList.remove('theme-switching')
      setSwitching(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [switching])

  const toggleTheme = useCallback(() => {
    setSwitching(true)
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

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
