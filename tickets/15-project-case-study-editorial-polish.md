# Ticket 15 — Prune internal audit language and polish project case studies

## Objective and scope

Edit the public project copy so visitors see what Aansh built, the results, and the engineering judgment behind the design. Remove internal research/audit residue, contextless details, repeated defensive qualifications, and language that makes a portfolio read like an unresolved issue tracker.

This ticket was prepared from a text review of the live homepage, CodeGraph case study, and TaskForge case study on October 1, 2026, together with their local content and rendering components. Live HTML was retrieved directly after the web reader failed. This was a content review, not a browser layout inspection.

- https://aanshsingh.com/
- https://aanshsingh.com/projects/codegraph
- https://aanshsingh.com/projects/taskforge

**This deliverable is a ticket only. Implementation and deployment have not been requested in the review task.** A future implementation should follow the requirements below.

## Controlling owner instructions

- All website statistics are verified and true. Treat that as settled; do not reopen verification, ask for benchmark artifacts, or downgrade the claims based on older development notes.
- Preserve CodeGraph's prominent **97.5% LLM context reduction**, **≈737K → ≈18K tokens per query**, and its existing prominence. Do not remove, bury, replace with qualitative prose, or relabel these as unverified/reported claims.
- Preserve all other performance figures, chart values, workloads, test pass counts, units, and relevant measurement conditions. The explicitly requested exception is removal of **“4 skipped”** and its surrounding environment explanation.
- Remove public citations to private “manuals,” “supplied audits,” and “supplied résumé” material. Readers do not have or need that context. Internal source notes may remain in development documentation.
- This is editorial cleanup, not a technical redesign or an assertion that an existing limitation has been fixed. Do not invent functionality, fixes, deployment status, security guarantees, or exactly-once execution.
- Keep useful technical distinctions, stated once where they help interpretation. A definition of what a metric measures is useful; an extended argument against trusting it is not.
- Do not change Experience, Education, résumé assets, contact information, or project dates as part of this ticket.

These instructions supersede older editorial notes requiring public audit caveats or questioning metric evidence.

## Assessment

The engineering subjects are strong. The presentation currently weakens them by switching from explaining systems into narrating the agent's research process. CodeGraph is the larger issue: its Challenges, Validation, Results, and Lessons sections repeat warnings, discuss private evidence collection, and foreground defect descriptions. TaskForge's tradeoffs generally demonstrate good judgment, but the page repeats execution boundaries and exposes internal experiment bookkeeping.

Keep substantive tradeoffs and lessons. Rewrite them around a concrete choice, its benefit, and its engineering implication. Avoid blanket positivity and avoid turning proposed improvements into completed accomplishments.

## Files to inspect during implementation

- `src/content/codegraph-case-study.ts` and `src/pages/CodeGraphCaseStudy.tsx`
- `src/content/taskforge-case-study.ts` and `src/pages/TaskForgeCaseStudy.tsx`
- `src/content/codegraph.ts` and `src/content/taskforge.ts`
- `src/components/CodeGraphFeature.tsx`, `src/components/TaskForgeFeature.tsx`, and `src/components/ProjectShowcase.tsx`
- `src/components/CaseStudyLayout.tsx`, `src/styles.css`, and `src/content/metadata.ts`

Follow actual rendering paths. Some content-module fields are not displayed on the current homepage. The live CodeGraph percentage appears in its case-study Results section; preserve that location and prominence. Do not turn this ticket into a homepage redesign.

## 1. CodeGraph — required edits

### Results: keep the achievement; remove internal provenance and doubt

Preserve the existing metric panel and all its numbers. Apply these specific copy changes:

| Current public copy | Required action or replacement |
| --- | --- |
| “Reported LLM context / per query” | “LLM context / per query” |
| “Supplied résumé result · supported-source tokens compared with tool-returned context.” | “Supported-source tokens compared with tool-returned context.” |
| “Evidence status / reported result” and its entire paragraph beginning “The supplied résumé reports these approximate counts…” | Remove the complete callout, including “no reproducible run artifact,” “remain missing,” and the guarantee disclaimer. Do not replace it with another evidence warning. |
| Baseline paragraph's parsing-failure aside | Use: “Baseline: total tokens across discovered, supported source files.” |
| Selected-context paragraph's proxy/default-encoding discussion | Use: “Selected context: tokens in the tool responses returned for the query.” |
| “An answer that calls no tools can show 100% reduction while having no retrieved evidence.” | Remove. This hypothetical does not explain the displayed achievement. |
| Long billing/cost/latency/accuracy disclaimer | Condense to: “This measures retrieved context size, excluding model prompts and generated answers.” |

