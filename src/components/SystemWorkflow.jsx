import Section from './ui/Section'
import SectionHeading, { SectionBody } from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import Scribble from './ui/Scribble'
import { workflowStages } from '../data/workflow'
import { playSound } from '../lib/sound'

/**
 * The build process as the agent's plan: a checklist that gets ticked off in
 * pencil as the reader scrolls down it.
 */
export default function SystemWorkflow() {
  return (
    <Section id="process">
      <SectionHeading
        stage="process"
        title="Plan first. Then build."
        lede="The same plan runs on every engagement. It is what keeps delivery predictable when the requirements are not."
        note="the boring releases are the goal"
      />

      <SectionBody className="mt-14">
        <ol className="border-t border-line">
          {workflowStages.map((stage) => (
            <Reveal
              key={stage.step}
              as="li"
              amount={0.5}
              className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-5 border-b border-line py-6 md:grid-cols-[2rem_minmax(0,17rem)_minmax(0,1fr)] md:gap-x-6"
            >
              <span className="sketch relative mt-0.5 block h-6 w-6">
                <Scribble
                  shape="check"
                  delay={0.2}
                  duration={0.35}
                  strokeWidth={3}
                  onDraw={() => playSound('tick')}
                  className="absolute -left-0.5 -top-1.5 h-8 w-8"
                />
              </span>
              <h3 className="text-[0.98rem] font-medium leading-snug text-ink-strong">
                {stage.title}
              </h3>
              <p className="col-start-2 mt-1.5 max-w-[52ch] text-[0.87rem] leading-relaxed text-ink-muted md:col-start-3 md:mt-0">
                {stage.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </SectionBody>
    </Section>
  )
}
