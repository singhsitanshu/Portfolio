# Ticket 08 — Responsive and accessibility verification

Verified September 30, 2026 against the production build. Scope is Ticket 08 only; project copy, authoritative facts, content sources, route architecture, and Ticket 07 motion behavior are retained. No future ticket work or production dependencies were added.

## Changes and verified issues

- Replaced the homepage's nested complementary landmark with a named selected-work navigation landmark. Retained its visual layout and project links.
- Changed the two case-study evidence/guarantee asides to named notes. Their qualifications remain in reading order, without nested complementary landmarks.
- Gave the TaskForge benchmark group an explicit group role so its accessible name is supported.
- Fixed overflow under 200% text enlargement: text may wrap within available space, grid/flex children can shrink, narrow diagram text tracks use `minmax(0, 1fr)`, project-index padding reduces on small screens, and chart labels may wrap. Content is not clipped or hidden to conceal overflow.
- Increased the home wordmark and small navigation links to targets of at least 44 × 44 CSS pixels. Preserved the wordmark spacing and selected-work text color after the semantic changes.
- Changed the motion button boundary from the decorative rule color to the existing accent color for adequate control contrast.
- Retained the existing skip link, route/hash focus handling, native actions, and polite atomic copy-email feedback; verification found no additional behavior fix necessary.
- Added an opt-in axe audit and text-enlargement mode to the existing test-only preview server. Neither is shipped in `dist`.

## Automated checks

`npm run build` passed TypeScript and Vite. `node --experimental-strip-types --test tests/copy-email.test.mjs` passed both existing tests (exact successful copy and rejection/unsupported fallback).

axe-core **4.10.3**, installed temporarily outside the repository, scanned WCAG 2 A/AA, WCAG 2.1 A/AA, WCAG 2.2 AA, and best-practice rules. The scan ran on rendered production assets after React mounted. System-reduced simulation kept decorative movement static for repeatable scans.

| Route | 320 × 900 | 768 × 900 | 1280 × 900 | Passed rules per scan |
| --- | --- | --- | --- | --- |
| `/` | 0 violations | 0 violations | 0 violations | 42 |
| `/projects/codegraph` | 0 violations | 0 violations | 0 violations | 43 |
| `/projects/taskforge` | 0 violations | 0 violations | 0 violations | 43 |
| unmatched route (`/not-found`) | 0 violations | 0 violations | 0 violations | 34 |

The initial scan found `landmark-complementary-is-top-level` on the homepage and both project pages. These findings were resolved. The initial benchmark-group `aria-prohibited-attr` review item was resolved by its group role. The final header styling was rechecked at 320px with zero violations.

Remaining axe **incomplete**, rather than violation, results were manually reviewed:

- Homepage color-contrast review: decorative hero arrow, agent glyph, context arrow, claim/lease glyphs, and retry glyph.
- CodeGraph color-contrast review: decorative context arrow.
- Each is `aria-hidden="true"`; stage descriptions and the context comparison's spoken “to” provide the meaning. Their ink/accent/muted/paper/rule colors have adequate contrast on their respective light/dark surfaces. No essential meaning relies on these glyphs. No unexplained incomplete finding remains.

Text contrast checks using sRGB luminance: ink/paper **13.15:1**, muted/paper **5.60:1**, accent/paper **6.88:1**, muted/surface **6.05:1**, rule/ink **9.13:1**, paper/ink **13.15:1**. The accent motion-button boundary and focus outline contrast against paper is **6.88:1**. Decorative divider contrast is not used as the control-boundary criterion.

## Responsive and enlargement checks

- All three content routes had `documentElement.scrollWidth === innerWidth` at **320, 375, 390, 640, 768, 960, 961, 1024, 1280, 1440, and 1920px**. The unmatched route also passed at 320, 768, and 1280px.
- The normal Vite production preview, without test-script injection, passed all four routes at 320, 768, and 1280px. Route titles, one main landmark, and one page heading remained present. No browser errors were observed.
- Initial 200% text enlargement at 320px produced page widths of 530px (home), 432px (CodeGraph), and 452px (TaskForge). After the fixes, all four routes passed at **320, 640, and 1280px**, with no horizontally overflowing main descendants.
- `?text=200` sets the root font to 32px (200% of the default 16px). At **640 × 450**, every enabled action on all four routes remained reachable by Tab, inside the horizontal viewport, and visibly focused. Axe also reported zero violations in this enlarged state.
- The 640 × 450 viewport separately represents the effective CSS viewport of a 1280 × 900 window at 200% page zoom. Enlarged text and reduced viewport checks are proxies; they are not native browser zoom. See limits below.
- Visual inspection covered narrow navigation, hero, project index, vertically arranged stages, architecture panels, TaskForge charts, captions, and enlarged chart typography. Stages, metrics, and explanatory content remain present without hovering.

