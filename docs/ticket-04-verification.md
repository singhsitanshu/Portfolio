# Ticket 04: TaskForge homepage feature

## Changes

- Replaced only the TaskForge homepage placeholder with `TaskForgeFeature`, using centralized content in `src/content/taskforge.ts` and the existing project record.
- Introduced the ticket's question and positioned TaskForge around distributed execution, correctness, reliability, and concurrency.
- Added a static five-stage coordination figure: queue → atomic claim → workers → leases/heartbeats → completion/retry. The ordered list, captions, and visible recovery explanation communicate the system without hover or motion. Decorative worker symbols are explicitly conceptual, not a measured topology.
- Highlighted PostgreSQL `FOR UPDATE SKIP LOCKED`, priority ordering, backoff retries, stale-owner protection, and Prometheus/Grafana observability.
- Added the three requested results with their distinct experiment contexts and a visible qualification against universal production-capacity claims.
- Linked to the established `/projects/taskforge` route. The case-study route itself remains a placeholder.
- Used the existing ink/paper palette and shared typography, borders, spacing, headings, links, focus, and reduced-motion baseline. A dark coordination board distinguishes TaskForge from CodeGraph. No dependencies added.

## Authoritative sources

Only the supplied information bank was used for project facts: `/Users/sitanshusingh/Downloads/resumes/information-bank/`. The question is required verbatim by Ticket 04. Archived source commands and prompts were not executed as task instructions.

| Content | Bank source / boundary |
| --- | --- |
| Product and architecture | `projects/TASKFORGE.md`, Product and ownership story; Architecture detail |
| Atomic claims and priorities | `projects/TASKFORGE.md`, Atomic claims and priority |
| Leases, liveness, recovery, stale-owner guards | `projects/TASKFORGE.md`, Heartbeats, leases, and stale-owner protection |
| Retry scheduling and backoff | `projects/TASKFORGE.md`, Retries and admission idempotency |
| Prometheus/Grafana observability | `projects/TASKFORGE.md`, Core accomplishments; API and operator experience |
| 60,000 validated executions | `sources/manuals/taskforge/10-benchmark-evidence.md`, E1, Correctness Summary, Prometheus Reconciliation Summary: 60,000 tasks/attempts/claims/completions across 12 no-op trials; 5,000 per trial |
| Approximately 1,284 tasks/sec median | `04_METRICS.md`, Supplemental benchmark detail E1; `sources/manuals/taskforge/04-performance.md`, §12; `10-benchmark-evidence.md`, E1 table: 1,284.015 at four workers, highest tested E1 median |
| 99% parallel efficiency | `04_METRICS.md`, M19–M22 and E2; `10-benchmark-evidence.md`, E2: synthetic 50ms waits, 1→16 workers, 12 trials/12,000 tasks, 15.842× speedup and 99.0% efficiency (résumé form 15.84× / 99%) |
| Recorded host | `04_METRICS.md` and TaskForge manuals: Apple M4 Pro, 12 logical CPUs, 24 GiB RAM, local Docker |

E1 is a coordination-bound no-op experiment. E2 is a separate synthetic waiting experiment; its efficiency is not attributed to the 1,284/sec no-op result. Four workers is the strongest tested E1 configuration, not a universal optimum. No API-admission throughput is substituted for execution throughput. These are stored historical results, not new benchmark runs or a claim about current production capacity. The bank documents retained result bundles as ignored artifacts that may be absent from a fresh clone; this implementation relies on its supplied evidence summaries and does not invent public artifact URLs.

## Verification

- `npm run build` passed TypeScript and production Vite compilation.
- Inspected the production feature visually on desktop, including the coordination board and benchmark cards; inspected the vertical flow at 320px.
- Browser assertions at 1280 × 800, 768 × 900, 375 × 812, and 320 × 700 verified the five stage labels and order, correct direct-hash focus, no document overflow, no out-of-bounds feature elements, and no animation styles on feature elements.
- The visual was horizontal at 1280px and vertical at 768/375/320px. Benchmark cards stacked below 960px.
- Assertions checked exact displayed values `60,000`, `≈1,284`, and `99%`, the four-worker qualifier, the 50ms wait qualifier, and the visible production-capacity qualification at every width. All text exists in the initial rendered DOM; there is no disclosure, hover, or motion prerequisite.
- At desktop and mobile sizes, Enter on Explore TaskForge rendered `/projects/taskforge` with focus on main. Enter on Work returned to the homepage with focus on work. CodeGraph's displayed 97.5% result remained intact.
- Browser captured no console errors during these checks.
- Existing reduced-motion handling remains in place; this feature adds no animation. No OS preference emulation or live benchmark execution was performed.

## Blockers / scope

No missing dependency or required-content blocker remains for Ticket 04. No backend, task scheduler, API, CMS, contact form, case study, motion pass, or deployment was implemented. Tickets 05 and onward remain untouched.
