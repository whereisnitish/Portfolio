import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'

/**
 * System flow diagram: User → AI Agent → LLM → Tools → APIs → Database.
 *
 * Drawn as a wireframe — 1px rules, hairline boxes, no fills or glows. The
 * accent walks the path one edge at a time so the diagram reads as something
 * executing, without any decorative motion.
 *
 * Geometry lives in a 0–100 space shared by the SVG edge layer (viewBox
 * 0 0 100 100, non-uniform scale) and the HTML node layer (left/top
 * percentages), so the two stay in registration at any size.
 */
const NODES = {
  user: { label: 'User', meta: 'intent', x: 50, y: 7 },
  agent: { label: 'AI Agent', meta: 'plan · decide', x: 50, y: 31 },
  llm: { label: 'LLM', meta: 'reasoning', x: 20, y: 57 },
  tools: { label: 'Tools', meta: 'MCP', x: 80, y: 57 },
  apis: { label: 'APIs', meta: 'FastAPI', x: 80, y: 87 },
  db: { label: 'Database', meta: 'Postgres', x: 20, y: 87 },
}

/** Edges in execution order; `via` routes an L-shaped connector. */
const EDGES = [
  { from: 'user', to: 'agent' },
  { from: 'agent', to: 'llm', via: { x: 20, y: 31 } },
  { from: 'llm', to: 'tools' },
  { from: 'tools', to: 'apis' },
  { from: 'apis', to: 'db' },
]

const STEP_MS = 1400

export default function HeroVisual() {
  const reduceMotion = usePrefersReducedMotion()
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const timer = setInterval(() => setStep((s) => (s + 1) % EDGES.length), STEP_MS)
    return () => clearInterval(timer)
  }, [reduceMotion])

  // The node an edge is currently delivering to.
  const activeNode = reduceMotion ? null : EDGES[step].to
  const activeEdge = reduceMotion ? -1 : step

  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <div className="relative aspect-[4/3.4] w-full">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {EDGES.map((edge, index) => {
            const a = NODES[edge.from]
            const b = NODES[edge.to]
            const points = edge.via
              ? `${a.x},${a.y} ${edge.via.x},${edge.via.y} ${b.x},${b.y}`
              : `${a.x},${a.y} ${b.x},${b.y}`
            const isActive = index === activeEdge

            return (
              <polyline
                key={`${edge.from}-${edge.to}`}
                points={points}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                className={[
                  'transition-colors duration-500',
                  isActive ? 'text-accent' : 'text-ink-faint/45',
                ].join(' ')}
              />
            )
          })}
        </svg>

        {Object.entries(NODES).map(([id, node]) => {
          const isActive = activeNode === id
          return (
            <div
              key={id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <div
                className={[
                  'flex min-w-[92px] flex-col items-center gap-0.5 border bg-canvas px-3 py-2 transition-colors duration-500',
                  isActive ? 'border-accent' : 'border-line-strong',
                ].join(' ')}
              >
                <span
                  className={[
                    'text-[0.76rem] font-medium leading-none transition-colors duration-500',
                    isActive ? 'text-accent' : 'text-ink-strong',
                  ].join(' ')}
                >
                  {node.label}
                </span>
                <span className="font-mono text-[0.58rem] leading-none text-ink-faint">
                  {node.meta}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <p className="mt-6 border-t border-line pt-4 label">
        Request path · {EDGES.length} hops
      </p>
    </div>
  )
}
