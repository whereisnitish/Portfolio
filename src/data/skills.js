/**
 * Technology ecosystem. Each category renders as an interactive cluster;
 * `icon` maps to a lucide-react component in Expertise.jsx.
 */
export const skillCategories = [
  {
    id: 'ai-agents',
    title: 'AI & Agentic Systems',
    summary: 'Autonomous agents, tool use and retrieval pipelines.',
    items: [
      'OpenAI API',
      'LLM Applications',
      'RAG',
      'LangGraph',
      'CrewAI',
      'Hugging Face',
      'Transformers',
      'MCP (Model Context Protocol)',
      'AI Voice Agents',
      'Conversational AI',
    ],
  },
  {
    id: 'backend',
    title: 'Backend Engineering',
    summary: 'API-first services built to hold up under real load.',
    items: [
      'Python',
      'FastAPI',
      'Django',
      'Flask',
      'Node.js',
      'REST APIs',
      'Microservices',
      'Async Programming',
    ],
  },
  {
    id: 'ml',
    title: 'AI / Machine Learning',
    summary: 'Model work, NLP, computer vision and GPU-based workloads.',
    items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'NLP', 'OpenCV', 'MediaPipe', 'GPU Workloads'],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    summary: 'Deploy, automate, repeat.',
    items: ['AWS EC2', 'AWS S3', 'GitHub Actions', 'CI/CD', 'Git', 'JIRA'],
  },
  {
    id: 'data',
    title: 'Databases & Infrastructure',
    summary: 'Relational, document and in-memory stores.',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
  },
  {
    id: 'automation',
    title: 'Automation',
    summary: 'Glue that removes manual steps permanently.',
    items: ['n8n', 'Make.com', 'Zapier', 'Playwright'],
  },
]
