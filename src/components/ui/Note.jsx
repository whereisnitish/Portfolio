import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

/** A handwritten remark in the margin, written slightly off-level. */
export default function Note({ children, rotate = -2, delay = 0.25, className = '' }) {
  const reduceMotion = usePrefersReducedMotion()

  return (
    <motion.p
      className={['hand', className].join(' ')}
      style={{ rotate }}
      initial={reduceMotion ? false : { opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.p>
  )
}
