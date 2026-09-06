import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

/**
 * Scroll reveal. A short fade with a small rise — the only entrance motion in
 * the design, so timing stays consistent and nothing slides or scales.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  duration = 0.5,
  amount = 0.2,
  className = '',
  ...rest
}) {
  const reduceMotion = usePrefersReducedMotion()
  const MotionTag = motion[Tag] ?? motion.div

  if (reduceMotion) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
