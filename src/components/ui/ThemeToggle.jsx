import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

/** Light/dark switch. No chrome — just the icon and a hover colour change. */
export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme()
  const Icon = isDark ? Sun : Moon

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={[
        'grid h-9 w-9 place-items-center rounded-md text-ink-muted transition-colors hover:text-ink-strong',
        className,
      ].join(' ')}
    >
      <Icon className="h-[17px] w-[17px]" strokeWidth={1.6} />
    </button>
  )
}