## Interaction and accessibility checks

- Desktop Tab traversal reached all enabled actions in reading order: 18 homepage, 21 CodeGraph, 20 TaskForge, and 9 unmatched-route actions, including the skip link. Each action displayed the 3px focus outline and scrolled into view. Focus could leave the last control; no trap was found.
- Enter on the skip link focused `main` at 320 and 1280px.
- Enter activated every case-study section link at both widths and focused the corresponding section. Work/About from both case studies landed on and focused the correct homepage target. Direct homepage hashes for work, about, both projects, and contact also passed. End-of-document targets stayed visible when they could not scroll all the way to the top.
- Narrow-screen pointer activation passed the hero work action, both project-index links, both case-study entry links, every section link, project return links, Work/About, the home wordmark, copy email, motion toggle, and unmatched-route return action. All visible homepage/header/footer controls measured at least 44px in both dimensions. No action is hover-only.
- Successful keyboard copying displayed “Email copied to clipboard.” and the browser clipboard matched the preferred email exactly. The prior browser clipboard state was restored after verification. Denied and unsupported APIs displayed the usable select/copy or email-link fallback at 320 and 1280px; the button became enabled again, feedback did not overflow, and the status retained `aria-live="polite"` and `aria-atomic="true"`. Pointer activation also passed the denied case.
- Enter/Space activated native controls. Space on Reduce motion selected the reduced mode and persisted across reload; toggling back restored full mode. Pointer toggling also passed. System-reduced simulation selected static mode and disabled the override control; homepage sequences exposed completed steps 5 and 6. Narrow mobile sequences are static. Content remains visible in each mode.
- Every route has one main landmark and h1; no heading-level skips were found. Primary, selected-work, and case-study navigation names are distinct. Links and buttons have meaningful names and native semantics. Resume, repository, professional-profile, and mailto destinations were inspected; no email was sent or external account modified.
- Accessibility-tree review exposed both five-stage homepage flows in order with captions, the four-stage CodeGraph architecture, the three-stage TaskForge architecture, success/retry paths, and both four-row benchmark charts. All eight chart medians and their tasks/sec units were present in the tree. Hidden bars, arrows, and pulses do not replace the text values or explanations.

## Reproduce the optional audit

```sh
npm run build
npm install --prefix /private/tmp/aansh-ticket08-audit --no-save --package-lock=false axe-core@4.10.3
AXE_SCRIPT_PATH=/private/tmp/aansh-ticket08-audit/node_modules/axe-core/axe.min.js node tests/homepage-preview.mjs
```

Open a route on `http://127.0.0.1:4176` with `?audit=1&motion=system-reduced`. The inert JSON script `#accessibility-report` contains the engine version, viewport, violations, incomplete items, and passed-rule IDs. Use `?text=200` for text enlargement and `?clipboard=denied#contact` or `?clipboard=unsupported#contact` for fallback feedback. The normal production preview is `npm run preview`; these query modes do not exist there.

## Blockers and verification limits

No missing implementation dependency or unresolved code issue was found. There are **no unresolved axe violations or manual keyboard issues** in the tested states.

The available in-app browser exposes viewport sizing but no page-zoom control; its zoom shortcut did not change the page viewport. Native 200% browser zoom remains a manual verification item. Responsive pointer input was tested, but physical touchscreen hardware was not available. Diagram interpretation was reviewed through the accessibility tree, not a spoken VoiceOver/NVDA session. OS reduced-motion settings were not changed; the existing test media signal and application toggle were tested. External destination availability and native mail-client launching were not exercised. These are verification limits, not claims of additional testing.
