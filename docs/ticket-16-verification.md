# Ticket 16 — case-study results first

Implemented October 2, 2026. Scope: the shared case-study result summary, its content/API, section associations, and verification. No deployment or new benchmark runs.

## Changes

- Both case-study headers now present a static, compact “Measured results” summary immediately after the introduction and before the technical overview and section navigation.
- CodeGraph reuses `codegraphFeature.result` for 97.5% LLM context reduction, ≈737K → ≈18K tokens per query, and the supported-source/tool-returned-context definition. A visible scope line excludes prompts/answers and distinguishes this measurement from accuracy, billing, and latency. The descriptive evidence link preserves `#results`.
- TaskForge shares exact canonical measurements between the new summary and existing detailed charts/captions. The summary rounds 15.842× to 15.84× for scaling from 1 to 16 workers on synthetic 50 ms waits, and 1,284.015 tasks/sec to ≈1,284 no-op tasks/sec at four workers. “Local Docker benchmarks” appears beside the two separate workload measurements. The descriptive evidence link preserves `#benchmarks`.
- The shared summary data type lives in `src/content/case-study.ts`. The shared header also accepts an optional compact `ownership` line after the summary. Ticket 19 has not been implemented here; neither route supplies that line yet. This API support is the ownership-related scope explicitly requested by Ticket 16 and does not block the summaries.
- The new summary has its own `#result-summary` anchor on each page. Section navigation starts with that summary, then follows the existing detailed sections in their document order. Both pages associate headings and bodies by stable section IDs instead of array positions.
- Added styles only for the summary/optional ownership line. Preserved the existing full result panels, detailed benchmark order, homepage, and global spacing.
- Added a production regression check for summary placement, distinct evidence targets, unique IDs, section/heading associations, and navigation/document order.

## Checks performed

| Check | Actual result |
| --- | --- |
| `npm run build` | Passed TypeScript, Vite client compilation, and all route prerenders. |
| `npm run check:production` | 8 passed, 0 failed; 2 optional HTTP/Workers checks skipped without preview URLs. |
| `PREVIEW_URL=http://127.0.0.1:4176 npm run check:production` | 9 passed, 0 failed; only the optional Workers redirect check skipped because `CLOUDFLARE_PREVIEW_URL` was not supplied. HTTP route/404 responses and asset bytes passed. |
| `node --experimental-strip-types --test tests/navigation.test.mjs` | 2 passed, 0 failed. |
| `git diff --check` | Passed. |
| Detailed-content comparison against Git HEAD | CodeGraph's detailed source and existing feature object, TaskForge's complete detailed content object and existing feature object match exactly. This retains chart precision/captions, all scope definitions, 92/13 CodeGraph test counts, and scoped TaskForge retry/recovery counts. See [comparison record](verification/ticket-16/content-preservation.json). |
| Browser route tops and destinations | Inspected both routes at 1440×900, 768×1024, and 390×844. No horizontal overflow; the percentage/scaling result precedes technical content. At narrow widths, TaskForge's separate measurements stack with their labels and conditions. |
| Headings, IDs, and keyboard links | One H1 followed by the summary H2 and existing section H2s. IDs are unique. Tab from “Back to projects” reaches the summary evidence link with a visible solid focus outline. Enter reaches/focuses `#results` or `#benchmarks` at approximately 24 px from the viewport top at all three sizes. The new navigation link reaches/focuses `#result-summary`. |
| Existing direct fragments | Fresh navigation to CodeGraph `#results` and TaskForge `#benchmarks` reaches and focuses the intended detailed sections. |
| Reduced motion | Used the existing preview's system-reduced-motion simulation on both mobile routes. `data-motion="reduced"`; summaries remain fully opaque, with no transform and all qualifications visible. |
| No hydration | Used a temporary loopback preview with the HTTP policy `script-src 'none'`; verified that policy on both responses. Both summaries remain readable and their native evidence links reach/focus the detailed sections. See [static-preview record](verification/ticket-16/static-preview-check.json). |
| Normal hydrated route browser logs | No captured warning/error entries on the final normal-route check. |

Browser measurements, heading order, summary text, focus/fragment positions, reduced-motion state, and detailed chart values are recorded in [browser-checks.json](verification/ticket-16/browser-checks.json). These checks verify the portfolio presentation; they do not rerun the projects' historical benchmarks/tests. No copy-email check was run because this ticket does not change clipboard/contact behavior. The 320 px/200% enlargement integration pass remains Ticket 21's scope.

## Screenshots

All screenshots are local verification artifacts. Header images record the initial route top; the additional summary images show the complete summary and adjacent overview when the header extends beyond a narrow viewport. Detailed images record the existing evidence destinations without reordering their contents.

| Route | Header | Detailed destination | Complete narrow summary |
| --- | --- | --- | --- |
| CodeGraph, 1440×900 | [Header](verification/ticket-16/codegraph-header-desktop.jpg) | [Results](verification/ticket-16/codegraph-results-desktop.jpg) | — |
| TaskForge, 1440×900 | [Header](verification/ticket-16/taskforge-header-desktop.jpg) | [Benchmarks](verification/ticket-16/taskforge-benchmarks-desktop.jpg) | — |
| CodeGraph, 768×1024 | [Header](verification/ticket-16/codegraph-header-tablet.jpg) | [Results](verification/ticket-16/codegraph-results-tablet.jpg) | [Summary](verification/ticket-16/codegraph-summary-tablet.jpg) |
| TaskForge, 768×1024 | [Header](verification/ticket-16/taskforge-header-tablet.jpg) | [Benchmarks](verification/ticket-16/taskforge-benchmarks-tablet.jpg) | [Summary](verification/ticket-16/taskforge-summary-tablet.jpg) |
| CodeGraph, 390×844 | [Header](verification/ticket-16/codegraph-header-mobile.jpg) | [Results](verification/ticket-16/codegraph-results-mobile.jpg) | [Summary](verification/ticket-16/codegraph-summary-mobile.jpg) |
| TaskForge, 390×844 | [Header](verification/ticket-16/taskforge-header-mobile.jpg) | [Benchmarks](verification/ticket-16/taskforge-benchmarks-mobile.jpg) | [Summary](verification/ticket-16/taskforge-summary-mobile.jpg) |

Additional captures: [TaskForge detailed charts on mobile](verification/ticket-16/taskforge-charts-mobile.jpg), [CodeGraph reduced motion](verification/ticket-16/codegraph-reduced-motion-mobile.jpg), [TaskForge reduced motion](verification/ticket-16/taskforge-reduced-motion-mobile.jpg), [CodeGraph with JavaScript blocked](verification/ticket-16/codegraph-no-js-mobile.jpg), and [TaskForge with JavaScript blocked](verification/ticket-16/taskforge-no-js-mobile.jpg).

## Blockers and boundaries

No implementation blocker or missing required dependency. The optional Cloudflare Workers redirect check remains unperformed; no preview URL was supplied. Deployment was not requested or performed. Existing user edits to ticket documents and `docs/content-sources.md` were preserved.
