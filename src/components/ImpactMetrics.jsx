import { useRef } from 'react'
import { useInView } from 'framer-motion'
import Section from './ui/Section'
import SectionHeading, { SectionBody } from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import { metrics } from '../data/metrics'
import { useCountUp } from '../hooks/useCountUp'

export default function ImpactMetrics() {
  const gridRef = useRef(null)
  // One shared trigger keeps every counter in step rather than firing per tile.
  const inView = useInView(gridRef, { once: true, amount: 0.2 })

  return (
    <Section id="impact">
      <SectionHeading
        index="02"
        label="Impact"
        title="Measured in production, not in demos"
        lede="Figures from shipped systems — latency budgets defended, token spend cut, release cycles shortened."
      />

      <SectionBody className="mt-14">
        <div
          ref={gridRef}
          className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-3"
        >
          {metrics.map((metric, index) => (
            <Metric key={metric.label} metric={metric} index={index} active={inView} />
          ))}
        </div>
      </SectionBody>
    </Section>
  )
}

function Metric({ metric, index, active }) {
  const value = useCountUp(metric.value, active, { delay: index * 90 })

  return (
    <Reveal
      delay={(index % 3) * 0.05}
      className="border-b border-line px-0 py-7 sm:px-6 sm:odd:pl-0 lg:px-8 lg:[&:nth-child(3n+1)]:pl-0"
    >
      <div className="flex items-baseline gap-0.5 text-ink-strong">
        <span className="text-[2.75rem] font-semibold leading-none tracking-[-0.03em] tabular-nums">
          {value}
        </span>
        <span className="text-xl font-medium text-ink-muted">{metric.suffix}</span>
      </div>

      <h3 className="mt-4 text-[0.95rem] font-medium leading-snug text-ink-strong">
        {metric.label}
      </h3>
      <p className="mt-1.5 max-w-[34ch] text-[0.83rem] leading-relaxed text-ink-muted">
        {metric.detail}
      </p>
    </Reveal>
  )
}
