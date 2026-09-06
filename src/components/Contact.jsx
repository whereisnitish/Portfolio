import { ArrowUpRight } from 'lucide-react'
import Section from './ui/Section'
import SectionHeading, { SectionBody } from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import { profile } from '../data/profile'

/** Strips the protocol so a URL reads as a label rather than a link string. */
const display = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

const CHANNELS = [
  { id: 'email', label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  {
    id: 'github',
    label: 'GitHub',
    value: display(profile.github),
    href: profile.github,
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: display(profile.linkedin),
    href: profile.linkedin,
    external: true,
  },
  { id: 'phone', label: 'Phone', value: profile.phone, href: `tel:${profile.phoneHref}` },
]

export default function Contact() {
  return (
    <Section id="contact">
      <SectionHeading
        index="08"
        label="Contact"
        title="Let's build something intelligent"
        lede="Whether it's an AI agent, a scalable backend system, an LLM-powered application or an automation workflow — I'm interested in solving meaningful technical problems."
      />

      <SectionBody className="mt-14">
        <Reveal>
          <a href={`mailto:${profile.email}`} className="btn-primary">
            Email me
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>

        {/* Channels as a plain index, one per row. */}
        <dl className="mt-14 border-t border-line">
          {CHANNELS.map((channel, index) => (
            <Reveal key={channel.id} delay={index * 0.04}>
              <a
                href={channel.href}
                {...(channel.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                className="group grid grid-cols-[5.5rem_minmax(0,1fr)_auto] items-baseline gap-4 border-b border-line py-4"
              >
                <dt className="label">{channel.label}</dt>
                <dd className="truncate text-[0.95rem] text-ink-strong transition-colors group-hover:text-accent">
                  {channel.value}
                </dd>
                <ArrowUpRight className="h-3.5 w-3.5 self-center text-ink-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={0.1}>
          <p className="mt-8 label">{profile.location}</p>
        </Reveal>
      </SectionBody>
    </Section>
  )
}
