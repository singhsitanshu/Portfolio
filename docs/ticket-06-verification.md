# Ticket 06 verification

Implemented September 30, 2026. Scope: TaskForge case study only, using the Ticket 05 shared layout.

## Changes

- Replaced `/projects/taskforge` placeholder with a static case study. Reused the shared article header, overview, section navigation, reading layout, and homepage return links without refactoring those components.
- Added a three-layer architecture figure with readable text relationships and caption; explained FastAPI admission, PostgreSQL authority, Go workers/schedulers, and operational telemetry. Redis is identified as provisioned but unused.
- Covered optional keyed admission, canonical fingerprints, priority/`FOR UPDATE SKIP LOCKED` claims, short transactions, guarded outcomes, durable numbered attempts, lease renewal versus heartbeat, retry budgets/backoff, and crash recovery.
- Added separate ordered success/retry walkthroughs and explicit execution/effect boundaries. No exactly-once execution, universal fairness, or unconditional progress claim.
- Added two static bar charts with exact E1/E2 medians, workers, tasks/sec units, separate zero-based axes, workload captions, historical source revisions, and trial counts. Added E5/E6 retry/recovery evidence, measured configuration, timing definitions, methodology, limitations, and engineering tradeoffs/lessons.
- Centralized details in `src/content/taskforge-case-study.ts`, reused the existing date/URL and recorded host text, and updated README/source/readiness records. Added only scoped TaskForge chart/walkthrough styles. No new dependency.

## Sources and boundaries

Attached manual: `/Users/sitanshusingh/Documents/TaskForge/engineering-mastery/`, revision `ecbb2fe6152428e98b148139b9820356a2fee07b` dated September 3, 2026. Selection map: `content-sources.md`.

E1/E2 charts reproduce the supplied historical tables, not a fresh benchmark. E1: 12 trials × 5,000 no-op tasks, 60,000 total. E2: 12 trials × 1,000 synthetic 50 ms waits, 12,000 total. Three reset blocks at 1/4/8/16 worker processes on Apple M4 Pro, 12 logical CPUs, 24 GiB RAM, local Docker. Processing throughput uses durable attempt timing; speedup and efficiency retain their aggregate-median definitions. Different chart scales are explicitly stated and labeled.

E5: 3,000 tasks/6,000 ordered attempts at 10 workers/3 schedulers with fixed 100 ms retry/promotion settings. E6: 30 captured abandoned attempts replaced across three trials, 20 workers/3 schedulers, 5-second leases. Its 36.681 ms median-trial p95 starts at lease expiration, not process death; timestamp semantics and 25.271239-second median kill-to-drain are stated. Zero duplicates refers to tested history/recovery transitions, not arbitrary remote side effects.

Ignored raw bundles/reports may be absent from a fresh clone. Public artifact availability, multi-host scaling, production capacity, and remote-effect deduplication are not established by this supplied evidence. Gaps remain in the content checklist and on the page. No manual commands, TaskForge backend services, new workloads, benchmark trust evaluators, or project test suites were executed for this portfolio ticket.

## Checks performed

- `npm run build`: TypeScript and production Vite build passed.
- `node --experimental-strip-types --test tests/copy-email.test.mjs`: both existing regression checks passed.
- Production browser checks at 1280 × 900, 768 × 900, 375 × 812, and 320 × 700: correct page title, one h1, eight sections, three architecture layers, and two three-step execution paths. No document overflow or out-of-bounds case-study elements.
- At all four widths, exact chart values matched the manual; rendered bar proportions matched their 1400/320 tasks/sec scales. Units, worker labels, captions, historical source IDs, and repository URL were present. Both CTAs exactly matched `https://github.com/singhsitanshu/TaskForge`.
- Direct `/projects/taskforge` loaded independently. Direct `#system` loads focused/aligned the section at all widths; direct `#execution` and `#benchmarks` loads focused/aligned the section at desktop and mobile widths.
- At 1280px and 375px, Enter on all eight section links focused the destination. Return links landed on and focused homepage `#taskforge`; Explore TaskForge returned to the page with main focused. Primary Work/About links focused their homepage targets; the skip link focused main.
- Inspected desktop overview/chart and 320px architecture/chart screenshots. Chart values and explanations are available without hover or motion; decoration is hidden from assistive technology while exact values and units remain textual. Case-study elements have no animation styles; existing reduced-motion handling remains. No OS preference emulation was performed.
- CodeGraph regression inspection: nine sections, results hash focus, title, and 97.5% result intact. Browser captured no console errors during checks.
- A browser auto-review timed out once, without a safety rejection; the permitted single retry succeeded and all verification completed.
- Screenshots: `/private/tmp/ticket06-taskforge-overview.jpg`, `/private/tmp/ticket06-taskforge-benchmarks.jpg`, `/private/tmp/ticket06-taskforge-mobile-chart.jpg`.

## Blockers / scope

No required-content or implementation dependency blocker remains. External repository availability was not checked; the CTA matches the user's supplied URL. Ticket 07 and subsequent tickets remain unimplemented. The CodeGraph page, homepage features, shared architecture, backend exclusions, and deployment scope remain unchanged.
