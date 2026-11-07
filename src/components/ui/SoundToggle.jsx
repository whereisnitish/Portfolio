import { useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { isSoundEnabled, playSound, setSoundEnabled } from '../../lib/sound'

/** Sound effects stay off until the visitor asks for them. */
export default function SoundToggle({ className = '' }) {
  const [on, setOn] = useState(isSoundEnabled)
  const Icon = on ? Volume2 : VolumeX

  const toggle = () => {
    const next = !on
    setSoundEnabled(next)
    setOn(next)
    if (next) playSound('click')
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label="Sound effects"
      title={on ? 'Turn sound effects off' : 'Turn sound effects on'}
      className={[
        'grid h-9 w-9 place-items-center rounded-md text-ink-muted transition-colors hover:text-ink-strong',
        className,
      ].join(' ')}
    >
      <Icon className="h-[17px] w-[17px]" strokeWidth={1.6} />
    </button>
  )
}