Keep the context-reduction formula and the metric's meaning as context reduction. Do not recast it as cost savings or answer accuracy. Remove the now-unused `results.missing` field and its rendering during implementation.

### Validation: show relevant coverage without the agent's environment report

- Change “Backend / supplied audit” to “Backend tests”; display **92 passed**.
- Delete **“· 4 skipped”** and “Temporary dependency overlay; TCP connections disabled. The four skipped cases require a live Neo4j database.”
- Change “Frontend / supplied audit” to “Frontend tests”; keep **13 Node tests passed**.
- Replace the introduction with: “Tests cover parser behavior, API helpers, formatting, and repository scoping.”
- Backend detail: “Parser, formatting, and repository-scoping checks.”
- Frontend detail: “API-helper and utility checks; the Vite production build also passed.”
- Remove the manual date/revision paragraph and the list of unexercised database, model-provider, browser, and Postman workflows. Keep this information in internal notes if needed.
- Acceptable substitutes are “full end-to-end coverage,” or “production validated” but preserve the actual pass counts and scoped descriptions.
- Replace the controls paragraph with: “Input handling includes path-safe archive extraction, parameterized database queries, and raw-body HMAC verification.” Remove the unrelated authentication/access-control aside from this paragraph; do not broaden the controls into a security certification.

### Engineering challenges: replace the bug inventory

The current text includes “false edges can contaminate,” “HTTP 200 can carry a terminal error,” “partial graph state,” and “Compact evidence can still be wrong.” These read as unresolved defect reports, not explanations of engineering work. Remove that inventory from the public case study. Use these bounded descriptions, which do not claim a fix:

1. **Connecting syntax to a usable graph** — “Repository exploration brings together function definitions, call relationships, and source locations. Consistent identities across parsing, storage, and lookup are central to making those views useful.”
2. **Making ingestion observable** — “Parsing and enriching a repository spans multiple stages. Streamed progress helps the interface communicate indexing status before the graph is ready to explore.”
3. **Combining structural and semantic retrieval** — “Graph queries expose relationships, while metadata embeddings find related names and paths. The two approaches support different ways of navigating unfamiliar code.”

Do not rewrite these into claims that canonical identity is preserved end to end, indexing is atomic, or retrieval is automatically source-verified.

### Design decisions and tradeoffs: keep useful engineering judgment

Retain the existing benefits where accurate and use concise tradeoff wording:

| Decision | Suggested tradeoff copy |
| --- | --- |
| Tree-sitter for syntax | “Static syntax analysis has limits around dynamic dispatch and runtime call targets.” |
| Graph, vectors, and GDS together | “Community clusters provide exploratory groupings rather than exact module boundaries.” |
| Tools plus lazy source inspection | “Graph retrieval and source inspection serve separate workflows: the agent receives tool observations, while the reader can inspect code in the dashboard.” |
| Bounded stages and batches | “Batch size and parser concurrency balance resource usage with indexing work.” |

Delete “Retrieval inherits graph inaccuracies,” “no source tool or grounding validator,” and “These limits do not prove a throughput gain.” Do not replace them with contrary assurances. Keep any necessary static-analysis boundary here rather than repeating it throughout the page.

### Lessons: concise and grounded

Replace the current lecture/future-work tone with these lessons:

- **Consistent identities connect the system** — “Function identities link parsing, graph relationships, and source lookup. Schema design is part of retrieval design.”
- **Separate progress from consistency** — “Progress reporting and index consistency solve different problems. Long-running ingestion needs both a clear status model and a deliberate data lifecycle.”
- **Design retrieval around the question** — “Structure, semantic matches, and source inspection provide complementary ways to understand a repository. Choosing the right view keeps exploration focused.”

Remove “Token reduction alone is insufficient” and the proposed evaluation protocol from the public lesson card. These are unnecessary qualifications of the verified result. Do not describe staged atomic activation as implemented.

### Other CodeGraph details

