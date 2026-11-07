import { handleContact } from '../server/contact.js'

/**
 * Vercel serverless function: POST /api/contact
 *
 * Set SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD, SMTP_FROM (and
 * optionally CONTACT_TO) in the Vercel project's Environment Variables.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const payload = typeof req.body === 'string' ? safeParse(req.body) : req.body
  const clientId =
    String(req.headers['x-forwarded-for'] ?? '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown'

  const { status, body } = await handleContact(payload, process.env, clientId)
  return res.status(status).json(body)
}

function safeParse(text) {
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}
