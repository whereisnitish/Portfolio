import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

/** Hand-drawn strokes, each in its own coordinate space. */
const SHAPES = {
  underline: { viewBox: '0 0 300 16', d: 'M3 10 C 48 4, 96 13, 150 7 S 250 3, 297 9' },
  circle: {
    viewBox: '0 0 200 80',
    d: 'M118 7 C 62 1, 9 14, 6 40 C 3 67, 62 76, 112 73 C 162 70, 196 54, 193 34 C 190 13, 132 3, 76 9',
  },
  arrow: { viewBox: '0 0 80 60', d: 'M4 8 C 26 3, 58 12, 66 46 M52 36 L 67 49 L 76 31' },
  check: { viewBox: '0 0 24 24', d: 'M4 13 L 10 20 L 22 3' },
}

/**
 * A pencil stroke that draws itself when it scrolls into view. Decorative, so it
 * is hidden from assistive tech. `onDraw` fires as the stroke starts.
 */
export default function Scribble({
  shape = 'underline',
  delay = 0,
  duration = 0.7,
  strokeWidth = 3,
  onDraw,
  className = '',
}) {
  const reduceMotion = usePrefersReducedMotion()
  const { viewBox, d } = SHAPES[shape]

  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      className={['pointer-events-none overflow-visible text-accent', className].join(' ')}
    >
      <motion.path
        d={d}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        onViewportEnter={onDraw}
        transition={{ duration, delay, ease: 'easeInOut' }}
      />
    </svg>
  )
}
