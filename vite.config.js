import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { handleContact } from './server/contact.js'

const MAX_BODY_BYTES = 20_000

/**
 * Serves POST /api/contact during `npm run dev` and `npm run preview`, using the
 * same handler as the deployed Vercel function. SMTP settings come from .env,
 * which stays on the server: Vite only exposes VITE_-prefixed variables to the
 * browser.
 */
function contactApi(env) {
  const middleware = (req, res, next) => {
    if (req.url !== '/api/contact') return next()

    const send = (status, body) => {
      res.statusCode = status
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(body))
    }

    if (req.method !== 'POST') return send(405, { ok: false, error: 'Method not allowed' })

    let raw = ''
    req.on('data', (chunk) => {
      raw += chunk
      if (raw.length > MAX_BODY_BYTES) req.destroy()
    })
    req.on('end', async () => {
      let payload = null
      try {
        payload = JSON.parse(raw)
      } catch {
        // Falls through to validation, which rejects it.
      }
      const { status, body } = await handleContact(payload, env, req.socket.remoteAddress)
      send(status, body)
    })
  }

  return {
    name: 'contact-api',
    // Block bodies on purpose: Vite treats a returned function as a post-hook.
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    },
  }
}

export default defineConfig(({ mode }) => {
  // '' loads every variable from .env, not just VITE_ ones. They are used here,
  // on the server, and never bundled.
  const env = { ...process.env, ...loadEnv(mode, process.cwd(), '') }

  return {
    plugins: [react(), contactApi(env)],
    server: {
      port: 5173,
      open: true,
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
    },
  }
})
