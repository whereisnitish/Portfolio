import { motion } from 'framer-motion'
import { runStageIds, runStages } from '../data/run'
import { useActiveSection } from '../hooks/useActiveSection'

const STEP_REM = 2.25

/**
 * The run's trace, pinned to the left edge on wide screens: every stage is a
 * node, and a token moves down the line as the reader scrolls. Narrower screens
 * get the progress bar in the navbar instead.
 */
export default function RunSpine() {
  const active = useActiveSection(runStageIds, 200)
  const activeIndex = Math.max(0, runStageIds.indexOf(active))

  return (
    <nav
      aria-label="Agent run stages"
      className="fixed left-5 top-1/2 z-10 hidden -translate-y-1/2 xl:block"
    >
      <div className="relative" style={{ height: `${(runStages.length - 1) * STEP_REM}rem` }}>
        <span aria-hidden="true" className="absolute inset-y-0 left-[3.5px] w-px bg-ink-faint/40" />
        <motion.span
          aria-hidden="true"
          className="absolute left-[3.5px] top-0 w-px bg-accent"
          animate={{ height: `${activeIndex * STEP_REM}rem` }}
          transition={{ type: 'spring', stiffness: 170, damping: 26 }}
        />
        <motion.span
          aria-hidden="true"
          className="absolute -left-[3px] -top-[6px] z-10 h-[20px] w-[20px] rounded-full border-2 border-accent bg-canvas"
          animate={{ y: `${activeIndex * STEP_REM}rem` }}
          transition={{ type: 'spring', stiffness: 170, damping: 22 }}
        />

        <ol>
          {runStages.map((stage, index) => {
            const isActive = index === activeIndex
            const isDone = index < activeIndex

            return (
              <li
                key={stage.id}
                className="absolute left-0 -translate-y-[1px]"
                style={{ top: `${index * STEP_REM}rem` }}
              >
                <a
                  href={`#${stage.id}`}
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={`Step ${stage.step}: ${stage.name}`}
                  className="group flex items-center gap-3.5"
                >
                  <span
                    aria-hidden="true"
                    className={[
                      'relative z-[11] h-2 w-2 rounded-full',
                      isActive || isDone ? 'bg-accent' : 'bg-ink-faint/60',
                    ].join(' ')}
                  />
                  <span
                    className={[
                      'whitespace-nowrap font-mono text-[0.65rem] transition-opacity duration-200',
                      isActive
                        ? 'text-accent opacity-100'
                        : 'text-ink-faint opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100',
                    ].join(' ')}
                  >
                    {stage.name}
                  </span>
                </a>
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
