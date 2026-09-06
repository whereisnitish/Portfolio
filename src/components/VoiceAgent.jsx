import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { Loader2, Phone, PhoneOff } from 'lucide-react'
import { voiceAgent, voiceAgentEnabled } from '../data/voiceAgent'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'

/**
 * Floating "talk to my agent" control, bottom-right.
 *
 * The Vapi SDK pulls in a WebRTC stack (~5MB unpacked), so it is imported
 * dynamically on the first click rather than shipped in the main bundle — the
 * page costs nothing until someone actually wants to talk.
 *
 * Sits at z-20: above page content, below the navbar (z-40) and the mobile
 * menu sheet (z-30), so an open menu covers it without the two components
 * needing to know about each other.
 */
const ERROR_RESET_MS = 5000

export default function VoiceAgent() {
  // idle → connecting → active, plus a transient error state.
  const [status, setStatus] = useState('idle')
  const [seconds, setSeconds] = useState(0)
  const reduceMotion = usePrefersReducedMotion()

  const vapiRef = useRef(null)
  const levelRef = useRef(null)

  // Tear the call down if the component unmounts mid-conversation.
  useEffect(() => {
    return () => {
      const vapi = vapiRef.current
      if (!vapi) return
      try {
        vapi.removeAllListeners()
        vapi.stop()
      } catch {
        // Already torn down — nothing to clean up.
      }
    }
  }, [])

  // Call timer.
  useEffect(() => {
    if (status !== 'active') {
      setSeconds(0)
      return
    }
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(timer)
  }, [status])

  // Clear a failure back to idle so the button never gets stuck.
  useEffect(() => {
    if (status !== 'error') return
    const timer = setTimeout(() => setStatus('idle'), ERROR_RESET_MS)
    return () => clearTimeout(timer)
  }, [status])

  /** Loads the SDK once and wires up its events. */
  const getClient = useCallback(async () => {
    if (vapiRef.current) return vapiRef.current

    const { default: Vapi } = await import('@vapi-ai/web')
    const vapi = new Vapi(voiceAgent.publicKey)

    vapi.on('call-start', () => setStatus('active'))
    vapi.on('call-end', () => setStatus('idle'))
    vapi.on('error', () => setStatus('error'))

    // Volume arrives many times a second. Write it straight to the DOM so it
    // never triggers a React render.
    vapi.on('volume-level', (volume) => {
      const node = levelRef.current
      if (node) node.style.setProperty('--level', String(Math.min(1, volume ?? 0)))
    })

    vapiRef.current = vapi
    return vapi
  }, [])

  const handleClick = useCallback(async () => {
    if (status === 'connecting') return

    if (status === 'active') {
      try {
        await vapiRef.current?.stop()
      } catch {
        // stop() can reject if the call already ended; the event resets us.
      }
      setStatus('idle')
      return
    }

    setStatus('connecting')
    try {
      const vapi = await getClient()
      await vapi.start(voiceAgent.assistantId)
      // 'call-start' flips to active; if it never fires the error event will.
    } catch {
      // Most often a denied microphone permission.
      setStatus('error')
    }
  }, [status, getClient])

  if (!voiceAgentEnabled) return null

  const { copy } = voiceAgent
  const isActive = status === 'active'
  const isConnecting = status === 'connecting'
  const isError = status === 'error'

  const label = isActive
    ? copy.active
    : isConnecting
      ? copy.connecting
      : isError
        ? copy.error
        : copy.idle

  const hint = isActive
    ? formatDuration(seconds)
    : isConnecting
      ? copy.connectingHint
      : isError
        ? copy.errorHint
        : copy.idleHint

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-20 sm:bottom-7 sm:right-7">
      <button
        type="button"
        onClick={handleClick}
        disabled={isConnecting}
        aria-label={
          isActive ? 'End the call with the voice agent' : 'Start a call with the voice agent'
        }
        className={[
          'pointer-events-auto group flex items-center gap-3 rounded-full border bg-canvas py-2.5 pl-3 pr-4 text-left transition-colors',
          isActive
            ? 'border-accent'
            : isError
              ? 'border-line-strong'
              : 'border-line-strong hover:border-accent',
        ].join(' ')}
      >
        <span
          className={[
            'grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors',
            isActive
              ? 'bg-accent text-on-accent'
              : 'bg-canvas text-ink-strong group-hover:text-accent',
          ].join(' ')}
        >
          {isConnecting ? (
            <Loader2
              className={['h-4 w-4', reduceMotion ? '' : 'animate-spin'].join(' ')}
              strokeWidth={1.7}
            />
          ) : isActive ? (
            <PhoneOff className="h-4 w-4" strokeWidth={1.7} />
          ) : (
            <Phone className="h-4 w-4" strokeWidth={1.7} />
          )}
        </span>

        <span className="min-w-0">
          <span
            className={[
              'block text-[0.82rem] font-medium leading-tight transition-colors',
              isActive ? 'text-accent' : 'text-ink-strong',
            ].join(' ')}
          >
            {label}
          </span>
          <span className="mt-0.5 flex items-center gap-1.5 font-mono text-[0.62rem] leading-tight text-ink-faint">
            {isActive && <LevelMeter ref={levelRef} reduceMotion={reduceMotion} />}
            {hint}
          </span>
        </span>
      </button>

      {/* Status changes are announced without moving focus. */}
      <p aria-live="polite" className="sr-only">
        {isActive
          ? 'Call connected'
          : isConnecting
            ? 'Connecting to the voice agent'
            : isError
              ? copy.errorHint
              : ''}
      </p>
    </div>
  )
}

/**
 * Three bars driven by the `--level` custom property the volume listener sets.
 * Purely visual, so it is hidden from assistive tech.
 *
 * forwardRef because this project is on React 18, where `ref` is not delivered
 * as an ordinary prop.
 */
const LevelMeter = forwardRef(function LevelMeter({ reduceMotion }, ref) {
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="flex h-2.5 items-end gap-[2px]"
      style={{ '--level': '0' }}
    >
      {[0.6, 1, 0.75].map((scale, index) => (
        <span
          key={index}
          className="w-[2px] rounded-full bg-accent"
          style={{
            height: reduceMotion
              ? '60%'
              : `calc((25% + (var(--level) * 75%)) * ${scale})`,
            transition: reduceMotion ? undefined : 'height 90ms linear',
          }}
        />
      ))}
    </span>
  )
})

function formatDuration(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  return `${minutes}:${String(secs).padStart(2, '0')}`
}
