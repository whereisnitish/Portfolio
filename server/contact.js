import nodemailer from 'nodemailer'
import { buildContactEmail } from './emailTemplate.js'

/**
 * Sends a contact-form message to the site owner over SMTP.
 *
 * Runs only on the server (the Vercel function in api/contact.js, or the Vite
 * dev/preview middleware). SMTP credentials never reach the browser.
 *
 * Messages always go to the owner's own inbox, with the visitor as Reply-To.
 * Nothing is ever sent to an address the visitor typed, so the form cannot be
 * used to send mail to third parties.
 */

const LIMITS = { name: 100, email: 200, message: 5000 }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Best-effort flood protection. Serverless instances do not share memory, so
// this slows a single noisy client rather than guaranteeing a global limit.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const recentByClient = new Map()

function isRateLimited(clientId) {
  const now = Date.now()
  const recent = (recentByClient.get(clientId) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) {
    recentByClient.set(clientId, recent)
    return true
  }
  recent.push(now)
  recentByClient.set(clientId, recent)
  return false
}

/** Collapses whitespace and line breaks, which have no place in a header. */
const singleLine = (value) => String(value ?? '').replace(/\s+/g, ' ').trim()

function validate(payload) {
  const name = singleLine(payload?.name)
  const email = singleLine(payload?.email)
  const message = String(payload?.message ?? '').trim()

  if (!name || name.length > LIMITS.name) return { error: 'Please add your name.' }
  if (!EMAIL_PATTERN.test(email) || email.length > LIMITS.email) {
    return { error: 'Please add a valid email address.' }
  }
  if (!message || message.length > LIMITS.message) {
    return { error: `Please write a message of up to ${LIMITS.message} characters.` }
  }
  return { name, email, message }
}

let transporter = null

function getTransporter(env) {
  if (!transporter) {
    const port = Number(env.SMTP_PORT ?? 587)
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: env.SMTP_USERNAME,
        // Gmail shows app passwords in groups of four; the spaces are not part of it.
        pass: String(env.SMTP_PASSWORD ?? '').replace(/\s+/g, ''),
      },
    })
  }
  return transporter
}

/**
 * @param {object} payload  Parsed JSON body: { name, email, message, website }
 * @param {object} env      Server environment (SMTP_* and optional CONTACT_TO)
 * @param {string} clientId Something stable per visitor, such as the IP address
 * @returns {Promise<{ status: number, body: object }>}
 */
export async function handleContact(payload, env, clientId = 'unknown') {
  // Honeypot: a field people never see. Bots fill it; pretend all went well.
  if (singleLine(payload?.website)) return { status: 200, body: { ok: true } }

  const input = validate(payload)
  if (input.error) return { status: 400, body: { ok: false, error: input.error } }

  if (isRateLimited(clientId)) {
    return {
      status: 429,
      body: { ok: false, error: 'Too many messages in a short time. Please try again later.' },
    }
  }

  if (!env.SMTP_HOST || !env.SMTP_USERNAME || !env.SMTP_PASSWORD || !env.SMTP_FROM) {
    console.error('[contact] SMTP is not configured: set the SMTP_* environment variables.')
    return { status: 500, body: { ok: false, error: 'Email is not set up on the server yet.' } }
  }

  const to = env.CONTACT_TO || env.SMTP_FROM

  const { subject, text, html } = buildContactEmail(input)

  try {
    await getTransporter(env).sendMail({
      from: { name: 'Portfolio', address: env.SMTP_FROM },
      to,
      replyTo: { name: input.name, address: input.email },
      subject,
      text,
      html,
    })
    return { status: 200, body: { ok: true } }
  } catch (error) {
    console.error('[contact] Sending failed:', error?.message ?? error)
    return {
      status: 502,
      body: { ok: false, error: 'The message could not be sent. Please try email instead.' },
    }
  }
}
