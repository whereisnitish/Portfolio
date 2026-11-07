import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'
import { playSound } from '../../lib/sound'

/** A rubber stamp that lands with a thud when it scrolls into view. */
export default function Stamp({ children, rotate = -5, delay = 0.15, className = '' }) {
  const reduceMotion = usePrefersReducedMotion()

  return (
    <motion.span
      className={['stamp', className].join(' ')}
      initial={reduceMotion ? false : { opacity: 0, scale: 1.9, rotate: rotate - 7 }}
      animate={reduceMotion ? { rotate } : undefined}
      whileInView={{ opacity: 0.88, scale: 1, rotate }}
      viewport={{ once: true, amount: 0.8 }}
      onViewportEnter={() => playSound('stamp')}
      transition={{ duration: 0.22, delay, ease: [0.3, 0, 0.2, 1] }}
    >
      {children}
    </motion.span>
  )
}
