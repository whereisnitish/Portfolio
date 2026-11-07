import Section from './ui/Section'
import SectionHeading, { SectionBody } from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import { beyondCode, education } from '../data/profile'

/**
 * Education and interests share one section: both are short, and giving each a
 * full section of its own would pad the page rather than structure it.
 */
export default function Education() {
  return (
    <Section id="education">
      <SectionHeading stage="education" title="Long-term memory." />

      <SectionBody className="mt-14">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h3 className="label border-t border-line pt-4">Education</h3>

            <p className="mt-6 text-lg font-medium leading-snug text-ink-strong">
              {education.degree}
            </p>
            <p className="mt-2 text-[0.95rem] text-ink-body">{education.specialization}</p>

            <dl className="mt-7 space-y-3">
              {[
                ['Institution', education.institution],
                ['Period', education.period],
                ['Result', education.score],
              ].map(([term, value]) => (
                <div key={term} className="flex gap-6 text-[0.88rem]">
                  <dt className="w-24 shrink-0 text-ink-faint">{term}</dt>
                  <dd className="text-ink-body">{value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-7 max-w-measure text-[0.85rem] leading-relaxed text-ink-muted">
              Coursework across machine learning, deep learning, NLP and distributed systems —
              the foundation the production work is built on.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h3 className="label border-t border-line pt-4">Beyond the terminal</h3>

            <dl className="mt-6 divide-y divide-line">
              {beyondCode.map((interest) => (
                <div key={interest.title} className="py-4 first:pt-0">
                  <dt className="text-[0.95rem] font-medium text-ink-strong">{interest.title}</dt>
                  <dd className="mt-1.5 max-w-measure text-[0.85rem] leading-relaxed text-ink-muted">
                    {interest.body}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </SectionBody>
    </Section>
  )
}