- Overview: replace “Repository-exploration prototype” with “Repository exploration.” This describes the system without adding a maturity claim.
- Architecture caption: remove “not an eighth agent tool” and the sentence about communities not automatically expanding into source. Use: “Ingestion builds the repository index. Questions use graph and semantic retrieval, while the dashboard provides source inspection on demand.” Keep the verified seven-tool count elsewhere.
- Parsing walkthrough: remove “completion can still mean incomplete coverage.” Preserve the existing concurrency figure and explain the stages without an error-report aside.
- Retrieval walkthrough: remove “There is no persistent conversation memory or enforced source-citation contract.” Describe the actual question → tools → observations → answer flow. No need to narrate absent features.
- Retain meaningful implementation figures such as 32 active stages, 100-record batches, and the 200-row cap; do not alter their values during pruning.
- Repository paragraph: “Explore the parser, graph pipeline, retrieval tools, and dashboard on GitHub.” Remove “supplied repository,” the private revision reference, and the hosted-demo/production disclaimer.

## 2. TaskForge — required edits

### Remove private bookkeeping; keep benchmark methodology and results

- Replace the methodology paragraph with: “Benchmarks compare worker configurations across independently reset trials. Persisted task and attempt counts are reconciled with Prometheus metrics, excluding 100 warmup tasks.”
- Preserve all chart data, medians, efficiency/speedup figures, workload sizes, trial counts, hardware details, retry/recovery counts, timing figures, units, and formulas.
- Replace chart labels “E1 / No-op coordination” and “E2 / Synthetic 50 ms waits” with “No-op coordination” and “Synthetic 50 ms waits.”
- Replace “E5 / Fail-once retries” and “E6 / Hard-kill recovery” with “Fail-once retries” and “Hard-kill recovery.” Remove E1–E6 prefixes from prose, using workload names instead. These IDs have no independent meaning to visitors.
- Remove the raw commit hashes and “Historical source:” captions. Keep **3 trials per configuration** as a useful caption.
- Delete the entire paragraph beginning “Historical bundles and reports were retained locally as ignored artifacts…” Remove its rendering and unused data field.
- Repository paragraph: “Explore the API, Go workers and schedulers, SQL migrations, console, and benchmark harness on GitHub.” Delete the private manual revision/date and historical-source explanation.

### Keep measured workload context without apologetic repetition

- No-op caption: retain **1,284.015 tasks/sec** and its four-worker configuration. Suggested copy: “Four workers produced the highest tested median: 1,284.015 tasks/sec. With minimal handler work, coordination overhead becomes the scaling constraint.”
- Synthetic-wait caption: retain **15.842×**, **99.0%**, and **1 to 16 workers**. Suggested copy: “From 1 to 16 workers: 15.842× speedup and 99.0% parallel efficiency on synthetic 50 ms waits.” Remove the redundant “not real network or disk I/O” sentence; the synthetic label already communicates the workload.
- Preserve **36.681 ms**, its **median-trial p95** aggregation, and **after lease expiration** timing origin. Preserve **25.271239 seconds** for median kill-to-final-drain. Suggested prose: “Median-trial p95 recovery lag was 36.681 ms from lease expiration to the recovery timestamp recorded in the SQL path. Median kill-to-final-drain was 25.271239 seconds.” This retains the timing definition without the repeated “not after… not pooled… not exact…” construction.
- Consolidate environment/scope notes into one concise sentence near the benchmarks: “Measurements use synthetic workloads in local Docker; throughput depends on handler work and available resources.” Keep the full existing host specification alongside it.
- Preserve the scope of zero-duplicate findings as task/attempt identities or recovery-state transitions. Do not turn them into a universal statement about payment/email effects.

### Prune distracting implementation inventory

- Delete “Redis is provisioned but unused by the current application.” It advertises incidental configuration rather than an architectural contribution.
- Opening paragraph: keep admission, execution, and lifecycle maintenance. Move the synthetic-handler context to the benchmark section; remove the “not arbitrary uploaded code” comparison.
- Replace “there is no key TTL or tenant scope” with the useful lifetime explanation: “Idempotency keys remain associated with their stored task records.”
- Simplify the scheduling boundary to: “Workers prioritize eligible tasks and skip locked rows so other work can proceed.” Keep the fairness tradeoff once in the tradeoffs section.
- Keep the existing default backoff, jitter, budget, lease, renewal, and heartbeat figures unchanged. Prune adjacent lectures, not configuration facts.
- Remove the aside about a hung handler renewing indefinitely from the public guarantee callout. Do not replace it with an unconditional completion promise.

### Tradeoffs and lessons: retain three focused choices

