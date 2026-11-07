import Section from './ui/Section'
import SectionHeading, { SectionBody } from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import Note from './ui/Note'
import { aboutParagraphs, capabilities, developerProfile } from '../data/profile'

export default function About() {
  return (
    <Section id="about">
      <SectionHeading stage="about" title="First, some context." />

      <SectionBody className="mt-14">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-14">
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
              <ul className="mt-5 flex flex-wrap gap-2">
                {capabilities.map((capability) => (
                  <li key={capability} className="chip text-[0.74rem]">
                    {capability}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* The quick facts, as a sheet taped into the notebook. */}
          <Reveal>
            <div className="sheet rotate-[1.2deg] px-6 pb-3 pt-7">
              <dl className="divide-y divide-line">
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
            </div>
            <Note rotate={-2} className="mt-5 text-center">
              the short version, if you&apos;re in a hurry
            </Note>
          </Reveal>
        </div>
      </SectionBody>
    </Section>
  )
}
