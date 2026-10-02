// Attached CODEGRAPH_MASTERY, pinned revision 79fa768 (2026-09-24).
// Sources: 01_FOUNDATIONS §§4–13; 02_APPLICATION_AND_AUDIT §§14–27;
// 06_EVIDENCE validation/benchmark ledger; 07_FINAL_REVIEW architecture diagrams.
// These are implementation observations and derived lessons, not invented motives.
export const codegraphCaseStudy = {
  introduction: 'Explore a repository through syntax, relationships, and question-specific retrieval instead of sending all of its source to an agent.',
  overview: [
    { label: 'System', value: 'Repository exploration' },
    { label: 'Interface', value: 'React Flow graph + source drawer' },
    { label: 'Retrieval', value: 'Seven LangGraph tools over Neo4j' },
  ],
  sections: [
    { id: 'problem', title: 'The problem' },
    { id: 'architecture', title: 'System architecture' },
    { id: 'execution', title: 'From ingestion to context' },
    { id: 'challenges', title: 'Engineering challenges' },
    { id: 'correctness', title: 'Correctness & validation' },
    { id: 'results', title: 'Results & measurement' },
    { id: 'decisions', title: 'Design decisions & tradeoffs' },
    { id: 'lessons', title: 'Engineering lessons' },
    { id: 'repository', title: 'Repository' },
  ],
  problem: 'An unfamiliar repository presents two related problems: finding relevant code and understanding how it connects. A full-source prompt is large, while isolated snippets can lose caller and dependency context. CodeGraph builds a navigable structural index and lets an agent choose smaller observations for the current question.',
  system: 'A React dashboard submits a GitHub repository to FastAPI, displays a React Flow graph, and fetches source separately when a function is selected. The backend combines Tree-sitter parsing, Neo4j relationships, metadata embeddings, Leiden communities, and a LangGraph ReAct agent powered by Claude Sonnet 5.',
  architecture: {
    title: 'Two paths through one repository index',
    layers: [
      { label: '01 / Interface', title: 'React dashboard ↔ FastAPI', detail: 'Repository submission, graph exploration, source inspection, and questions.', connection: 'Ingestion path ↓' },
      { label: '02 / Indexing', title: 'GitHub archive → Tree-sitter → ETL', detail: 'Safe temporary extraction; supported-source discovery; syntax records; three-pass graph writes.', connection: 'Persist + enrich ↓' },
      { label: '03 / Storage', title: 'Neo4j graph · vectors · communities', detail: 'Repository → File → Function; inferred CALLS edges. OpenAI name/path embeddings and sampled community labels enrich the index.', connection: 'Question path: agent ↔ tools ↔ index ↓' },
      { label: '04 / Retrieval', title: 'LangGraph ReAct ↔ Claude Sonnet 5', detail: 'Seven tools return structure, direct callers, outgoing calls, unresolved external names, semantic matches, and community summaries. Tool observations inform the final answer.' },
    ],
    caption: 'Ingestion builds the repository index. Questions use graph and semantic retrieval, while the dashboard provides source inspection on demand.',
  },
  execution: [
    { title: 'Acquire and discover', body: 'Validate an HTTPS GitHub owner/repository URL, download its default-branch archive, and extract with path-containment checks. Discover Python, JavaScript/JSX, TypeScript/TSX, Go, and Java source.' },
    { title: 'Count and parse', body: 'Count supported-source tokens and capture definitions, source spans, and lexical call records with Tree-sitter. Up to 32 per-file stages are active; a per-language lock serializes shared parser use.' },
    { title: 'Write and enrich', body: 'Replace the old repository scope, then write files, functions with metadata embeddings, and calls in 100-record batches. Run undirected Leiden clustering and generate labels from sampled names and paths. These batches are separate transactions.' },
    { title: 'Expose the index', body: 'Stream newline-delimited progress records; the client buffers partial lines and requires a terminal completion record. Fetch graph data after success. The graph endpoint caps query rows at 200 and leaves raw source and vectors out of the bulk payload.' },
    { title: 'Retrieve for the question', body: 'Start a fresh system/user message pair. The agent chooses tools, receives formatted observations, and can call again before answering. Metadata-vector candidates are selected globally, then filtered by repository.' },
  ],
  challenges: [
    { title: 'Connecting syntax to a usable graph', body: 'Repository exploration brings together function definitions, call relationships, and source locations. Consistent identities across parsing, storage, and lookup are central to making those views useful.' },
    { title: 'Making ingestion observable', body: 'Parsing and enriching a repository spans multiple stages. Streamed progress helps the interface communicate indexing status before the graph is ready to explore.' },
    { title: 'Combining structural and semantic retrieval', body: 'Graph queries expose relationships, while metadata embeddings find related names and paths. The two approaches support different ways of navigating unfamiliar code.' },
  ],
  decisions: [
    { title: 'Static syntax across languages', choice: 'Supported repositories span several languages. Tree-sitter extracts definitions and call syntax without running repository code.', benefit: 'One parsing pipeline supplies multi-language structure for exploration.', tradeoff: 'Syntax alone cannot resolve dynamic dispatch or runtime call targets.' },
    { title: 'Graph, vectors, and communities', choice: 'Repository questions need relationship queries and metadata-vector search. Neo4j stores both, with Leiden communities for an architectural overview.', benefit: 'One store supports relationship, semantic, and community views.', tradeoff: 'Communities are exploratory groups, not verified module boundaries.' },
  ],
  correctness: {
    introduction: 'Tests cover parser behavior, API helpers, formatting, and repository scoping.',
    evidence: [
      { label: 'Backend tests', value: '92 passed', detail: 'Parser, formatting, and repository-scoping checks.' },
      { label: 'Frontend tests', value: '13 Node tests passed', detail: 'API-helper and utility checks; the Vite production build also passed.' },
    ],
    controls: 'Input handling includes path-safe archive extraction, parameterized database queries, and raw-body HMAC verification.',
  },
  results: {
    baseline: 'Baseline: total tokens across discovered, supported source files.',
    context: 'Selected context: tokens in the tool responses returned for the query.',
    formula: 'Context reduction = (baseline − tool context) / baseline × 100',
    limits: 'This measures retrieved context size, excluding model prompts and generated answers.',
  },
  lessons: [
    { title: 'Consistent identities connect the system', body: 'Function identities link parsing, graph relationships, and source lookup. Schema design is part of retrieval design.' },
    { title: 'Separate progress from consistency', body: 'Progress reporting and index consistency solve different problems. Long-running ingestion needs both a clear status model and a deliberate data lifecycle.' },
    { title: 'Design retrieval around the question', body: 'Structure, semantic matches, and source inspection provide complementary ways to understand a repository. Choosing the right view keeps exploration focused.' },
  ],
  repository: 'Explore the parser, graph pipeline, retrieval tools, and dashboard on GitHub.',
} as const;
