/**
 * Section shell: scroll anchor, vertical rhythm, container.
 *
 * Sections are separated by a hairline rather than a change of background —
 * the page is one continuous surface.
 *
 * Spacing is a `padding` prop rather than part of `className`, because two
 * competing `py-*` utilities resolve by stylesheet order, not prop order.
 */
const DEFAULT_PADDING = 'py-24 sm:py-28 lg:py-32'

export default function Section({
  id,
  children,
  padding = DEFAULT_PADDING,
  divider = true,
  className = '',
  containerClassName = '',
  as: Tag = 'section',
  ...rest
}) {
  return (
    <Tag
      id={id}
      className={['relative', divider ? 'border-t border-line' : '', padding, className].join(' ')}
      {...rest}
    >
      <div className={['shell', containerClassName].join(' ')}>{children}</div>
    </Tag>
  )
}
