/** The seven stages rendered as a pipeline in the "From Idea to Production" section. */
export const workflowStages = [
  {
    step: '01',
    title: 'Understand the Problem',
    body: 'Client conversations, constraints, edge cases. Scope the real problem before touching an editor.',
  },
  {
    step: '02',
    title: 'Design the Architecture',
    body: 'Service boundaries, data model, contracts and failure modes — decided up front, on paper.',
  },
  {
    step: '03',
    title: 'Build the Backend & APIs',
    body: 'Typed, versioned, documented APIs. Async where it earns its keep, tested where it matters.',
  },
  {
    step: '04',
    title: 'Integrate AI / LLM Systems',
    body: 'Agents, retrieval and tool layers wired into product flows with guardrails and cost controls.',
  },
  {
    step: '05',
    title: 'Connect Tools & Automation',
    body: 'MCP tools, n8n, Make.com and Zapier remove the manual steps around the system.',
  },
  {
    step: '06',
    title: 'Deploy & Scale',
    body: 'GitHub Actions pipelines, environment parity and repeatable, boring releases.',
  },
  {
    step: '07',
    title: 'Monitor & Optimize',
    body: 'Latency, error rates and token spend watched continuously — then tuned down.',
  },
]
