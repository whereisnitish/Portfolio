import Reveal from './Reveal'

/**
 * Editorial section head: a numbered mono label in a narrow left column, the
 * title and lede in the main column. Every section uses this, which is what
 * gives the page its rhythm now that there are no bands or cards.
 *
 * On large screens the label sticks while its section scrolls past.
 */
export default function SectionHeading({ index, label, title, lede, className = '' }) {
  return (
    <div
      className={[
        'grid gap-6 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-14',
        className,
      ].join(' ')}
    >
      <Reveal>
        <p className="label lg:sticky lg:top-28">
          {index && <span className="text-ink-muted">{index}</span>}
          {index && label && <span className="mx-2 opacity-40">/</span>}
          {label}
        </p>
      </Reveal>

      <div>
        <Reveal delay={0.05}>
          <h2 className="max-w-2xl text-[1.75rem] font-semibold leading-[1.2] tracking-[-0.02em] sm:text-4xl">
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
