# Ticket 14 verification

September 30, 2026. Implemented locally; no deployment.

## Result

Homepage order is Introduction → Projects → Experience → Education → Contact. The primary navigation exposes the four named sections, with Resume as a separate utility. Mobile uses visible wrapping links rather than a hidden menu. GitHub and LinkedIn remain in the hero and are also available in the shared footer.

Projects has an H2; project names are H3 and their capability labels H4. Experience uses one aligned, chronological timeline. Education is a compact college card with one robotics activity. Content remains centralized in `portfolio.ts`.

See [the résumé source map and final website copy](ticket-14-content-map.md) for selected contributions, exact titles/dates, classification decisions, and the complete old/new anchor mapping. The new source adds RRISD and changes robotics from a month-specific start to `2025 – Present`. No old role was dropped; robotics moved to Education. There are no fallback career or degree facts and no unsupported employment classification. The public résumé PDF is unchanged.

## Automated checks

- `npm run build`: passed TypeScript, Vite, and prerendering for all routes.
- `PREVIEW_URL=http://127.0.0.1:4177 npm run check:production`: **8 passed, 0 failed, 1 skipped**. The skipped test requires the Cloudflare runtime; deployment settings were not changed.
- `node --experimental-strip-types --test tests/copy-email.test.mjs tests/navigation.test.mjs`: **4 passed** (two clipboard tests and two navigation tests).
- Added production assertions for section order, unique IDs, canonical and legacy anchors, focusability, H2/H3 structure, selected career content, shared navigation, and retained résumé links. Existing internal-link, asset, metadata, and résumé-byte assertions remain intact. Updated the not-found link expectation to its new “View Projects” label.
- `git diff --check`: passed. No public résumé asset changes.

## Browser checks

Local production bundle checked in the in-app browser:

- **360, 390, 768, 1440 px**, normal and **200% text**: no page overflow or overflowing navigation/timeline/education descendants. Fonts loaded before inspection. The timeline switches to one column when enlarged text needs the width.
- Axe 4.10.3: **zero violations in all eight width/text combinations**. Existing hero/project gradients still need manual contrast review; the new navigation, timeline, and education produced no incomplete contrast findings. This is targeted testing, not full accessibility certification.
- **56 anchor checks**, all passed: initial loads and same-document changes for all four canonical sections, both project cards, and both aliases; canonical header navigation and legacy URLs from each case-study route at desktop and mobile widths.
- `#work` lands on and focuses `#projects`; `#about` lands on and focuses `#introduction`. Native alias focus is explicitly forwarded to the containing named section, covering same-document browser fragment navigation as well as router effects. Requested fragments/history entries remain intact. Legacy native IDs also remain in prerendered HTML.
- Keyboard Tab exposes visible focus, Enter activates navigation, hero View Projects reaches Projects, and browser Back/Forward returns focus to Experience/Education. No menu or hidden mobile controls are needed.
- Both case-study cards opened the correct pages. Their renamed return links reached and focused Projects.
- Email link retains the preferred address. Copy email displayed its success status; clipboard success, denied, and unsupported paths also passed the unit suite. This did not independently inspect the native clipboard contents.
- Resume remains available in the header and hero; the static PDF route and bytes passed HTTP/asset tests. Social URLs were inspected in hero/footer. Project repository URLs remain unchanged.
- Simulated system reduced motion through the existing test harness correctly selected reduced mode at every enlarged-text width. No animation was added to the timeline or education card.
- No browser console warnings/errors were recorded.

At 1440 px, Experience is approximately 857 px high and Education 653 px. At 390 px they are approximately 1,097 px and 630 px respectively. Education is shorter, and robotics is described only once.

Raw results: [browser-checks.json](verification/ticket-14/browser-checks.json).

## Screenshots

| View | Navigation | Experience and Education |
| --- | --- | --- |
| Desktop, 1440 × 900 viewport | [Navigation](verification/ticket-14/navigation-desktop.jpg) | [Full sections](verification/ticket-14/career-desktop.jpg) |
| Mobile, 390 × 900 viewport | [Navigation](verification/ticket-14/navigation-mobile.jpg) | [Full sections](verification/ticket-14/career-mobile.jpg) |

## Limits / blockers

No implementation blockers. A separate attempt to inspect `https://aanshsingh.com/` through the web tool returned “not accessible via this tool”; this does not establish a DNS or site outage. Verification above applies to the local built output. No live-site changes were made.
