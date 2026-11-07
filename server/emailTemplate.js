/**
 * The notification email sent when someone submits the contact form.
 *
 * Email clients ignore stylesheets and most modern CSS, so the HTML is built
 * from tables with inline styles, and fonts fall back to ones every client has.
 * A plain-text version goes alongside it for clients that do not show HTML.
 */

const COLORS = {
  page: '#efe7d4',
  paper: '#fcf8ee',
  ink: '#211c16',
  body: '#423a30',
  muted: '#6b6051',
  line: '#e3d9c4',
  accent: '#b03610',
  onAccent: '#fff8eb',
}

const SERIF = "Georgia, 'Times New Roman', serif"
const SANS = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
const MONO = "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace"

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

/** The first few words, for the subject line and inbox preview. */
function summarise(message, maxLength) {
  const flat = message.replace(/\s+/g, ' ').trim()
  if (flat.length <= maxLength) return flat
  return `${flat.slice(0, maxLength).replace(/\s+\S*$/, '')}…`
}

function formatTime(date) {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  }).format(date)
}

/**
 * @param {{ name: string, email: string, message: string, sentAt?: Date }} input
 * @returns {{ subject: string, text: string, html: string }}
 */
export function buildContactEmail({ name, email, message, sentAt = new Date() }) {
  const time = `${formatTime(sentAt)} IST`
  const subject = `New prompt from ${name}: ${summarise(message, 60)}`
  const preview = summarise(message, 110)

  const replySubject = encodeURIComponent(`Re: your message on my portfolio`)
  const replyBody = encodeURIComponent(
    `Hi ${name.split(' ')[0]},\n\nThanks for reaching out.\n\n\n\n> ${message.split('\n').join('\n> ')}`,
  )
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${replySubject}&body=${replyBody}`

  const text = [
    `New prompt from your portfolio`,
    ``,
    `From:     ${name}`,
    `Email:    ${email}`,
    `Received: ${time}`,
    ``,
    `Message`,
    `-------`,
    message,
    ``,
    `Reply to this email to answer ${name} directly.`,
  ].join('\n')

  const messageHtml = escapeHtml(message).replace(/\r?\n/g, '<br>')
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)

  const detailRow = (label, value) => `
            <tr>
              <td style="padding:6px 0;width:92px;vertical-align:top;font-family:${MONO};font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${COLORS.muted};">${label}</td>
              <td style="padding:6px 0;vertical-align:top;font-family:${SANS};font-size:15px;color:${COLORS.ink};">${value}</td>
            </tr>`

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:${COLORS.page};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preview)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${COLORS.page};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">

          <tr>
            <td style="padding:0 4px 14px;font-family:${MONO};font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${COLORS.muted};">
              <span style="color:${COLORS.accent};">08</span> / your turn &nbsp;·&nbsp; await_user()
            </td>
          </tr>

          <tr>
            <td style="background:${COLORS.paper};border:1px solid ${COLORS.line};border-top:4px solid ${COLORS.accent};border-radius:6px;padding:32px 32px 28px;">

              <h1 style="margin:0;font-family:${SERIF};font-size:26px;line-height:1.25;font-weight:bold;color:${COLORS.ink};">
                New prompt from ${safeName}
              </h1>
              <p style="margin:8px 0 0;font-family:${SANS};font-size:14px;line-height:1.5;color:${COLORS.muted};">
                Someone sent a message through the contact form on your portfolio.
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;border-top:1px solid ${COLORS.line};border-bottom:1px solid ${COLORS.line};">
                <tr><td style="height:10px;line-height:10px;font-size:0;">&nbsp;</td></tr>${detailRow('From', safeName)}${detailRow(
                  'Email',
                  `<a href="mailto:${safeEmail}" style="color:${COLORS.accent};text-decoration:none;">${safeEmail}</a>`,
                )}${detailRow('Received', escapeHtml(time))}
                <tr><td style="height:10px;line-height:10px;font-size:0;">&nbsp;</td></tr>
              </table>

              <p style="margin:24px 0 10px;font-family:${MONO};font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${COLORS.muted};">
                Their prompt
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-left:3px solid ${COLORS.accent};background:#f6efdd;padding:16px 18px;font-family:${MONO};font-size:14px;line-height:1.65;color:${COLORS.body};">
                    <span style="color:${COLORS.accent};">&gt;</span>&nbsp;${messageHtml}
                  </td>
                </tr>
              </table>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;">
                <tr>
                  <td style="border-radius:4px;background:${COLORS.accent};">
                    <a href="${replyHref}" style="display:inline-block;padding:12px 22px;font-family:${SANS};font-size:15px;font-weight:600;color:${COLORS.onAccent};text-decoration:none;">
                      Reply to ${escapeHtml(name.split(' ')[0])} &rarr;
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:12px 0 0;font-family:${SANS};font-size:13px;line-height:1.5;color:${COLORS.muted};">
                Or just hit reply: this email's Reply-To is set to ${safeEmail}.
              </p>

            </td>
          </tr>

          <tr>
            <td style="padding:16px 4px 0;font-family:${MONO};font-size:11px;line-height:1.6;color:${COLORS.muted};">
              <span style="color:${COLORS.accent};">exit 0</span> · sent by the contact form on your portfolio
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  return { subject, text, html }
}
