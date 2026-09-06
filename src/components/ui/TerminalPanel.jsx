import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

const DEFAULT_LINES = [
  { kind: 'cmd', text: 'boot --profile senior-python-dev' },
  { kind: 'out', text: 'initializing AI agent' },
  { kind: 'out', text: 'connecting tools' },
  { kind: 'out', text: 'optimizing backend' },
  { kind: 'out', text: 'deploying to production' },
  { kind: 'sys', text: 'ready — 7 services healthy' },
]

const TYPE_MS = 24
const LINE_PAUSE_MS = 300

/**
 * Terminal transcript that types itself once scrolled into view.
 *
 * Uses the page's own ink scale rather than simulated terminal chrome — it
 * reads as a quiet monospaced block in both themes.
 */
export default function TerminalPanel({ lines = DEFAULT_LINES, className = '' }) {
  const hostRef = useRef(null)
  const inView = useInView(hostRef, { once: true, amount: 0.4 })
  const reduceMotion = usePrefersReducedMotion()

  // `typed` holds finished lines; `partial` is the line mid-typing.
  const [typed, setTyped] = useState([])
  const [partial, setPartial] = useState('')
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    if (!inView) return

    if (reduceMotion) {
      setTyped(lines)
      setPartial('')
      setComplete(true)
      return
    }

    let cancelled = false
    let timer

    const typeLine = (lineIndex, charIndex) => {
      if (cancelled) return

      if (lineIndex >= lines.length) {
        setComplete(true)
        return
      }

      const line = lines[lineIndex]

      if (charIndex > line.text.length) {
        setTyped((prev) => [...prev, line])
        setPartial('')
        timer = setTimeout(() => typeLine(lineIndex + 1, 0), LINE_PAUSE_MS)
        return
      }

      setPartial(line.text.slice(0, charIndex))
      timer = setTimeout(() => typeLine(lineIndex, charIndex + 1), TYPE_MS)
    }

    typeLine(0, 0)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [inView, lines, reduceMotion])

  const activeLine = typed.length < lines.length ? lines[typed.length] : null

  return (
    <div ref={hostRef} className={['border-y border-line py-4', className].join(' ')}>
      <p className="label mb-3">system.log</p>

      <div
        className="min-h-[132px] font-mono text-[0.72rem] leading-[1.9]"
        role="status"
        aria-live="polite"
      >
        {typed.map((line, index) => (
          <TerminalLine key={index} line={line} />
        ))}

        {activeLine && <TerminalLine line={{ ...activeLine, text: partial }} caret={!complete} />}

        {complete && (
          <div className="text-ink-faint">
            <span className="text-accent">$</span> <Caret />
          </div>
        )}
      </div>
    </div>
  )
}

function TerminalLine({ line, caret = false }) {
  if (line.kind === 'cmd') {
    return (
      <div className="text-ink-strong">
        <span className="text-accent">$</span> {line.text}
        {caret && <Caret />}
      </div>
    )
  }

  if (line.kind === 'sys') {
    return (
      <div className="mt-1 text-ink-body">
        <span className="text-ink-faint">→</span> {line.text}
        {caret && <Caret />}
      </div>
    )
  }

  return (
    <div className="text-ink-muted">
      <span className="text-ink-faint">·</span> {line.text}
      {caret && <Caret />}
    </div>
  )
}

function Caret() {
  return (
    <span className="ml-0.5 inline-block h-[0.95em] w-[6px] translate-y-[2px] animate-caret bg-accent" />
  )
}
