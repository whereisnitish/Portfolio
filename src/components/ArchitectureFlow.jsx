import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'

const STEP_MS = 1200

/**
 * Request flow as a numbered sequence on a single rule. The accent marks the
 * stage currently executing; everything else is neutral.
 */
export default function ArchitectureFlow({ steps, title = 'Request flow' }) {
  const hostRef = useRef(null)
  const inView = useInView(hostRef, { amount: 0.3 })
  const reduceMotion = usePrefersReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!inView || reduceMotion) return
    const timer = setInterval(() => setActive((i) => (i + 1) % steps.length), STEP_MS)
    return () => clearInterval(timer)
  }, [inView, reduceMotion, steps.length])

  return (
    <div ref={hostRef}>
      <p className="label mb-5">{title}</p>

      <ol className="relative border-l border-line pl-6">
        {steps.map((step, index) => {
          const isActive = !reduceMotion && index === active

          return (
            <li key={step.label} className="relative pb-5 last:pb-0">
              {/* Marker sits on the rule */}
              <span
                className={[
                  'absolute -left-[25px] top-[5px] h-[7px] w-[7px] rounded-full border transition-colors duration-300',
                  isActive
                    ? 'border-accent bg-accent'
                    : 'border-line-strong bg-canvas',
                ].join(' ')}
              />

              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[0.62rem] text-ink-faint">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  className={[
                    'text-[0.85rem] leading-tight transition-colors duration-300',
                    isActive ? 'text-accent' : 'text-ink-strong',
                  ].join(' ')}
                >
                  {step.label}
                </span>
              </div>
              {step.note && (
                <p className="ml-[2.1rem] mt-1 font-mono text-[0.65rem] text-ink-faint">
                  {step.note}
                </p>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
