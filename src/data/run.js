/**
 * The page is one agent run, read top to bottom. Each stage is a section; `call`
 * is the function name shown beside its heading.
 *
 * Order here drives the progress spine, so keep it in step with App.jsx.
 */
export const runStages = [
  { id: 'home', step: '00', name: 'prompt', call: 'receive_prompt()' },
  { id: 'about', step: '01', name: 'context', call: 'load_context()' },
  { id: 'process', step: '02', name: 'plan', call: 'make_plan()' },
  { id: 'expertise', step: '03', name: 'tools', call: 'load_tools()' },
  { id: 'compute', step: '04', name: 'compute', call: 'allocate_gpu()' },
  { id: 'projects', step: '05', name: 'execute', call: 'run_tasks()' },
  { id: 'experience', step: '06', name: 'history', call: 'read_log()' },
  { id: 'impact', step: '07', name: 'results', call: 'evaluate()' },
  { id: 'contact', step: '08', name: 'your turn', call: 'await_user()' },
]

export const runStageIds = runStages.map((stage) => stage.id)

/** Heading details by section id, including sub-steps the spine does not list. */
export const stageDetails = {
  ...Object.fromEntries(runStages.map((stage) => [stage.id, stage])),
  education: { id: 'education', step: '01', name: 'memory', call: 'read_memory()' },
}
