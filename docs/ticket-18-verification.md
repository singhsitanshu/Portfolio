# Ticket 18 — focused engineering tradeoffs

Implemented October 2, 2026. Scope: case-study decision copy, placement, labels, and verification. No deployment or new project benchmark runs.

## Implementation and copy review

CodeGraph's `#decisions` now follows its achievement summary, architecture, correctness/validation, and detailed results in both document and navigation order. TaskForge's `#tradeoffs` remains after benchmarks. Both sections use compact constraint/choice prose followed by labeled **Benefit** and **Accepted limitation** fields.

| Previous content | Final content and source review |
| --- | --- |
| CodeGraph: four decisions, including generic batching/resource balance and a description of separate tool/source workflows. | Two decisions: Tree-sitter static syntax across supported languages; Neo4j graph/vector retrieval with Leiden communities. The accepted limitations are unresolved dynamic/runtime call targets and exploratory communities rather than verified module boundaries. These match CodeGraph mastery notes, `07_FINAL_REVIEW.md`, “Decisions and limitations to keep paired,” and the foundations/source map. |
| CodeGraph: bounded stages/batches decision. | Removed the generic decision card. The technical walkthrough still states 32 active per-file stages, per-language parser serialization, 100-record batches, separate batch transactions, and the 200-row graph cap. Lazy source inspection remains in architecture/walkthrough. |
| TaskForge: short transactions and ownership, followed by a generic lesson. | Short claim/completion transactions keep task and attempt updates atomic while handlers run outside transactions; renewable leases maintain ownership. External-effect deduplication requires destination idempotency, explained here once. Supported by TaskForge `05-decisions-critique.md` §§16/19 and `02-database-correctness.md` §§5–8. |
| TaskForge: one durable authority, followed by a worker-count lesson. | One PostgreSQL authority coordinates independent workers/schedulers, accepting polling and shared-write pressure as concurrency rises. The source notes identify central database contention and polling cost. |
| TaskForge: priority and attempt budgets, followed by a generic policy lesson. | Descending-priority claims and a total-attempt cap favor higher-priority eligible work and bound retries/crash replacements. Sustained high-priority load can delay lower-priority tasks; fairness is not guaranteed. Supported by the source claim query and attempt-budget notes. |

The three TaskForge per-card lesson paragraphs were removed. The concise recovery execution-repeat statement remains unchanged; its accessible note label now reads “Execution boundary.” The copy adds no evaluated alternatives, historical fixes, production claims, or exactly-once promise.

Ticket 25 owns the deeper engineering stories. CodeGraph's separate `#challenges` and `#lessons` content and anchors remain unchanged. These tradeoffs describe mechanisms and accepted limitations rather than repeating a full problem/action/validation narrative. Ticket 25's candidates concern cross-layer identities, ingestion observability, retrieval workflow, competing claims, recovery, and measured scaling; no new stories were implemented here.

The full side-by-side decision copy is recorded in [copy-comparison.json](verification/ticket-18/copy-comparison.json). A comparison against the saved pre-Ticket-18 content modules confirms every field outside section navigation and decision arrays is unchanged. The complete prerendered homepage body also matches that baseline, preserving the uncommitted Ticket 17 implementation. Exact metrics, test counts, configuration, detailed evidence, recovery behavior, and repository destinations remain intact.

## Checks actually performed

| Check | Outcome |
| --- | --- |
| `npm run build` | Passed TypeScript, Vite, and static route prerendering after the final copy edit. |
| `npm run check:production` | 9 passed, 0 failed; 2 optional HTTP/Workers checks skipped without preview URLs. |
| `PREVIEW_URL=http://127.0.0.1:4176 npm run check:production` | 10 passed, 0 failed; only the optional Workers redirect check skipped. |
| `node --experimental-strip-types --test tests/navigation.test.mjs` | 2 passed, 0 failed. |
| `git diff --check` | Passed. |
| Production regression coverage | Added ordering assertions: achievements precede both tradeoff sections; CodeGraph architecture, correctness, and results precede decisions; TaskForge benchmarks precede tradeoffs. Existing heading/nav-order, unique-ID, generated-link/fragment, metadata, and prerender checks pass. |
| Browser order | CodeGraph ends with correctness → results → decisions → lessons → repository. TaskForge ends with recovery → benchmarks → tradeoffs → repository. Navigation targets match section order. Two CodeGraph and three TaskForge decision headings appear. |
| Responsive layout | Inspected both sections at 1440×900, 768×1024, and 390×844. No horizontal document overflow at any size. Desktop/tablet use two columns; mobile stacks decisions. All copy and labels remain readable; inspected TaskForge's lower mobile card by scrolling. |
| Direct fragments | `#decisions` and `#tradeoffs` load and focus the correct section. After reload at tablet/mobile sizes the target starts approximately 24 px below the viewport top. `#results` and `#benchmarks` also load during navigation checks. |
| Keyboard navigation | At 390×844, Tab from the decisions nav link goes to Engineering lessons on CodeGraph and Repository on TaskForge. Enter from a different active fragment changes to the correct decisions fragment, focuses its section, and scrolls it to approximately 24 px from the top. Visible focus outlines appear in the captures. |
| Browser logs | No warning/error entries captured for either route. |
| Preservation comparison | All non-decision case-study data and the complete homepage prerendered body match the pre-Ticket-18 baseline. |

One existing navigation behavior was observed: activating the already-current hash after scrolling elsewhere does not repeat the focus/scroll effect. `App.tsx` runs that effect only when pathname/hash changes; this file is unchanged by Ticket 18. Direct incoming fragments and navigation between different fragments resolve correctly. No router change was included.

No copy-email check was run because contact/clipboard behavior is unchanged. No browser test with JavaScript disabled was performed; complete decision copy and fragment targets were checked in prerendered HTML. The 320 px, 200% text, and reduced-motion integration pass remains Ticket 21's scope.

## Screenshots

| Project | 1440×900 | 768×1024 | 390×844 |
| --- | --- | --- | --- |
| CodeGraph | [Desktop](verification/ticket-18/codegraph-desktop.jpg) | [Tablet](verification/ticket-18/codegraph-tablet.jpg) | [Mobile](verification/ticket-18/codegraph-mobile.jpg) |
| TaskForge | [Desktop](verification/ticket-18/taskforge-desktop.jpg) | [Tablet](verification/ticket-18/taskforge-tablet.jpg) | [Mobile](verification/ticket-18/taskforge-mobile.jpg) |

Additional capture: [TaskForge lower mobile decision](verification/ticket-18/taskforge-mobile-lower.jpg).

## Blockers and boundaries

No missing required dependency or implementation blocker. Ticket 16's achievement summaries are present. The optional deployed Workers redirect check was not run because `CLOUDFLARE_PREVIEW_URL` was not supplied. Ticket 25's narrative rewrite and other future tickets remain unimplemented. Homepage hero, ownership/career/contact content, résumé, and deployment state are unchanged by Ticket 18.
