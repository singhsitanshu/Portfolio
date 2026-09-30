# Ticket 05 verification

Implemented September 30, 2026. Scope: reusable case-study framework and `/projects/codegraph` only.

## Changes

- Added a shared article header, scannable overview, on-page section navigation, semantic sections, and homepage return links.
- Replaced only CodeGraph's route placeholder. Covered problem/system, architecture, ingestion-to-context execution, challenges, decisions/tradeoffs, correctness, results, engineering lessons, and repository.
- Added a static four-layer architecture figure with text connections and a readable caption, plus a five-step ordered walkthrough. Both reflow within the foundation's existing layout and palette.
- Centralized selected manual details in `src/content/codegraph-case-study.ts`; reused existing project dates, repository URL, and reported metric. Updated source/readiness tracking and README.
- Retained the TaskForge placeholder and existing homepage features. No new dependency, backend, demo, animation pass, deployment, or future-ticket feature.

## Evidence boundaries

The attached `CODEGRAPH_MASTERY` manual describes revision `79fa7689754af893e871436a911a0c4d245c6a43`, inspected September 24, 2026. Source selections are mapped in `content-sources.md`.

The case study explains the current parser/persistence identity gap, inferred file-wide call edges, partial transactions, metadata-only embeddings, repository post-filtering, and absent source-grounding validation. Lessons are derived engineering takeaways, not claims that proposed remedies have been implemented or invented personal anecdotes.

The supplied résumé's approximate 737K → 18K tokens/query and 97.5% reduction remain explicitly reported. The page explains supported-source baseline versus concatenated tool-message context, proxy tokenization, and excluded prompts/output/repeated history. Original benchmark revision, questions, raw traces, aggregation definition, and answer scores are still missing. No accuracy, cost, latency, or universal improvement is inferred. These gaps are visible in the page and retained in the content checklist.

The manual's 92-passed/4-skipped backend tests and 13-passed Node tests are historical, attributed evidence. They are not portfolio tests or a live CodeGraph rerun. Live database/provider workflows remain unverified by that audit.

## Checks performed

- `npm run build`: TypeScript and production Vite compilation passed after final source changes.
- `node --experimental-strip-types --test tests/copy-email.test.mjs`: both existing regression tests passed.
- Production preview at 1280 × 900, 768 × 900, 375 × 812, and 320 × 700: one h1, all nine case-study sections, four architecture layers, five walkthrough steps, exact supplied CTA URLs, reported metric, and missing-evidence text present. No horizontal document overflow or out-of-bounds case-study elements.
- Direct `/projects/codegraph#architecture` loads focused the architecture section and aligned it approximately 24px from the viewport top at all four widths.
- At 1280px and 375px, Enter activated all nine table-of-contents links and focused each destination. Homepage return links landed on and focused `#codegraph`; Explore CodeGraph returned to the case study with main focused. Primary Work and About links landed on and focused their homepage sections.
- Visually inspected the desktop overview/architecture and 320px architecture text. Details and caption are in the initial DOM, with no hover, disclosure, or motion prerequisite. Case-study elements have no animation styles; the established reduced-motion configuration remains in place. OS preference emulation was not performed.
- TaskForge still rendered its existing placeholder. Browser captured no console errors during these checks.
- Screenshots: `/private/tmp/ticket05-codegraph-overview.jpg` and `/private/tmp/ticket05-codegraph-architecture.jpg`.

## Blockers

No implementation dependency or required-content blocker remains. Missing benchmark evidence is tracked and qualified as required by this ticket. No live repository-availability check, CodeGraph backend/model execution, or benchmark rerun was performed; the CTA exactly matches the user-supplied verified repository URL. Ticket 06 and subsequent tickets remain unimplemented.
