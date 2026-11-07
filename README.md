# Nitish Kumar — Portfolio

A portfolio for a **Senior AI Engineer** working across AI agents, agentic AI,
LLM applications and GPU-based AI workloads.

The page reads as one agent run, from a prompt through to handing control back to the
visitor, and can be switched between two worlds: a paper Notebook and a dark GPU Room.

Built with **React 18 + Vite**, **Tailwind CSS**, **Framer Motion**, **Lenis** and
**Lucide React**.

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the development server  (http://localhost:5173)
npm run dev

# 3. Build for production  → ./dist
npm run build

# 4. Preview the production build locally  (http://localhost:4173)
npm run preview
```

Requires Node.js 18 or newer.

---

## Before you publish

Three things to check:

1. **Resume** — the hero's *Résumé* link points at `/resume.pdf`. Drop your file at
   `public/resume.pdf`, or change `profile.resumeUrl` in `src/data/profile.js`.
2. **GitHub handle** — `profile.github` is set to `https://github.com/whereisnitish`,
   assumed to match the email and LinkedIn handle. **Confirm it before publishing** —
   it is linked in four places, all from that one constant.
3. **Contact details** — everything else (email, phone, LinkedIn, location) lives in
   the same `profile` object.
4. **Contact form email** — set the SMTP variables on your host (see below), or the
   form will show visitors an error with an "Email it instead" link.

---

## Contact form email

The "Next prompt" form posts to `/api/contact`, which emails the message to you over
SMTP with the visitor as Reply-To. It never sends mail to an address a visitor typed.

| Where | What runs it |
| --- | --- |
| `npm run dev` / `npm run preview` | Vite middleware in `vite.config.js`, reading `.env` |
| Production (Vercel) | The serverless function `api/contact.js` |

Both call the same handler in `server/contact.js`.

**Setup**

1. Copy `.env.example` to `.env` and fill it in for local work. `.env` is git-ignored.
2. In Vercel → Project → Settings → Environment Variables, add `SMTP_HOST`,
   `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_FROM` and optionally
   `CONTACT_TO` (defaults to `SMTP_FROM`).
3. For Gmail, `SMTP_PASSWORD` must be an App Password, not the account password.

Never prefix these with `VITE_`: that would bundle them into the public JavaScript.

On a host other than Vercel, wrap `handleContact` from `server/contact.js` in that
host's function format; `api/contact.js` shows the dozen lines involved.

Spam protection is a hidden honeypot field, input limits, and a best-effort limit of
five messages per visitor every ten minutes (per server instance).

---

## Design system

### The run

Sections follow the order of `runStages` in `src/data/run.js`:

```
00 prompt → 01 context → 02 plan → 03 tools → 04 compute → 05 execute
          → 06 history → 07 results → 08 your turn
```

`RunSpine` traces progress on wide screens, and the navbar shows a progress bar on
narrower ones. Plain nav labels (About, Tools, Work…) stay for anyone who wants to jump.

### Two worlds

| | Notebook (default) | GPU Room |
| --- | --- | --- |
| **Ground** | Warm ruled paper | Near-black dot grid |
| **Accent** | Pencil red | Phosphor green |
| **Headings** | Fraunces | Space Grotesk |
| **Line work** | Uneven, hand-ruled corners | Tight 3px corners |

Kalam is the handwriting in both, Inter the body text and JetBrains Mono the labels.

Colours and display type are CSS custom properties, so both worlds are the *same
classes* with different values, and the components contain no `dark:` variants. All
values live in the `@layer base` block at the top of `src/index.css`, and `.dark` on
`<html>` swaps them.

Two rules worth keeping:

- **Contrast.** `ink-body`, `ink-muted`, `ink-faint` and `accent` all clear WCAG AA
  (4.5:1) against both the ground and sheets, in both worlds. Re-check them if you
  change a value.
- **Opacity modifiers.** Tailwind only emits opacity steps of 5 (`/10`, `/45`).
  Something like `bg-accent/12` silently produces no CSS at all.

### Switching worlds

**The Notebook is the default.** The OS `prefers-color-scheme` setting is deliberately
not consulted. The GPU Room applies only once someone picks it, and that choice is
remembered in `localStorage`.

`src/hooks/useTheme.jsx` owns the state, keeps `<meta name="theme-color">` in sync and
runs the circular wipe. Browsers without view transitions switch instantly. An inline
script in `index.html` applies the class before first paint, so there is no flash on load.

### Motion and sound

Reduced-motion visitors get smooth scrolling, the pinned GPU stage, typing and wipes
turned off, with all content visible straight away. Sound effects are synthesised in
`src/lib/sound.js` and stay off until the visitor enables them.

### Layout

Every section uses the same grid: the step and function call in a narrow left column
(sticky on desktop), title and content in the main column. `SectionHeading` renders the
head; `SectionBody` aligns content to the same left edge beneath it.

---

## Project structure

```
src/
├── App.jsx                     Page composition — section order
├── main.jsx                    React entry point (wraps the app in ThemeProvider)
├── index.css                   Tokens for both worlds, shared component classes
├── lib/
│   └── sound.js                Synthesised sound effects, off by default
│
├── components/
│   ├── Navbar.jsx              Sticky nav, scroll-spy, progress bar, mobile sheet
│   ├── RunSpine.jsx            Fixed trace of the run's stages on wide screens
│   ├── Hero.jsx                00 prompt: typed prompt, headline, calls to action
│   ├── HeroVisual.jsx          Diagram of an agent request path
│   ├── About.jsx               01 context: narrative and quick facts
│   ├── Education.jsx           01 memory: education and interests
│   ├── SystemWorkflow.jsx      02 plan: checklist ticked off while scrolling
│   ├── Expertise.jsx           03 tools: technologies as a definition list
│   ├── Compute.jsx             04 compute: pinned scroll stage for GPU work
│   ├── TensorGrid.jsx          Canvas illustration used by Compute
│   ├── Projects.jsx            05 execute: selected work
│   ├── ProjectCard.jsx         Expandable project row
│   ├── ArchitectureFlow.jsx    Numbered request flow inside a project row
│   ├── Experience.jsx          06 history: role and responsibilities
│   ├── ImpactMetrics.jsx       07 results: animated counters
│   ├── Contact.jsx             08 your turn: prompt composer and channel index
│   ├── VoiceAgent.jsx          Floating Vapi call button (SDK lazy-loaded)
│   ├── Footer.jsx
│   └── ui/
│       ├── Section.jsx         Section shell: anchor, rhythm, hairline, container
│       ├── SectionHeading.jsx  Stage heading (+ SectionBody)
│       ├── Reveal.jsx          The standard entrance animation
│       ├── Scribble.jsx        Pencil strokes that draw themselves
│       ├── Stamp.jsx           Rubber stamp that lands on scroll
│       ├── Note.jsx            Handwritten margin note
│       ├── WorldSwitch.jsx     Notebook / GPU Room switch
│       └── SoundToggle.jsx     Sound effects on/off
│
├── data/                       All copy and content — edit here, not in components
│   ├── run.js                  The run's stages, in page order
│   ├── profile.js              Identity, about copy, hero prompt, GPU lines, education
│   ├── metrics.js              Impact figures
│   ├── skills.js               Technology ecosystem
│   ├── projects.js             Featured projects (incl. architecture steps)
│   ├── experience.js           Roles and responsibilities
│   ├── workflow.js             Build-process stages
│   ├── voiceAgent.js           Vapi keys and widget copy
│   └── navigation.js           Nav links and scroll-spy targets
│
└── hooks/
    ├── useTheme.jsx            World state, persistence and the circular wipe
    ├── useSmoothScroll.js      Lenis smooth scrolling, off for reduced motion
    ├── useActiveSection.js     Scroll-spy for the navbar and spine
    ├── useCountUp.js           Counter animation, reduced-motion aware
    └── useMediaQuery.js        Media query and reduced-motion helpers
```

**Content and presentation are separate.** To update copy, projects, metrics or
skills, edit the matching file in `src/data/` — no component changes needed.

---

## Editing common things

| Change | File |
| --- | --- |
| Name, tagline, email, phone, GitHub, LinkedIn, resume link | `src/data/profile.js` |
| Rotating hero words | `rotatingTitles` in `src/data/profile.js` |
| Impact numbers | `src/data/metrics.js` |
| Technologies and categories | `src/data/skills.js` |
| Projects, stacks, results, architecture steps | `src/data/projects.js` |
| Work history | `src/data/experience.js` |
| Colours and display fonts, both worlds | `src/index.css` |
| Section order | `src/App.jsx` and `runStages` in `src/data/run.js` |
| Fonts, spacing, token-to-class mapping | `tailwind.config.js` |
| Hero prompt, GPU stage lines, contact suggestions | `src/data/profile.js` |
| Hero diagram nodes and edges | `NODES` / `EDGES` in `src/components/HeroVisual.jsx` |
| Voice agent IDs and button copy | `src/data/voiceAgent.js` |

### Adding a project

Append an object to the `projects` array in `src/data/projects.js`:

```js
{
  id: 'unique-slug',
  name: 'Project name',
  kicker: 'Category · Subcategory',
  featured: false,          // true → the row starts expanded
  year: '2025',
  summary: 'One or two sentences.',
  stack: ['Python', 'FastAPI'],
  highlights: ['Engineering detail bullets'],
  results: [{ value: '40%', label: 'What improved' }],

  // Optional — renders the numbered request flow beside the highlights.
  architecture: [
    { label: 'User Instruction', note: 'Natural language' },
  ],
}
```

---

## Accessibility & performance

- Semantic landmarks, a skip link, `aria-current` on the active nav item,
  `aria-expanded`/`aria-controls` on every disclosure, and visible focus rings.
- Text contrast was measured in-browser across the whole page in both themes:
  **no WCAG AA failures**.
- `prefers-reduced-motion` is honoured throughout — the entrance animation is
  skipped, counters jump to their final value, the log prints instead of typing,
  and the diagram stops walking.
- No images, no icon fonts, no background layers. Scroll listeners are `passive`
  and rAF-throttled.

---

## Voice agent

A floating "Talk to my agent" button sits bottom-right and starts a live voice
call with a [Vapi](https://vapi.ai) assistant.

`src/components/VoiceAgent.jsx` owns the widget; `src/data/voiceAgent.js` holds the
IDs and every string it shows.

### How it loads

The Vapi SDK carries a WebRTC stack (~5MB unpacked, 318KB built). Importing it
normally would roughly double the page weight for a feature most visitors never
use, so it is `import()`-ed **on the first click**:

```
initial load   index.js   308KB  (99KB gzip)   ← no Vapi
first click    vapi.js    318KB  (81KB gzip)   ← fetched on demand
```

### States

`idle → connecting → active`, plus a transient `error` that clears itself after
five seconds so the button can never get stuck. While a call is running the button
shows a timer and a three-bar level meter driven by the SDK's `volume-level`
event — written straight to the DOM, never through React state, since it fires
many times a second.

### Configuration

```js
// src/data/voiceAgent.js
publicKey:   'ce91db6f-…'   // Vapi PUBLIC key — safe in the bundle by design
assistantId: 'a039b282-…'
```

Both can be overridden at build time without touching source:

```bash
VITE_VAPI_PUBLIC_KEY=…
VITE_VAPI_ASSISTANT_ID=…
```

Set those in **Vercel → Settings → Environment Variables** if you want a preview
deployment pointing at a different assistant. `VITE_*` values are embedded in the
client bundle — correct for a Vapi *public* key, but never put a Vapi **private**
key here.

If either value is empty the widget renders nothing, so the site degrades cleanly.

### Notes

- Microphone access needs a secure context. Works on `localhost` and on your
  Vercel HTTPS domain; plain `http://` on a LAN IP will not prompt.
- Denied microphone permission lands in the `error` state with a readable hint.
- The widget sits at `z-20`: above page content, below the navbar (`z-40`) and the
  mobile menu sheet (`z-30`), so an open menu covers it.
- `prefers-reduced-motion` stops the spinner and freezes the level meter.

---

## Deploying

The build output in `dist/` is a static site — deploy it anywhere.

- **Vercel / Netlify** — build command `npm run build`, publish directory `dist`.
- **GitHub Pages** — set `base: '/<repo-name>/'` in `vite.config.js` first, then
  publish `dist`.
