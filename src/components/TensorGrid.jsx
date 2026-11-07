import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'

const COLS = 16
const ROWS = 12
const GAP = 3

/** Each cell's lighting order and shimmer, fixed so the sweep looks deliberate. */
const CELLS = Array.from({ length: COLS * ROWS }, (_, index) => {
  const col = index % COLS
  const row = Math.floor(index / COLS)
  const scatter = (Math.sin(index * 12.9898) * 43758.5453) % 1
  return {
    col,
    row,
    threshold: (col / COLS) * 0.65 + Math.abs(scatter) * 0.33,
    phase: Math.abs(scatter) * Math.PI * 2,
    speed: 1.2 + Math.abs(scatter) * 2.4,
  }
})

/**
 * A grid of processors lighting up as `progress` (a MotionValue from 0 to 1)
 * rises. It is an illustration, not telemetry, and the caption beside it says so.
 *
 * Painted on a canvas because a couple of hundred cells animating every frame
 * would be needlessly heavy as DOM nodes. The loop only runs while on screen.
 */
export default function TensorGrid({ progress, className = '' }) {
  const canvasRef = useRef(null)
  const inView = useInView(canvasRef, { amount: 0.1 })
  const { isDark } = useTheme()
  const reduceMotion = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const styles = getComputedStyle(document.documentElement)
    const accent = styles.getPropertyValue('--accent').trim().split(/\s+/).join(',')
    const ink = styles.getPropertyValue('--ink-faint').trim().split(/\s+/).join(',')

    const paint = (seconds) => {
      const ratio = window.devicePixelRatio || 1
      const { width, height } = canvas.getBoundingClientRect()
      if (canvas.width !== Math.round(width * ratio)) canvas.width = Math.round(width * ratio)
      if (canvas.height !== Math.round(height * ratio)) canvas.height = Math.round(height * ratio)

      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      ctx.clearRect(0, 0, width, height)

      const cellW = (width - GAP * (COLS - 1)) / COLS
      const cellH = (height - GAP * (ROWS - 1)) / ROWS
      const level = reduceMotion ? 1 : progress.get()

      for (const cell of CELLS) {
        const lit = level >= cell.threshold
        const shimmer = 0.55 + 0.45 * Math.sin(seconds * cell.speed + cell.phase)
        ctx.fillStyle = lit
          ? `rgba(${accent},${(0.3 + shimmer * 0.7).toFixed(3)})`
          : `rgba(${ink},0.16)`
        ctx.fillRect(cell.col * (cellW + GAP), cell.row * (cellH + GAP), cellW, cellH)
      }
    }

    if (reduceMotion || !inView) {
      paint(0)
      return undefined
    }

    let frame = requestAnimationFrame(function loop(now) {
      paint(now / 1000)
      frame = requestAnimationFrame(loop)
    })
    return () => cancelAnimationFrame(frame)
  }, [inView, isDark, progress, reduceMotion])

  return <canvas ref={canvasRef} aria-hidden="true" className={['block w-full', className].join(' ')} />
}
