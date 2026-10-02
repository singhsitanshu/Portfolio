// Authoritative bank: projects/CODEGRAPH.md; 04_METRICS.md M09, M11–M12.
// Metric wording: catalog/resume-bullets.json B0013/B0032/B0185.
// Ticket 15: owner-verified metrics take precedence over older evidence caveats; see docs/ticket-15-verification.md.
import type { CaseStudyResultSummary } from './case-study';
export const codegraphFeature = {
  showcase: {
    summary: 'Explore codebases through interactive graphs and question-specific retrieval.',
    highlights: [
      { title: 'Structure & source', body: 'Inspect source on demand and trace direct callers and architectural communities.' },
    ],
    visualNote: 'Repository structure and retrieval flow.',
  },
  question: 'What if an AI agent could understand a codebase before touching it?',
  positioning: 'Repository intelligence for AI-assisted software engineering.',
  problem: 'Understanding unfamiliar code means finding the relevant files, tracing their relationships, and choosing what an agent needs to see.',
  system: 'CodeGraph connects repository structure, source inspection, and natural-language analysis so an agent can retrieve focused context.',
  visual: {
    title: 'From repository structure to focused context',
    caption: 'Files define functions. Calls connect them. Graph reasoning and vector search retrieve focused context for the agent.',
    stages: [
      { title: 'Files', detail: 'Repository-scoped source', symbol: 'file' },
      { title: 'Functions', detail: 'Tree-sitter parsing', symbol: 'function' },
      { title: 'Calls & dependencies', detail: 'Neo4j relationships', symbol: 'graph' },
      { title: 'Focused context', detail: 'Graph + vector retrieval', symbol: 'context' },
      { title: 'Agent', detail: 'LangGraph ReAct', symbol: 'agent' },
    ],
  },
  explanations: [
    { title: 'Repository-scoped analysis', body: 'Structure, dependency, and architecture queries stay within the selected repository.' },
    { title: 'Source retrieval', body: 'Inspect source on demand through the application’s source lookup endpoint and code drawer.' },
    { title: 'Graph reasoning', body: 'Trace callers and dependencies, and explore architectural communities with Neo4j and Leiden clustering.' },
    { title: 'Vector search', body: 'Use OpenAI embeddings and Neo4j vector indexes to find semantically related functions.' },
  ],
  result: {
    label: 'LLM context / per query',
    baseline: '≈737K',
    focused: '≈18K',
    unit: 'tokens per query',
    reduction: '97.5%',
    reductionLabel: 'LLM context reduction',
    note: 'Supported-source tokens compared with tool-returned context.',
  },
  agent: {
    label: '7 repository-scoped tools',
    body: 'A LangGraph ReAct agent powered by Claude Sonnet 5 uses tools for structure, dependencies, blast radius, external calls, semantic search, and architecture analysis.',
  },
  technologies: ['React / TypeScript', 'Python / FastAPI', 'Tree-sitter', 'Neo4j', 'LangGraph'],
  linkLabel: 'Explore CodeGraph',
} as const;

export const codegraphResultSummary = {
  id: 'result-summary',
  title: 'Measured results',
  metrics: [{
    value: codegraphFeature.result.reduction,
    label: codegraphFeature.result.reductionLabel,
    detail: `${codegraphFeature.result.baseline} → ${codegraphFeature.result.focused} ${codegraphFeature.result.unit}`,
  }],
  note: codegraphFeature.result.note,
  scope: 'Measures retrieved context size, excluding model prompts and generated answers; not accuracy, billing, or latency.',
  evidence: { id: 'results', label: 'Read context measurement and scope' },
} as const satisfies CaseStudyResultSummary;

export const codegraphProjectResult = {
  headline: `${codegraphFeature.result.reduction} less LLM context`,
  context: `${codegraphFeature.result.baseline} → ${codegraphFeature.result.focused} tokens/query; supported source vs. retrieved tool context`,
} as const;
