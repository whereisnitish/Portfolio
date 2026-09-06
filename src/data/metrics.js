/**
 * Engineering impact figures. `value` is the number the counter animates to,
 * `suffix` is appended once the animation settles.
 */
export const metrics = [
  {
    value: 25,
    suffix: '%',
    label: 'Query response performance',
    detail: 'Index tuning + query rewrites across Postgres workloads',
  },
  {
    value: 95,
    suffix: '%',
    label: 'Client satisfaction',
    detail: 'Sustained across delivery cycles and handovers',
  },
  {
    value: 30,
    suffix: '%',
    label: 'Faster development turnaround',
    detail: 'Reusable service scaffolding and shared API contracts',
  },
  {
    value: 60,
    suffix: '%',
    label: 'Pipeline efficiency',
    detail: 'Async processing and queue-backed background work',
  },
  {
    value: 35,
    suffix: '%',
    label: 'Reduced LLM API costs',
    detail: 'Prompt compression, response caching, model routing',
  },
  {
    value: 40,
    suffix: '%',
    label: 'Reduced API latency',
    detail: 'Redis caching layers and payload slimming',
  },
  {
    value: 50,
    suffix: '%',
    label: 'Faster deployment cycles',
    detail: 'GitHub Actions CI/CD with automated checks',
  },
]
