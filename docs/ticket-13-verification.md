# Ticket 13 verification — visual project showcases

Verified locally on September 30, 2026. Ticket 13 only; no deployment.

## Implementation

CodeGraph and TaskForge now use semantic, equal-width desktop articles that stack below 960 px. Each includes Summer 2026, a short summary, two capability highlights, technologies, and separate case-study/GitHub links near the title. Content remains centralized in the existing content layer; repository URLs come from `portfolio.ts`.

Both previews are original HTML/CSS/SVG **conceptual illustrations**, explicitly labeled. They are not product screenshots or live telemetry. CodeGraph illustrates repository structure, relationships, and focused retrieval; TaskForge illustrates queue items, workers, completion, and retry. No raster preview downloads or layout-shifting image requests were introduced. The illustrations are static; card hover/focus transitions respect existing reduced-motion preferences.

Existing project routes, individual hash targets, and `#work` remain. Ticket 14 navigation, heading, and biography changes were not implemented.

## Content preservation

Before replacing the long homepage sections, compared both feature content files with their dedicated case-study content:

| Previous homepage detail | Retained destination |
| --- | --- |
| CodeGraph repository scope, parsing, source inspection, graph relationships, Leiden communities, semantic retrieval, agent tools | CodeGraph problem/system, architecture, execution, tools, and tradeoff sections |
| CodeGraph approximate token counts and 97.5% résumé claim | CodeGraph metrics, methodology, and missing reproducible-evidence qualification |
| TaskForge durable admission, atomic claims, priority ordering, execution outside transactions | TaskForge admission and worker sections |
| TaskForge leases, heartbeats, guarded writes, bounded exponential retries, crash recovery | TaskForge lifecycle and failure sections |
| TaskForge E1/E2 counts, throughput, efficiency, local host and workload qualifications | TaskForge benchmark evidence and charts |
| Specific operational metric categories | Added throughput, latency, retries, lease recovery, and system health to the existing TaskForge architecture caption |

Capability copy replaces benchmark claims on cards. Existing benchmark evidence and limitations remain in the case studies; no new results or guarantees were added. Authoritative source provenance remains documented in `content-sources.md` and the existing content-file comments.

## Checks

- `npm run build`: passed TypeScript, Vite client/server compilation, and all static routes.
- `PREVIEW_URL=http://127.0.0.1:4177 npm run check:production`: 7 passed, 0 failed. Cloudflare-specific redirect test skipped because Wrangler was not running; deployment configuration was unchanged.
- Existing production tests were retained without weakening assertions.
- Browser checks at 360, 390, 768, and 1440 px: no horizontal overflow or overflowing showcase descendants; images loaded; display font loaded. Cards stack at the first three widths and share the desktop row.
- At 1440 px, the entire project wrapper measures **880 px**, versus **3,323 px** before. Both titles, summaries, and action pairs fit in the same 900 px section. At 390 px, the stacked wrapper measures **2,044 px**, versus **6,021 px** before.
- 200% text enlargement (32 px root font) at all four widths: no horizontal overflow or clipped descendants. Illustration parts stack where enlarged text needs more room; padding is capped to preserve reading width.
- Simulated system reduced-motion preference through the existing test harness: reduced mode active and both card transition durations 0 seconds. No new diagram animation.
- Direct `/#codegraph` and `/#taskforge` at desktop and mobile land approximately 24 px below the viewport top and focus the matching article. Tab moves to its case-study link with visible focus; Enter opens the correct route and heading.
- Each GitHub link is a separate keyboard stop with visible outline and card emphasis. Enter opened the supplied Codegraph and TaskForge GitHub repositories successfully.
- Axe 4.10.3: zero violations at all four normal-text widths. Gradient backgrounds and existing hero decoration require manual color review. New preview text contrast against the darkest/lightest gradient endpoints is at least 6.89:1 (muted), 8.67:1 (accent), and 11.44:1 (primary). This is targeted verification, not a full accessibility certification.
- `git diff --check`: passed.

Raw browser results: [browser-checks.json](verification/ticket-13/browser-checks.json).

## Before / after

Screenshots crop the complete project wrapper and include both projects. Desktop viewport: 1440 × 900; mobile: 390 × 900.

| View | Before | After |
| --- | --- | --- |
| Desktop | [Before](verification/ticket-13/before-desktop.jpg) | [After](verification/ticket-13/after-desktop.jpg) |
| Mobile | [Before](verification/ticket-13/before-mobile.jpg) | [After](verification/ticket-13/after-mobile.jpg) |

## Blockers

None. Real product screenshots were not supplied; the ticket-authorized conceptual fallback is implemented.
