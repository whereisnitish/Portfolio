# Nitish Kumar — Portfolio

A portfolio for a **Senior Python Developer** working across AI agents, agentic AI,
LLM applications and production backend architecture.

Minimalist and typography-led: one continuous surface, a single neutral ink scale,
one accent colour, and hairlines instead of cards. Light and dark themes.

Built with **React 18 + Vite**, **Tailwind CSS**, **Framer Motion** and **Lucide React**.

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

---

## Design system

The whole system is small on purpose.

| | |
| --- | --- |
| **Surface** | One continuous ground. No bands, no cards, no background layers. |
| **Separation** | A 1px hairline and generous whitespace. No shadows anywhere. |
| **Colour** | One neutral ink scale (4 steps) plus one accent. |
| **Accent** | Only for links, the active nav item, live status and the primary button. |
| **Type** | Inter for text, JetBrains Mono for labels and metadata. |
| **Motion** | One entrance (short fade + 12px rise) and a few purposeful state changes. |

No gradients, glows, blurred blooms, textures or decorative animation. Hierarchy
comes from weight, size and space.

### Tokens

Colours are CSS custom properties, so light and dark are the *same classes* with
different values — there is not a single `dark:` variant in the components.

```
--bg  --bg-surface                     ground
--ink-strong  --ink-body               headings, body
--ink-muted   --ink-faint              secondary, metadata
--accent      --on-accent              the one accent, and text that sits on it
--line        --line-strong            hairlines
```

All values live in the `@layer base` block at the top of `src/index.css`.
`.dark` on `<html>` swaps them. Change a value there and the whole page follows.

Two rules worth keeping:

- **Contrast.** `ink-body`, `ink-muted` and `ink-faint` all clear WCAG AA (4.5:1)
  against the ground in both themes. `ink-faint` is the tightest — re-check it if
  you lighten it.
- **Opacity modifiers.** Tailwind only emits opacity steps of 5 (`/10`, `/45`).
  Something like `bg-accent/12` silently produces no CSS at all.

### Layout

Every section uses the same editorial grid: a numbered mono label in a narrow left
column (sticky on desktop), title and content in the main column.

```
10rem          main column
─────────────  ───────────────────────────────
04 / WORK      Systems designed, built
               and shipped

               01  Autonomous Browser Agent
               02  AI-Powered Conversational Agent
```

`SectionHeading` renders the head; `SectionBody` aligns content to the same left
edge beneath it.

### The theme toggle

**Light is the default.** The OS `prefers-color-scheme` setting is deliberately not
consulted — every first-time visitor gets the light theme, including those whose
system is set to dark. Dark applies only once someone picks it with the toggle, and
that choice is remembered in `localStorage` from then on.

`src/hooks/useTheme.jsx` owns the state and keeps `<meta name="theme-color">` in
sync. An inline script in `index.html` applies the class before first paint, so
there is no flash on load.

To follow the OS instead, read `prefers-color-scheme` in that inline script when
nothing is stored, and add a `matchMedia` listener in the provider.

---

## Project structure

```
src/
├── App.jsx                     Page composition — section order
├── main.jsx                    React entry point (wraps the app in ThemeProvider)
├── index.css                   Theme tokens, shared component classes
│
├── components/
│   ├── Navbar.jsx              Sticky nav, scroll-spy, mobile sheet, theme toggle
│   ├── Hero.jsx                Name, rotating specialisation, calls to action
│   ├── HeroVisual.jsx          Wireframe diagram of an agent request path
│   ├── About.jsx               Narrative, facts, system log
│   ├── ImpactMetrics.jsx       Animated counters on a hairline grid
│   ├── Expertise.jsx           Technologies as a definition list
│   ├── Projects.jsx            Selected work
│   ├── ProjectCard.jsx         Expandable project row
│   ├── ArchitectureFlow.jsx    Numbered request flow inside a project row
│   ├── Experience.jsx          Role, summary, grouped responsibilities
│   ├── SystemWorkflow.jsx      "From idea to production" — seven stages
│   ├── Education.jsx           Education and interests
│   ├── Contact.jsx             Closing statement and channel index
│   ├── Footer.jsx
│   └── ui/
│       ├── Section.jsx         Section shell: anchor, rhythm, hairline, container
│       ├── SectionHeading.jsx  The editorial grid head (+ SectionBody)
│       ├── Reveal.jsx          The single entrance animation
│       ├── TerminalPanel.jsx   Typewriter system log
│       └── ThemeToggle.jsx     Light/dark switch
│
├── data/                       All copy and content — edit here, not in components
│   ├── profile.js              Identity, about copy, education, interests
│   ├── metrics.js              Impact figures
│   ├── skills.js               Technology ecosystem
│   ├── projects.js             Featured projects (incl. architecture steps)
│   ├── experience.js           Roles and responsibilities
│   ├── workflow.js             Build-process stages
│   └── navigation.js           Nav links and scroll-spy targets
│
└── hooks/
    ├── useTheme.jsx            Theme state: light default, explicit choice, persistence
    ├── useActiveSection.js     Scroll-spy for the navbar
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
| Colours, both themes | `src/index.css` |
| Section order | `src/App.jsx` |
| Fonts, spacing, token-to-class mapping | `tailwind.config.js` |
| System log transcript | `DEFAULT_LINES` in `src/components/ui/TerminalPanel.jsx` |
| Hero diagram nodes and edges | `NODES` / `EDGES` in `src/components/HeroVisual.jsx` |

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

## Deploying

The build output in `dist/` is a static site — deploy it anywhere.

- **Vercel / Netlify** — build command `npm run build`, publish directory `dist`.
- **GitHub Pages** — set `base: '/<repo-name>/'` in `vite.config.js` first, then
  publish `dist`.
