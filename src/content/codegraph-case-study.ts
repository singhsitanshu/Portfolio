// Attached CODEGRAPH_MASTERY, pinned revision 79fa768 (2026-09-24).
// Sources: 01_FOUNDATIONS §§4–13; 02_APPLICATION_AND_AUDIT §§14–27;
// 06_EVIDENCE validation/benchmark ledger; 07_FINAL_REVIEW architecture diagrams.
// These are implementation observations and derived lessons, not invented motives.
export const codegraphCaseStudy = {
  introduction: 'Explore a repository through syntax, relationships, and question-specific retrieval instead of sending all of its source to an agent.',
  overview: [
    { label: 'System', value: 'Repository-exploration prototype' },
    { label: 'Interface', value: 'React Flow graph + source drawer' },
    { label: 'Retrieval', value: 'Seven LangGraph tools over Neo4j' },
  ],
  sections: [
    { id: 'problem', title: 'The problem' },
    { id: 'architecture', title: 'System architecture' },
    { id: 'execution', title: 'From ingestion to context' },
    { id: 'challenges', title: 'Engineering challenges' },
    { id: 'decisions', title: 'Design decisions & tradeoffs' },
    { id: 'correctness', title: 'Correctness & validation' },
    { id: 'results', title: 'Results & measurement' },
    { id: 'lessons', title: 'Engineering lessons' },
    { id: 'repository', title: 'Repository' },
  ],
  problem: 'An unfamiliar repository presents two related problems: finding relevant code and understanding how it connects. A full-source prompt is large, while isolated snippets can lose caller and dependency context. CodeGraph builds a navigable structural index and lets an agent choose smaller observations for the current question.',
  system: 'A React dashboard submits a GitHub repository to FastAPI, displays a React Flow graph, and fetches source separately when a function is selected. The backend combines Tree-sitter parsing, Neo4j relationships, metadata embeddings, Leiden communities, and a Claude-powered LangGraph ReAct agent.',
  architecture: {
    title: 'Two paths through one repository index',
    layers: [
      { label: '01 / Interface', title: 'React dashboard ↔ FastAPI', detail: 'Repository submission, graph exploration, source inspection, and questions.', connection: 'Ingestion path ↓' },
      { label: '02 / Indexing', title: 'GitHub archive → Tree-sitter → ETL', detail: 'Safe temporary extraction; supported-source discovery; syntax records; three-pass graph writes.', connection: 'Persist + enrich ↓' },
      { label: '03 / Storage', title: 'Neo4j graph · vectors · communities', detail: 'Repository → File → Function; inferred CALLS edges. OpenAI name/path embeddings and sampled community labels enrich the index.', connection: 'Question path: agent ↔ tools ↔ index ↓' },
      { label: '04 / Retrieval', title: 'LangGraph ReAct ↔ Claude', detail: 'Seven tools return structure, direct callers, outgoing calls, unresolved external names, semantic matches, and community summaries. Tool observations inform the final answer.' },
    ],
    caption: 'Ingestion creates the index; questions retrieve from it. Leiden groups the Function/CALLS graph before questions are asked. Semantic search embeds the query only when that tool is selected. Source inspection is a separate dashboard endpoint, not an eighth agent tool. The agent does not automatically expand communities into source-code context.',
  },
  execution: [
    { title: 'Acquire and discover', body: 'Validate an HTTPS GitHub owner/repository URL, download its default-branch archive, and extract with path-containment checks. Discover Python, JavaScript/JSX, TypeScript/TSX, Go, and Java source.' },
    { title: 'Count and parse', body: 'Count supported-source tokens and capture definitions, source spans, and lexical call records with Tree-sitter. Up to 32 per-file stages are active; a per-language lock serializes shared parser use. File failures are isolated, so completion can still mean incomplete coverage.' },
    { title: 'Write and enrich', body: 'Replace the old repository scope, then write files, functions with metadata embeddings, and calls in 100-record batches. Run undirected Leiden clustering and generate labels from sampled names and paths. These batches are separate transactions.' },
    { title: 'Expose the index', body: 'Stream newline-delimited progress records; the client buffers partial lines and requires a terminal completion record. Fetch graph data after success. The graph endpoint caps query rows at 200 and leaves raw source and vectors out of the bulk payload.' },
    { title: 'Retrieve for the question', body: 'Start a fresh system/user message pair. The agent chooses tools, receives formatted observations, and can call again before answering. Metadata-vector candidates are selected globally, then filtered by repository. There is no persistent conversation memory or enforced source-citation contract.' },
  ],
  challenges: [
    { title: 'Syntax identity must survive storage', body: 'The parser now emits canonical IDs and lexical caller ownership, but the active writer still keys functions by repository plus simple name and assigns file-wide calls to every function. Duplicate names can merge, and false edges can contaminate source lookup, retrieval, and communities.' },
    { title: 'Progress is not a transaction', body: 'NDJSON makes a long ingestion visible, but HTTP 200 can carry a terminal error. Replacement deletes the prior scope before all enrichment finishes; later failure can leave partial graph state. The transport does not provide rollback or resumable jobs.' },
    { title: 'Compact evidence can still be wrong', body: 'Metadata embeddings describe names and paths rather than function behavior. Global top-k selection followed by repository filtering can lose relevant candidates. Direct caller queries represent one-hop graph evidence, not complete runtime impact.' },
  ],
  decisions: [
    { title: 'Tree-sitter for syntax', benefit: 'Multi-language structure without executing repository code.', tradeoff: 'Syntax captures do not resolve imports, dynamic dispatch, or every call target.' },
    { title: 'Graph, vectors, and GDS together', benefit: 'Neo4j supports relationships, semantic candidates, and community enrichment in one store.', tradeoff: 'Retrieval inherits graph inaccuracies; generated communities are exploratory groupings, not verified module boundaries.' },
    { title: 'Tools plus lazy source inspection', benefit: 'Question-specific observations and a separate source drawer keep bulk graph responses smaller.', tradeoff: 'The agent has no source tool or grounding validator; the drawer does not make its answers source-verified.' },
    { title: 'Bounded stages and batches', benefit: 'Limit active per-file work and write in finite transaction units.', tradeoff: 'Parsed results remain in memory, same-language parsing serializes, and partial commits remain visible. These limits do not prove a throughput gain.' },
  ],
  correctness: {
    introduction: 'The supplied audit establishes selected parser, API-helper, formatting, and scoping behavior. It also exposes limits that a successful build or mocked test cannot settle.',
    evidence: [
      { label: 'Backend / supplied audit', value: '92 passed · 4 skipped', detail: 'Temporary dependency overlay; TCP connections disabled. The four skipped cases require a live Neo4j database.' },
      { label: 'Frontend / supplied audit', value: '13 Node tests passed', detail: 'API helpers and utilities; no browser or component execution. The project’s Vite build also passed.' },
    ],
    boundary: 'These are the manual’s September 24, 2026 results at revision 79fa768, not tests rerun for this portfolio. Live database, ANN, GDS, model-provider, browser, and Postman workflows were not exercised in that audit.',
    controls: 'Path-safe extraction, parameterized queries, and raw-body HMAC verification are documented controls. Repository predicates are data selectors, not access control: the prototype has no authentication, and agent tool scope remains model-supplied.',
  },
  results: {
    baseline: 'Baseline = token counts summed across discovered, supported source files. Ignored or unsupported files are excluded; a file counted before a parsing failure can still contribute.',
    context: 'Selected context = concatenated tool-message text in the final agent trace, counted with a proxy tiktoken encoding. The default encoding is for gpt-4o, with cl100k_base fallback.',
    formula: 'Context reduction = (baseline − tool context) / baseline × 100',
    limits: 'This comparison excludes system/user prompts, answer tokens, and repeated history sent across model rounds. It does not measure Claude billing, total cost, latency, or answer accuracy. An answer that calls no tools can show 100% reduction while having no retrieved evidence.',
    missing: 'The supplied résumé reports these approximate counts. The manual found no reproducible run artifact: fixed repository revision, question set, raw traces, aggregation definition, and independent answer scores remain missing. Available evidence does not establish a general performance guarantee.',
  },
  lessons: [
    { title: 'Carry provenance end to end', body: 'Parser IDs and caller ownership only improve downstream answers when writers, edges, queries, and source lookup preserve them. Schema migration is part of retrieval correctness.' },
    { title: 'Publish complete snapshots', body: 'A staged index with atomic activation would protect the last complete repository view. Streaming progress alone cannot supply consistency or recovery.' },
    { title: 'Evaluate evidence alongside context size', body: 'A fixed-revision, source-labeled question set should compare retrieval variants at matched budgets and score evidence recall, grounded answers, and appropriate uncertainty. Token reduction alone is insufficient.' },
  ],
  repository: 'Explore the parser, graph pipeline, retrieval tools, and dashboard in the supplied repository. This case study describes the manual’s inspected revision; it does not claim a hosted demo or production deployment.',
} as const;
