import Section from './ui/Section'
import SectionHeading, { SectionBody } from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import TerminalPanel from './ui/TerminalPanel'
import { aboutParagraphs, capabilities, developerProfile } from '../data/profile'

export default function About() {
  return (
    <Section id="about" divider={false}>
      <SectionHeading
        index="01"
        label="Profile"
        title="Engineering intelligent systems that solve real problems"
      />

      <SectionBody className="mt-14">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <div>
            <div className="max-w-measure space-y-5">
              {aboutParagraphs.map((paragraph, index) => (
                <Reveal key={index} delay={0.04 * index}>
                  <p className="leading-[1.75] text-ink-body">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1} className="mt-12">
              <p className="label">What I build</p>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2.5">
                {capabilities.map((capability) => (
                  <li key={capability} className="text-[0.9rem] text-ink-muted">
                    {capability}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Facts as a definition list on hairlines — no card. */}
          <div>
            <Reveal>
              <dl className="divide-y divide-line border-y border-line">
                {developerProfile.map((entry) => (
                  <div key={entry.label} className="py-4">
                    <dt className="label">{entry.label}</dt>
                    <dd className="mt-2 text-[0.95rem] font-medium leading-snug text-ink-strong">
                      {entry.value}
                    </dd>
                    <dd className="mt-1 text-[0.82rem] leading-relaxed text-ink-muted">
                      {entry.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.08} className="mt-8">
              <TerminalPanel />
            </Reveal>
          </div>
        </div>
      </SectionBody>
    </Section>
  )
}
