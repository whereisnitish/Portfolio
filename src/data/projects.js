/**
 * Featured work. `architecture` (optional) renders an animated pipeline
 * diagram inside the expanded card.
 */
export const projects = [
  {
    id: 'browser-agent',
    name: 'Autonomous Browser Automation Agent',
    kicker: 'Agentic AI · Tool Use',
    featured: true,
    year: '2025',
    summary:
      'An AI-powered browser automation agent that navigates and interacts with web applications autonomously from natural language instructions.',
    stack: ['Python', 'Playwright', 'MCP', 'noVNC', 'Llama', 'OpenAI API', 'Redis'],
    highlights: [
      'Natural language browser automation',
      'MCP integration for structured tool communication',
      'Remote browser monitoring via noVNC',
      'Hybrid reasoning across OpenAI and Llama models',
      'Autonomous form filling and data extraction',
      'Multi-step browser workflows with session memory',
      'Retry and recovery mechanisms on failed steps',
      'Fully asynchronous Playwright execution',
    ],
    results: [
      { value: '45%', label: 'Improvement in automation reliability' },
      { value: '30%', label: 'Reduction in workflow completion time' },
    ],
    architecture: [
      { label: 'User Instruction', note: 'Natural language task' },
      { label: 'AI Agent', note: 'Plans & decomposes steps' },
      { label: 'LLM Reasoning', note: 'OpenAI · Llama hybrid' },
      { label: 'MCP Tool Layer', note: 'Structured tool calls' },
      { label: 'Playwright Browser', note: 'Async execution' },
      { label: 'Website Interaction', note: 'Fill · extract · verify' },
    ],
  },
  {
    id: 'conversational-agent',
    name: 'AI-Powered Conversational Agent',
    kicker: 'LLM Application · Voice',
    year: '2024',
    summary:
      'An intelligent conversational system that understands context and maintains full conversation history across sessions.',
    stack: ['Python', 'OpenAI API', 'Django', 'Redis'],
    highlights: [
      'Context-aware multi-turn conversations',
      'Persistent conversation memory in Redis',
      'Domain-specific query handling',
      'Text-to-speech output',
      'Speech-to-text input',
    ],
    results: [{ value: '35%', label: 'Increase in successful query resolution' }],
  },
  {
    id: 'tlc-backend',
    name: 'TLC Mobile App Backend',
    kicker: 'Backend Architecture',
    year: '2024',
    summary:
      'Scalable RESTful APIs powering a cross-platform Android and iOS application.',
    stack: ['Python', 'Django', 'Django REST Framework'],
    highlights: [
      'Versioned REST API surface',
      'Authentication and role-based authorization',
      'Database query and index optimization',
      'Scalable, modular backend architecture',
      'Cloud deployment and environment management',
    ],
    results: [{ value: '40%', label: 'Improvement in response times' }],
  },
  {
    id: 'ecommerce-ai',
    name: 'E-Commerce Platform with AI Recommendations',
    kicker: 'Full Platform · ML',
    year: '2023',
    summary:
      'A complete e-commerce platform with authentication, product management, secure payments and AI-powered product recommendations.',
    stack: ['Django', 'PostgreSQL', 'Stripe API', 'TensorFlow Recommenders'],
    highlights: [
      'Catalogue and inventory management',
      'Secure Stripe payment flows',
      'Recommendation model served in-request',
      'Aggressive front-end and query caching',
    ],
    results: [
      { value: '20%', label: 'Increase in average order value' },
      { value: '40%', label: 'Reduction in page load times' },
    ],
  },
  {
    id: 'voice-assistant',
    name: 'Personal AI Voice Assistant',
    kicker: 'Voice Agent · Automation',
    year: '2025',
    summary:
      'A custom AI voice assistant that speaks with callers naturally and forwards calls when a human is required.',
    stack: ['Python', 'Django', 'Vapi', 'Make.com', 'PythonAnywhere'],
    highlights: [
      'Real-time voice conversations',
      'Inbound call handling',
      'Intelligent call forwarding rules',
      'Automated post-call summaries',
      'Email automation via Make.com',
    ],
    results: [],
  },
]
