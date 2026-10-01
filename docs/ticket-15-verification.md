# Ticket 15 — project editorial polish

Implemented October 1, 2026. Scope: project copy, removal of obsolete rendering blocks, and internal verification notes. No deployment or future-ticket work.

## Controlling verification precedence

The owner confirms all website statistics are verified and true. This supersedes historical development notes that required public evidence warnings or questioned the CodeGraph metric. Do not restore those warnings from Tickets 03–06, 13, or 14. Preserve values, units, workload conditions, and prominence. The only removed test-count fragment is “4 skipped.” Private provenance may remain in internal records, but must not render publicly. Editorial cleanup does not assert new functionality, repaired limitations, production validation, or exactly-once execution.

## Changes

- CodeGraph: straightforward context labels and definitions; removed missing-evidence callout/data, private validation provenance and environment report; replaced challenge inventory, tradeoffs, and lessons with the ticket's bounded descriptions. Preserved the Results metric panel and existing section targets.
- TaskForge: replaced experiment bookkeeping with workload labels and concise methodology; removed chart source hashes and availability field/rendering. Consolidated synthetic/local scope next to the unchanged host specification. Kept external-effect idempotency in the tradeoff card and bounded repeat execution in Recovery. Zero-duplicate findings remain scoped to identities and recovery-state transitions.
- Homepage: shortened the two specified highlights and visual captions; preserved “Conceptual view,” diagrams, links, technologies, and project dates.
- No style, navigation hierarchy, Experience, Education, contact, or résumé-asset changes. Shared callout styles remain used by TaskForge.

## Before/after metric inventory

Every entry below is unchanged in value and meaning unless explicitly stated.

| Area | Before → after |
| --- | --- |
| CodeGraph results | ≈737K → ≈18K tokens per query; 97.5% LLM context reduction. Same prominent Results panel and formula `(baseline − tool context) / baseline × 100`. |
| CodeGraph implementation | Seven tools; three-pass graph writes; up to 32 active per-file stages; 100-record batches; 200-row cap. |
| CodeGraph tests | 92 passed and 13 Node tests passed retained; “4 skipped” and its environment explanation removed as requested. |
| No-op chart, workers 1 / 4 / 8 / 16 | 779.748 / 1284.015 / 1279.605 / 1214.429 median processing tasks/sec; 0–1400 scale. Four-worker peak remains 1,284.015 tasks/sec. |
| Synthetic 50 ms chart, workers 1 / 4 / 8 / 16 | 18.764 / 74.668 / 149.442 / 297.264 median processing tasks/sec; 0–320 scale; 15.842× speedup, 99.0% efficiency from 1 to 16 workers. |
| Workload conditions | 100 warmup tasks excluded; 5,000 no-op / 1,000 synthetic-wait tasks per trial; three independently reset blocks; 12 trials each; 60,000 / 12,000 total tasks; 3 trials per configuration captions. |
| Retry benchmark | 3,000 tasks / 6,000 attempts; three trials; 10 workers / 3 schedulers; fixed 100 ms retry/promotion; FAILED → SUCCEEDED; zero duplicate identities or stranded leases in these runs. |
| Recovery benchmark | 30 abandoned attempts replaced; three trials of 1,000 synthetic 500 ms waits; 20 workers / 3 schedulers / 10 killed owners per trial; 5-second leases; one successful replacement per captured abandoned attempt; zero duplicate recovery-state transitions. |
| Recovery timing | Median-trial p95: 36.681 ms from lease expiration to SQL-path recovery timestamp; median kill-to-final-drain: 25.271239 seconds. |
| Host | Apple M4 Pro; 12 logical CPUs; 24 GiB RAM; local Docker. |
| Runtime defaults | One handler per process; 2-second exponential backoff, 20% jitter, 300-second cap, three total attempts; 30-second lease, renewal every 10 seconds, heartbeat every 5 seconds. |
| Aggregation | Processing throughput formula, medians per trial, speedup ratio of medians, efficiency divided by worker count, independent zero-based chart scales unchanged. |
| Unrendered feature metrics | 60,000, ≈1,284, 99%, 15.84× and their existing conditions unchanged; only experiment-label prefixes removed. |

Compared content objects against Git HEAD: chart rows/scales/units, feature metric values/contexts, host, retry walkthrough/defaults, and formulas/aggregation matched exactly. Reviewed removed numeric tokens: skipped-test count, provenance dates/revisions, and the explicitly removed hypothetical 100% example; no achievement was removed.

## Verification

- `npm run build`: passed TypeScript, Vite client build, and prerendering.
- `npm run check:production`: 7 passed, 0 failed; 2 optional HTTP/Workers checks skipped because their environment URLs were not supplied. Existing tests were unchanged.
- `git diff --check`: passed.
- Scanned all three prerendered routes for private citations, historical captions/hashes, experiment IDs, missing-evidence labels, skipped-test/environment fragments, and ignored-artifact copy: none found.
- Read all three routes end to end in the browser. Inspected desktop (1280 × 900) and mobile (390 × 844) layouts, project cards, results, chart captions, and tradeoffs. No horizontal overflow, empty cards, or broken section targets found. CodeGraph's percentage and token counts remain prominent at both sizes. No browser warning/error logs during the initial route checks.
- Exercised client navigation into both case studies. Compared normalized `main.textContent` against HTML-parser extraction from prerendered output: homepage 3,217 characters / FNV-1a 2198377278; CodeGraph 6,345 / 2986204456; final TaskForge 8,952 / 3089726829. Matching fingerprints confirm identical copy. Rebuilt and checked final TaskForge recovery wording after explicitly retaining its scoped zero-duplicate finding.

No missing dependency or implementation blocker. Deployment was not performed.