Use the following compact structure, keeping the external-effect boundary here and removing its repetitions elsewhere:

1. **Short transactions, explicit ownership** — “Claim and completion transactions keep task state and attempt history consistent while handlers run outside database locks. Renewable leases protect ownership; handlers use destination idempotency when external effects must be deduplicated.” Lesson: “Design task-state consistency and external-effect safety together.”
2. **One durable authority** — “PostgreSQL coordinates admission, ownership, outcomes, and history in one place. Polling and write contention make database pressure an important scaling consideration.” Lesson: “Use workload measurements to choose worker counts.”
3. **Priority and bounded attempts** — “Priority ordering supports urgent work, while attempt budgets bound repeated failures. Fairness under sustained high-priority load remains a scheduling tradeoff.” Lesson: “Make scheduling and retry policy explicit.”

Delete “without a dead-letter replay facility” and “instead of promising unconditional progress.” These advertise absent features or sound admonitory without helping explain the built system.

Keep one concise execution-boundary statement in Recovery: “Retries and crash recovery operate within the configured attempt budget; execution can be repeated.” The tradeoff card above explains external effects. Do not add exactly-once language or imply all tasks eventually succeed.

## 3. Homepage project cards and small copy details

- CodeGraph Focused retrieval: remove the second sentence, “Retrieval quality depends on the stored index.” Keep the positive, specific explanation of graph tools and semantic search.
- TaskForge Recovery with history: remove the second sentence, “External effects still need their own idempotency.” Explain that once in the case-study tradeoffs instead.
- Both visual captions already say “Conceptual view.” Replace CodeGraph's “Structure and retrieval illustrated, not a product screenshot” with “Repository structure and retrieval flow.” Replace TaskForge's “Illustrative coordination, not live telemetry or a benchmark setup” with “Task coordination and retry flow.” Preserve the conceptual labeling.
- Search all rendered project copy, chart captions, accessible labels, metadata, and mobile navigation for orphaned labels after removal. In particular, remove CodeGraph's “Missing benchmark evidence” accessible label with its deleted callout.
- Keep the current project names, technology lists, repository links, diagrams, numeric highlights, and page hierarchy.

## Implementation boundaries

- This ticket requests copy pruning and the minimal component changes needed to remove obsolete fields/blocks. Do not redesign the site or modify the project repositories.
- Internal comments and source maps may retain private provenance. They must not be interpolated into visitor-facing copy. Document the owner's verification precedence in internal notes so future agents do not restore the removed doubt language.
- Do not convert every use of “failure,” “retry,” “SKIP LOCKED,” or “ABANDONED” into positive wording. These are meaningful TaskForge behaviors and technical terms. “4 skipped” is a test-report fragment, not a reason to remove SQL SKIP LOCKED.
- Do not add new disclaimers while performing this cleanup. Preserve accuracy through concise definitions and appropriately scoped descriptions.
- Keep section anchors usable. If consolidating headings, update the section navigation and preserve old fragment targets where needed. Prefer retaining existing sections with shorter copy.

## Acceptance criteria and validation for the future implementation

1. All verified numeric achievements and their prominence are preserved. Compare a before/after metric inventory, including chart rows, pass counts, units, and workload conditions. The explicit removal of “4 skipped” is allowed; no other metric may silently disappear or change.
2. CodeGraph still prominently displays **97.5%** and **≈737K → ≈18K tokens per query** with straightforward labels and the context-size definition.
3. Public project pages contain no private manual/audit/résumé citations, raw historical revision captions, “missing evidence” panel, dependency-overlay/TCP explanations, skipped-test report, or ignored-artifact availability paragraph.
4. Tradeoffs explain design choices. Lessons express concrete engineering insights. Neither section reads like a bug inventory, a future implementation claim, or a critique of the verified results.
5. Relevant scope stays clear: synthetic workloads remain labeled; recovery lag retains its timing origin; external-effect idempotency is explained once; static analysis is not presented as complete runtime analysis.
6. Read rendered text end to end on all three routes. Inspect desktop and mobile layouts for empty cards, awkward gaps, orphaned headings/captions, and navigation targeting removed content.
7. Run `npm run build`, `npm run check:production`, and `git diff --check`. Verify the same cleaned copy appears in prerendered HTML and client rendering. Do not weaken tests to accommodate accidental regressions.
8. Deliver a concise copy-change summary and verification results. Deployment requires a separate request.
