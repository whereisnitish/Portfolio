import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import ArchitectureFlow from './ArchitectureFlow'
import Reveal from './ui/Reveal'
import Stamp from './ui/Stamp'

/**
 * A project as a full-width row on a hairline, not a card: index, title and
 * summary always visible; stack, highlights and architecture revealed on
 * demand. `featured` rows open by default.
 */
export default function ProjectCard({ project, index }) {
  const [open, setOpen] = useState(Boolean(project.featured))
  const panelId = `project-panel-${project.id}`

  return (
    <Reveal delay={index * 0.04} as="article" className="border-b border-line">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group grid w-full grid-cols-[2rem_minmax(0,1fr)_auto] items-start gap-x-5 gap-y-2 py-8 text-left"
      >
        <span className="mt-1.5 font-mono text-[0.7rem] text-ink-faint">
          {String(index + 1).padStart(2, '0')}
        </span>

        <span className="min-w-0">
          <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-display text-xl font-semibold leading-snug tracking-[-0.01em] text-ink-strong sm:text-2xl">
              {project.name}
            </span>
            <span className="label">{project.kicker}</span>
            <Stamp rotate={index % 2 ? 3 : -4}>Shipped {project.year}</Stamp>
          </span>

          <span className="mt-2.5 block max-w-measure text-[0.92rem] leading-relaxed text-ink-muted">
            {project.summary}
          </span>

          {/* Results read as inline figures rather than tiles. */}
          {project.results.length > 0 && (
            <span className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
              {project.results.map((result) => (
                <span key={result.label} className="flex items-baseline gap-2">
                  <span className="text-base font-semibold tabular-nums text-ink-strong">
                    {result.value}
                  </span>
                  <span className="text-[0.8rem] text-ink-muted">{result.label}</span>
                </span>
              ))}
            </span>
          )}
        </span>

        <span className="mt-1 flex items-center gap-2">
          <span className="hidden label group-hover:text-ink-strong sm:inline">
            {open ? 'Close' : 'Detail'}
          </span>
          <Plus
            className={[
              'h-4 w-4 text-ink-faint transition-all duration-300 group-hover:text-ink-strong',
              open ? 'rotate-45' : '',
            ].join(' ')}
            strokeWidth={1.5}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-10 pb-10 lg:grid-cols-[2rem_minmax(0,1fr)_minmax(0,18rem)] lg:gap-x-5">
              <div aria-hidden="true" className="hidden lg:block" />

              <div>
                <p className="label">Stack</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <li key={tech} className="chip">
                      {tech}
                    </li>
                  ))}
                </ul>

                <p className="label mt-8">Engineering highlights</p>
                <ul className="mt-3 max-w-measure space-y-2">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-[0.88rem] leading-relaxed text-ink-muted"
                    >
                      <span className="mt-[9px] h-px w-3 shrink-0 bg-ink-faint" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {project.architecture && (
                <div className="lg:pt-1">
                  <ArchitectureFlow steps={project.architecture} title="Request flow" />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  )
}
