import Section from './ui/Section'
import SectionHeading, { SectionBody } from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import { experience } from '../data/experience'

export default function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        index="05"
        label="Experience"
        title="Where the systems got built"
        lede="Three years owning delivery end to end — architecture, implementation, client conversations, and the parts that only surface after launch."
      />

      <SectionBody className="mt-14">
        {experience.map((role) => (
          <article key={role.id} className="border-t border-line pt-8">
            <Reveal>
              <header className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                <div>
                  <h3 className="text-xl font-medium tracking-[-0.01em] text-ink-strong">
                    {role.role}
                  </h3>
                  <p className="mt-1.5 text-[0.95rem] text-ink-body">{role.company}</p>
                </div>

                <p className="label flex items-center gap-2.5">
                  {role.current && (
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                  )}
                  {role.period}
                </p>
              </header>

              <p className="mt-5 max-w-measure leading-relaxed text-ink-muted">{role.summary}</p>
            </Reveal>

            <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-3">
              {role.groups.map((group, groupIndex) => (
                <Reveal key={group.title} delay={groupIndex * 0.06}>
                  <h4 className="label border-t border-line pt-4">{group.title}</h4>
                  <ul className="mt-4 space-y-2.5">
                    {group.points.map((point) => (
                      <li
                        key={point}
                        className="text-[0.86rem] leading-relaxed text-ink-muted"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </article>
        ))}
      </SectionBody>
    </Section>
  )
}
