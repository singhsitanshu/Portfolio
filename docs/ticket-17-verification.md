# Ticket 17 — homepage project results

Implemented October 2, 2026. Scope: homepage card hierarchy, result copy, compact contribution copy, and verification. No deployment or new benchmark runs.

Owner follow-up, October 2, 2026: removed both “I built…” contribution lines because enumerating components could imply partial ownership. “Solo project · Summer 2026” remains on both cards. Removed the unused contribution fields/style and updated the existing reading-order assertion. Build, production checks (9 passed; 2 optional preview checks skipped), and `git diff --check` passed. Direct prerender inspection confirms both lines are absent and both solo-project labels remain. The original screenshots and contribution-related observations below document the earlier implementation and are superseded for this line removal; no new browser inspection was performed for the follow-up.

## Implementation

- Both cards now follow the same document and visual order: project name/date and purpose → quantified outcome with context → solo contribution → case-study/GitHub actions → existing conceptual illustration → one useful technical highlight and stack.
- CodeGraph displays **97.5% less LLM context**, followed by **≈737K → ≈18K tokens/query; supported source vs. retrieved tool context**. The new card result consumes `codegraphFeature.result`, also used by Ticket 16's case-study summary and detailed evidence.
- TaskForge displays **15.84× worker scaling**, followed by **1 → 16 workers on synthetic 50 ms waits; local Docker benchmark**. It consumes Ticket 16's exact `taskforgeMeasurements.syntheticWait` data and rounds 15.842× to two decimals. No API-admission rate or no-op throughput is substituted for that result.
- Cards show “Solo project · Summer 2026” and one first-person contribution sentence. The contribution data lives with the existing project records in `portfolio.ts`. This is Ticket 17's required card attribution; case-study attribution and the broader Ticket 19 work are not implemented here.
- Shortened the purposes and retained one complementary highlight per project, avoiding repeated retrieval/worker explanations. Existing visuals and their “Conceptual view” captions are preserved. Both projects retain their ordering, incoming anchors, routes, and repository URLs.
- Result type is smaller than project-name type, with an accent and a short rule to make the outcome distinct. Styles are confined to the card hierarchy/result treatment; the hero and global spacing are unchanged.
- Added a production regression check for actual card reading order, visible content without disclosures, project-specific link names, and case-study destinations.

## Checks actually performed

| Check | Outcome |
| --- | --- |
| `npm run build` | Passed TypeScript, Vite client build, and route prerendering. |
| `npm run check:production` | 9 passed, 0 failed; 2 optional HTTP/Workers checks skipped without preview URLs. |
| `PREVIEW_URL=http://127.0.0.1:4176 npm run check:production` | 10 passed, 0 failed; only the optional Workers redirect check skipped because `CLOUDFLARE_PREVIEW_URL` was not supplied. Route/404 responses and production asset bytes passed. |
| `node --experimental-strip-types --test tests/navigation.test.mjs` | 2 passed, 0 failed. |
| `git diff --check` | Passed. |
| Static content and preservation comparison | Homepage prerender contains both card headlines and qualifications, matching canonical content data. Ticket 16's metrics/summaries, all case-study source files, existing project fields/order, profile, experience, and conceptual visual captions match Git HEAD. See [content-preservation.json](verification/ticket-17/content-preservation.json). |
| Responsive comparison | Inspected both cards at 1440×900, 768×1024, and 390×844. Outcomes, contributions, and actions precede illustrations in DOM and rendered position. No horizontal overflow. Project names remain larger than results. |
| 200% text | Used the existing preview's `?text=200` mode: 32 px root font. Checked both cards at all three viewport sizes. No horizontal overflow or overflowing text/link/figure containers; labels, units, contributions, and actions wrap and remain available by vertical scrolling. |
| Keyboard and links | At 390×844, normal and enlarged text: Tab proceeds through CodeGraph case study → CodeGraph GitHub → TaskForge case study → TaskForge GitHub. All four links have visible solid focus outlines. Enter on each case-study action reaches the correct H1 and matching metric summary. GitHub hrefs match the unchanged canonical repository URLs; live external repositories were not opened. |
| Anchors and headings | Direct `#codegraph`/`#taskforge` navigation focuses the named card. Existing H3 project names and H4 technical highlights retain their semantic hierarchy. |
| Reduced motion | Existing preview system-reduced-motion simulation: both results remain opaque; card transition duration is 0 seconds. |
| Browser logs | Final normal homepage check captured no warning/error entries. |

Detailed measurements, visible text, element positions, link destinations, focus sequence, and reduced-motion state are in [browser-checks.json](verification/ticket-17/browser-checks.json). The preview exited once during verification; it was restarted and the remaining checks completed successfully. No copy-email check was run because contact/clipboard behavior is unchanged. No browser test with JavaScript disabled was performed for this ticket; prerendered result presence was verified directly.

## Screenshots

[Both desktop cards](verification/ticket-17/cards-desktop.jpg) show the outcomes and actions before the illustrations.

| Card | 1440×900 | 768×1024 | 390×844 |
| --- | --- | --- | --- |
| CodeGraph | [Desktop](verification/ticket-17/codegraph-desktop.jpg) | [Tablet](verification/ticket-17/codegraph-tablet.jpg) | [Mobile](verification/ticket-17/codegraph-mobile.jpg) |
| TaskForge | [Desktop](verification/ticket-17/taskforge-desktop.jpg) | [Tablet](verification/ticket-17/taskforge-tablet.jpg) | [Mobile](verification/ticket-17/taskforge-mobile.jpg) |
| CodeGraph, 200% text | [Desktop](verification/ticket-17/codegraph-desktop-text-200.jpg) | [Tablet](verification/ticket-17/codegraph-tablet-text-200.jpg) | [Mobile](verification/ticket-17/codegraph-mobile-text-200.jpg) |
| TaskForge, 200% text | [Desktop](verification/ticket-17/taskforge-desktop-text-200.jpg) | [Tablet](verification/ticket-17/taskforge-tablet-text-200.jpg) | [Mobile](verification/ticket-17/taskforge-mobile-text-200.jpg) |

Additional captures: [enlarged mobile actions and keyboard focus](verification/ticket-17/taskforge-mobile-text-200-actions.jpg) and [reduced-motion desktop cards](verification/ticket-17/cards-reduced-motion-desktop.jpg).

## Blockers and boundaries

No missing required dependency or implementation blocker. Ticket 16 supplies the shared metric data. The optional Cloudflare Workers redirect check remains unperformed. Ticket 19's case-study attribution, Ticket 21's broader spacing/reflow pass, and Ticket 22's visual replacement remain outside this implementation. Homepage hero, career/education/contact content, résumé bytes, detailed evidence, and deployment state are unchanged.
