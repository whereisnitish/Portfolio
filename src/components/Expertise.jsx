import Section from './ui/Section'
import SectionHeading, { SectionBody } from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import { skillCategories } from '../data/skills'

const totalTechnologies = skillCategories.reduce((sum, c) => sum + c.items.length, 0)

/**
 * Technologies as the agent's tool registry: the category sits in a fixed left
 * column, its tools wrap in the right.
 */
export default function Expertise() {
  return (
    <Section id="expertise">
      <SectionHeading
        stage="expertise"
        title="The tools I actually reach for."
        lede={`${totalTechnologies} tools across ${skillCategories.length} layers of the stack. A working kit, not a checklist.`}
      />

      <SectionBody className="mt-14">
        <dl className="border-t border-line">
          {skillCategories.map((category, index) => (
            <Reveal
              key={category.id}
              delay={index * 0.04}
              className="grid gap-x-10 gap-y-4 border-b border-line py-7 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]"
            >
              <div>
                <dt className="text-[0.95rem] font-medium text-ink-strong">{category.title}</dt>
                <p className="mt-1.5 max-w-[32ch] text-[0.83rem] leading-relaxed text-ink-muted">
                  {category.summary}
                </p>
              </div>

              <dd className="flex flex-wrap items-start gap-1.5">
                {category.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </dd>
            </Reveal>
          ))}
        </dl>
      </SectionBody>
    </Section>
  )
}
