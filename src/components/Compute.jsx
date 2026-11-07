import { useRef } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { Cpu, PencilLine } from 'lucide-react'
import TensorGrid from './TensorGrid'
import { computeLines } from '../data/profile'
import { stageDetails } from '../data/run'
import { WORLD_NAMES, useTheme } from '../hooks/useTheme'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'

const details = stageDetails.compute

/** Scroll progress at which each line is on screen. */
const WINDOWS = [
  [0, 0.05, 0.27, 0.33],
  [0.33, 0.39, 0.6, 0.66],
  [0.66, 0.72, 1, 1],
]

/**
 * The run's pivot: the section pins while scrolling powers up a grid of
 * processors and the copy steps through its lines. It is also the natural moment
 * to offer the switch into the GPU Room.
 */
export default function Compute() {
  const hostRef = useRef(null)
  const percentRef = useRef(null)
  const reduceMotion = usePrefersReducedMotion()
  const { isDark, toggleTheme } = useTheme()

  const { scrollYProgress } = useScroll({
    target: hostRef,
    offset: ['start start', 'end end'],
  })

  // Written straight to the DOM so scrolling never re-renders this section.
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (percentRef.current) percentRef.current.textContent = String(Math.round(value * 100))
  })

  const SwitchIcon = isDark ? PencilLine : Cpu

  return (
    <section
      id="compute"
      ref={hostRef}
      className={['relative border-t border-line', reduceMotion ? '' : 'h-[260vh]'].join(' ')}
    >
      <div
        className={[
          'flex min-h-svh items-center pb-8 pt-20 lg:py-20',
          reduceMotion ? '' : 'sticky top-0',
        ].join(' ')}
      >
        <div className="shell">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
            <div>
              <p className="label">
                <span className="text-accent">{details.step}</span>
                <span className="mx-2 opacity-50">/</span>
                {details.name}
              </p>
              <p className="mt-1.5 font-mono text-[0.7rem] text-ink-faint">{details.call}</p>

              {reduceMotion ? (
                <div className="mt-8 space-y-5">
                  {computeLines.map((line) => (
                    <h2 key={line} className="text-3xl font-semibold leading-tight sm:text-4xl">
                      {line}
                    </h2>
                  ))}
                </div>
              ) : (
                <>
                  {/* All lines stay readable to screen readers; the stack is visual. */}
                  <h2 className="sr-only">{computeLines.join(' ')}</h2>
                  <div aria-hidden="true" className="relative mt-6 h-[13rem] sm:mt-8 sm:h-[15rem]">
                    {computeLines.map((line, index) => (
                      <ComputeLine
                        key={line}
                        line={line}
                        range={WINDOWS[index]}
                        progress={scrollYProgress}
                      />
                    ))}
                  </div>
                </>
              )}

              <button type="button" onClick={toggleTheme} className="btn-secondary mt-4 sm:mt-6">
                <SwitchIcon className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                {isDark ? `Back to the ${WORLD_NAMES.light}` : `Power up the ${WORLD_NAMES.dark}`}
              </button>
            </div>

            <div>
              <TensorGrid progress={scrollYProgress} className="aspect-[4/3] max-h-[30svh] lg:max-h-none" />
              <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 font-mono text-[0.68rem] text-ink-faint">
                {!reduceMotion && (
                  <span>
                    allocating <span ref={percentRef} className="tabular-nums text-accent">0</span>%
                  </span>
                )}
                <span>illustration, not live telemetry</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ComputeLine({ line, range, progress }) {
  const opacity = useTransform(progress, range, [0, 1, 1, range[3] === 1 ? 1 : 0])
  const y = useTransform(progress, range, [22, 0, 0, range[3] === 1 ? 0 : -22])

  return (
    <motion.p
      style={{ opacity, y, fontFamily: 'var(--font-display)', letterSpacing: 'var(--display-tracking)' }}
      className="absolute inset-x-0 top-0 text-[2.1rem] font-semibold leading-[1.1] text-ink-strong sm:text-5xl"
    >
      {line}
    </motion.p>
  )
}
