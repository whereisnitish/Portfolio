import Section from './ui/Section'
import SectionHeading, { SectionBody } from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import { workflowStages } from '../data/workflow'

/**
 * The build process as a numbered sequence. Stages sit on hairlines in a
 * three-column grid; the number carries the ordering, so no connectors,
 * arrows or icons are needed.
 */
export default function SystemWorkflow() {
  return (
    <Section id="process">
      <SectionHeading
        index="06"
        label="Process"
        title="From idea to production"
        lede="The same pipeline runs on every engagement. It is what keeps delivery predictable when the requirements are not."
      />

      <SectionBody className="mt-14">
        <ol className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {workflowStages.map((stage, index) => (
            <Reveal
              key={stage.step}
              as="li"
              delay={(index % 3) * 0.05}
              className="group border-b border-line py-7 sm:px-6 sm:odd:pl-0 lg:px-8 lg:[&:nth-child(3n+1)]:pl-0"
            >
              <span className="font-mono text-[0.7rem] text-ink-faint transition-colors group-hover:text-accent">
                {stage.step}
              </span>
              <h3 className="mt-3 text-[0.95rem] font-medium leading-snug text-ink-strong">
                {stage.title}
              </h3>
              <p className="mt-2 max-w-[38ch] text-[0.85rem] leading-relaxed text-ink-muted">
                {stage.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </SectionBody>
    </Section>
  )
}
