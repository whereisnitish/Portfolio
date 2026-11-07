import { Cpu, PencilLine } from 'lucide-react'
import { WORLD_NAMES, useTheme } from '../../hooks/useTheme'

/** The physical-feeling switch between the Notebook and the GPU Room. */
export default function WorldSwitch({ className = '' }) {
  const { isDark, toggleTheme } = useTheme()
  const target = WORLD_NAMES[isDark ? 'light' : 'dark']

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to the ${target}`}
      title={`Switch to the ${target}`}
      className={[
        'sketch relative grid h-9 w-[4.5rem] grid-cols-2 place-items-center text-ink-faint transition-colors hover:text-ink-strong',
        className,
      ].join(' ')}
    >
      <span
        aria-hidden="true"
        className={[
          'absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] bg-accent transition-transform duration-300 ease-out',
          isDark ? 'translate-x-full' : '',
        ].join(' ')}
        style={{ borderRadius: 'var(--sketch-radius)' }}
      />
      <PencilLine
        className={['relative h-4 w-4', isDark ? '' : 'text-on-accent'].join(' ')}
        strokeWidth={1.8}
        aria-hidden="true"
      />
      <Cpu
        className={['relative h-4 w-4', isDark ? 'text-on-accent' : ''].join(' ')}
        strokeWidth={1.8}
        aria-hidden="true"
      />
    </button>
  )
}
