import Reveal from './Reveal'
import Note from './Note'
import { stageDetails } from '../../data/run'

/**
 * Head of a run stage: the step and its function call in a narrow left column,
 * the title and lede in the main column. On large screens the step label sticks
 * while its section scrolls past, like a trace following the reader.
 */
export default function SectionHeading({ stage, title, lede, note, className = '' }) {
  const details = stageDetails[stage]

  return (
    <div
      className={[
        'grid gap-6 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-14',
        className,
      ].join(' ')}
    >
      <Reveal>
        <div className="lg:sticky lg:top-28">
          <p className="label">
            <span className="text-accent">{details.step}</span>
            <span className="mx-2 opacity-50">/</span>
            {details.name}
          </p>
          <p className="mt-1.5 font-mono text-[0.7rem] text-ink-faint">{details.call}</p>
        </div>
      </Reveal>

      <div>
        <Reveal delay={0.05}>
          <h2 className="max-w-2xl text-[2.1rem] font-semibold leading-[1.1] sm:text-5xl">
            {title}
          </h2>
        </Reveal>

        {lede && (
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-measure text-[0.975rem] leading-relaxed text-ink-muted">
              {lede}
            </p>
          </Reveal>
        )}

        {note && <Note className="mt-4">{note}</Note>}
      </div>
    </div>
  )
}

/**
 * Content aligned to the same column as a SectionHeading's title, so headings
 * and the bodies beneath them share one left edge.
 */
export function SectionBody({ children, className = '' }) {
  return (
    <div className={['grid lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-14', className].join(' ')}>
      <div aria-hidden="true" className="hidden lg:block" />
      <div className="min-w-0">{children}</div>
    </div>
  )
}
