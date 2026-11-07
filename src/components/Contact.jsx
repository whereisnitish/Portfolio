import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowUpRight, CornerDownLeft, Loader2 } from 'lucide-react'
import Section from './ui/Section'
import SectionHeading, { SectionBody } from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import Note from './ui/Note'
import Stamp from './ui/Stamp'
import { contactSuggestions, profile } from '../data/profile'
import { playSound } from '../lib/sound'

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

const ENDPOINT = '/api/contact'

/**
 * The end of the run hands control back to the visitor, as a short exchange:
 * their prompt, then who to reply to, then a confirmation. Sending goes through
 * the server function in api/contact.js, which emails it to the site owner.
 *
 * step: prompt → details → sending → sent, or error (with an email fallback).
 */
export default function Contact() {
  const [step, setStep] = useState('prompt')
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('') // honeypot, never shown
  const [error, setError] = useState('')
  const [hint, setHint] = useState('')

  const nameRef = useRef(null)
  const promptRef = useRef(null)

  // Move focus to the field the conversation is asking about.
  useEffect(() => {
    if (step === 'details') nameRef.current?.focus()
  }, [step])

  const submitPrompt = (event) => {
    event.preventDefault()
    if (!message.trim()) {
      setHint('Write a line about what you want to build first.')
      promptRef.current?.focus()
      return
    }
    setHint('')
    playSound('click')
    setStep('details')
  }

  const submitDetails = async (event) => {
    event.preventDefault()
    setStep('sending')
    setError('')

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, website }),
      })
      const result = await response.json().catch(() => ({}))

      if (!response.ok || !result.ok) {
        setError(result.error ?? 'The message could not be sent.')
        setStep(response.status === 400 ? 'details' : 'error')
        return
      }

      playSound('stamp')
      setStep('sent')
    } catch {
      setError('The message could not be sent. Check your connection and try again.')
      setStep('error')
    }
  }

  const reset = () => {
    setMessage('')
    setError('')
    setStep('prompt')
  }

  const mailtoFallback = `mailto:${profile.email}?subject=${encodeURIComponent(
    'A prompt from your portfolio',
  )}&body=${encodeURIComponent(message)}`

  return (
    <Section id="contact">
      <SectionHeading
        stage="contact"
        title="Your turn. What should we build?"
        lede="Whether it's an AI agent, an LLM-powered application, a GPU-based AI workload or an automation workflow, I'm interested in solving meaningful technical problems."
      />

      <SectionBody className="mt-12">
        <Reveal>
          <div className="sheet px-5 pb-5 pt-8 sm:px-7">
            {step === 'prompt' ? (
              <form onSubmit={submitPrompt} noValidate>
                <label htmlFor="prompt" className="label block">
                  Next prompt
                </label>
                <div className="mt-3 flex gap-3 font-mono text-[0.9rem] leading-7">
                  <span aria-hidden="true" className="text-accent">
                    &gt;
                  </span>
                  <textarea
                    id="prompt"
                    ref={promptRef}
                    rows={3}
                    maxLength={5000}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Describe what you're trying to build"
                    aria-describedby={hint ? 'prompt-hint' : undefined}
                    className="min-w-0 flex-1 resize-none bg-transparent text-ink-strong outline-none placeholder:text-ink-faint"
                  />
                </div>
                {hint && (
                  <p id="prompt-hint" role="alert" className="mt-2 font-mono text-[0.75rem] text-accent">
                    {hint}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                  <ul className="flex flex-wrap gap-1.5">
                    {contactSuggestions.map((suggestion) => (
                      <li key={suggestion}>
                        <button
                          type="button"
                          onClick={() => {
                            playSound('click')
                            setHint('')
                            setMessage(suggestion)
                            promptRef.current?.focus()
                          }}
                          className="chip"
                        >
                          {suggestion}
                        </button>
                      </li>
                    ))}
                  </ul>

                  <button type="submit" className="btn-primary">
                    Send prompt
                    <CornerDownLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="font-mono text-[0.9rem] leading-7">
                {/* What they asked, echoed back like a transcript. */}
                <p className="label">Your prompt</p>
                <p className="mt-2 flex gap-3 text-ink-strong">
                  <span aria-hidden="true" className="text-accent">
                    &gt;
                  </span>
                  <span className="min-w-0 whitespace-pre-wrap break-words">{message}</span>
                </p>

                {(step === 'details' || step === 'sending') && (
                  <form onSubmit={submitDetails} className="mt-6">
                    <p className="text-ink-muted">
                      <span aria-hidden="true" className="text-accent">
                        &lt;{' '}
                      </span>
                      Got it. Who should I reply to?
                    </p>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <Field
                        id="contact-name"
                        label="Name"
                        inputRef={nameRef}
                        value={name}
                        onChange={setName}
                        autoComplete="name"
                        maxLength={100}
                        disabled={step === 'sending'}
                      />
                      <Field
                        id="contact-email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={setEmail}
                        autoComplete="email"
                        maxLength={200}
                        disabled={step === 'sending'}
                      />
                    </div>

                    {/* Hidden from people; bots that fill it are ignored by the server. */}
                    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                      <label htmlFor="contact-website">Website</label>
                      <input
                        id="contact-website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={website}
                        onChange={(event) => setWebsite(event.target.value)}
                      />
                    </div>

                    {error && (
                      <p role="alert" className="mt-3 text-[0.8rem] text-accent">
                        {error}
                      </p>
                    )}

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => setStep('prompt')}
                        disabled={step === 'sending'}
                        className="link inline-flex items-center gap-1.5 font-sans text-sm text-ink-muted"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                        Edit prompt
                      </button>
                      <button type="submit" disabled={step === 'sending'} className="btn-primary font-sans">
                        {step === 'sending' ? (
                          <>
                            Sending
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          </>
                        ) : (
                          <>
                            Send to Nitish
                            <CornerDownLeft className="h-4 w-4" aria-hidden="true" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {step === 'sent' && (
                  <div className="mt-6" role="status">
                    <p className="text-ink-muted">
                      <span aria-hidden="true" className="text-accent">
                        &lt;{' '}
                      </span>
                      Sent. I&apos;ll reply to <span className="text-ink-strong">{email}</span>.
                    </p>
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                      <Stamp rotate={-4} delay={0}>
                        Delivered
                      </Stamp>
                      <button type="button" onClick={reset} className="link font-sans text-sm text-ink-muted">
                        Send another prompt
                      </button>
                    </div>
                  </div>
                )}

                {step === 'error' && (
                  <div className="mt-6" role="alert">
                    <p className="text-ink-muted">
                      <span aria-hidden="true" className="text-accent">
                        !{' '}
                      </span>
                      {error}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 font-sans text-sm">
                      <button type="button" onClick={() => setStep('details')} className="btn-secondary">
                        Try again
                      </button>
                      <a href={mailtoFallback} className="link">
                        Email it instead
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Reveal>

        <Note rotate={-1.5} className="mt-6">
          goes straight to my inbox. or press the call button, my voice agent picks up.
        </Note>

        {/* Channels as a plain index, one per row. */}
        <dl className="mt-12 border-t border-line">
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

function Field({ id, label, inputRef, value, onChange, type = 'text', ...rest }) {
  return (
    <div>
      <label htmlFor={id} className="label block">
        {label}
      </label>
      <input
        id={id}
        ref={inputRef}
        type={type}
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="sketch mt-2 w-full bg-transparent px-3 py-2 font-mono text-[0.88rem] text-ink-strong outline-none transition-colors focus:border-accent disabled:opacity-60"
        {...rest}
      />
    </div>
  )
}
