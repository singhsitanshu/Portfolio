# Ticket 21 — density and responsive reading order

Implemented October 2, 2026. Only `src/styles.css` changes site behavior. No content, component, animation, routing, image, contact, or deployment changes.

## Implementation and before/after audit

Reduced case-study header padding, the title-to-back-link and eyebrow gaps, and introductory type scale. Case-study titles now range from 36 to 64 px at default text size; purpose text ranges from 18 to 24 px. Result values, qualifications, and body text retain their existing sizes. Reduced summary padding, ownership/overview gaps, overview padding, section-navigation spacing, and case-study section padding. Distinct sections retain borders and at least 40 px vertical padding.

Reduced the homepage Projects section's leading space, card-list padding, card-copy padding, and result/action gaps. Existing card structure remains title/purpose → result and qualifications → actions → conceptual illustration/caption → technical detail. The desktop subgrid still aligns matching rows across both cards, and tablet/mobile cards stack in the same DOM and visual order. No CSS reordering, fixed text height, hidden content, or image changes were added.

The before screenshots showed CodeGraph's primary result ending near 787 px and TaskForge's near 821 px on desktop; the complete ownership paragraphs ended below 1,020 px. The final desktop screenshots show both complete summaries and full ownership paragraphs above the 900 px fold.

| Viewport | CodeGraph primary value bottom, before → after | TaskForge primary value bottom, before → after |
| --- | --- | --- |
| 1440×900 | 787 → 562 px | 821 → 596 px |
| 768×1024 | 667 → 540 px | 702 → 574 px |
| 390×844 | 702 → 588 px | 737 → 622 px |
| 320×844 | 781 → 636 px | 815 → 695 px |

At 1440×900, the complete CodeGraph summary ends at approximately 737 px and ownership at 809 px; TaskForge ends at 715 px and 788 px respectively. The overview cards begin near the desktop fold and can continue below it. At 390×844, CodeGraph's entire summary fits; TaskForge's primary result, synthetic-wait condition, secondary value, and workload description fit, while its evidence link and ownership continue below the fold. At 320 px, longer qualifiers and the second TaskForge workload require further vertical scrolling. At 200% text size, headers and cards require more vertical scrolling and may wrap project names. No text or qualifications were removed or shrunk to force these narrower fold targets.

## Preservation and reading order

Compared the prerendered body of all three routes against a saved pre-change build: all body markup is identical, excluding the generated script asset reference. This preserves every introduction, metric/condition, ownership sentence, heading, anchor, link, caption, and technical section, including the complete homepage hero copy and actions.

No hero, portrait, shared typography, or image rule was edited. Browser measurements at all four widths confirm identical hero dimensions, horizontal positions, and font sizes; desktop captures can differ vertically by up to 6 px while the existing entrance translation runs. The portrait and résumé byte-preservation production checks pass. Existing image aspect-ratio rules and meaningful captions remain intact.

Case-study titles and achievements already precede all architecture figures. Homepage card text/results/actions already precede illustrations. Existing structure and the production reading-order assertions satisfy the required order without component changes. The existing motion implementation renders copy opaque from its first render; no animation rewrite was necessary.

## Checks actually performed

| Check | Outcome |
| --- | --- |
| `npm run build` | Passed TypeScript, Vite client/SSR builds, and all route prerenders after the CSS changes. |
| `npm run check:production` | 9 passed, 0 failed; 2 optional preview checks skipped without environment URLs. |
| `PREVIEW_URL=http://127.0.0.1:4182 npm run check:production` | 10 passed, 0 failed; only the optional Workers redirect check skipped. Local route metadata, real 404 responses, and asset bytes passed. The first sandboxed HTTP attempt was blocked by loopback network permissions; the permitted rerun passed. |
| `node --experimental-strip-types --test tests/navigation.test.mjs` | 2 passed, 0 failed. |
| `git diff --check` | Passed. |
| Responsive browser inspection | Homepage and both case studies inspected at 1440×900, 768×1024, 390×844, and 320×844. Saved 20 before and 20 after viewport captures covering both case-study headers, both card anchors, and the hero preservation reference. All measured document widths equal their viewport widths. |
| 200% text enlargement | All three routes checked at all four widths using a temporary loopback fixture that doubles each HTML element's computed font size while preserving the CSS viewport and spacing. Verified all 233 homepage, 235 CodeGraph, and 328 TaskForge element font sizes per viewport. No horizontal document overflow or clipped visible text. This is exact text-only enlargement, not browser page zoom. No fixture or override is shipped in the site. |
| Enlarged text at rest | Checked sibling line-fragment rectangles throughout all three pages at all four widths with the existing Reduce motion preference enabled: no overlap. Inline wrapping uses individual line fragments, avoiding false positives from the enclosing rectangles of multi-line dates. Intentionally clipped `sr-only` labels remain accessible and are excluded from visible-text clipping results. Reviewed enlarged cards and complete mobile result/ownership captures. |
| Keyboard and deep links | Both case-study summaries, CodeGraph architecture/results/decisions, and TaskForge claiming/benchmarks/tradeoffs loaded and focused correctly at all four sizes (32 direct fragment checks). Targets start approximately 24 px below the viewport top. Enter on summary navigation and the evidence links reaches/focuses the correct sections. Tab from Back to projects reaches the evidence link with the existing solid 3 px focus outline. |
| Card/return navigation | At all four sizes, Tab from the CodeGraph card's case-study link reaches its GitHub link. Enter on the case-study link focuses `main` at the route top; Back to projects focuses `#projects` at approximately 24 px. |
| Enlarged keyboard navigation | At 390 px and exact 200% text size, both evidence links still focus their detailed sections at approximately 24 px while the enlargement stylesheet remains active. |
| Reduced motion | Enabled the existing site's Reduce motion control; confirmed `data-motion="reduced"`. Both case-study headers and both card anchors checked at desktop/mobile. Achievements remain opacity 1, visible, and untransformed; header entrances have no transform. The enlarged resting-layout checks also use this preference. System-level OS preference emulation was not performed. |
| Acceptance assertions | One-time assertions over recorded browser measurements passed: default/enlarged widths, doubled fonts, visible-text clipping, resting overlap, focus/offsets, reduced-motion visibility, and complete desktop summaries/ownership. No pixel-lock or prose-only regression tests added. |

No copy-email tests were run because clipboard/contact behavior is unchanged. No browser run with JavaScript disabled was performed; complete critical content and reading order were checked in the prerendered HTML. No deployed URL, project benchmark, or Cloudflare Workers redirect check was performed.

## Screenshots and evidence

Each before/after image below is the actual viewport at the named size. Card captures start at the existing focused card anchor rather than including the excluded homepage hero above it.

| View | 1440×900 before / after | 768×1024 before / after | 390×844 before / after | 320×844 before / after |
| --- | --- | --- | --- | --- |
| CodeGraph header | [Before](verification/ticket-21/before/codegraph-header-desktop.jpg) / [After](verification/ticket-21/after/codegraph-header-desktop.jpg) | [Before](verification/ticket-21/before/codegraph-header-tablet.jpg) / [After](verification/ticket-21/after/codegraph-header-tablet.jpg) | [Before](verification/ticket-21/before/codegraph-header-mobile.jpg) / [After](verification/ticket-21/after/codegraph-header-mobile.jpg) | [Before](verification/ticket-21/before/codegraph-header-reflow.jpg) / [After](verification/ticket-21/after/codegraph-header-reflow.jpg) |
| TaskForge header | [Before](verification/ticket-21/before/taskforge-header-desktop.jpg) / [After](verification/ticket-21/after/taskforge-header-desktop.jpg) | [Before](verification/ticket-21/before/taskforge-header-tablet.jpg) / [After](verification/ticket-21/after/taskforge-header-tablet.jpg) | [Before](verification/ticket-21/before/taskforge-header-mobile.jpg) / [After](verification/ticket-21/after/taskforge-header-mobile.jpg) | [Before](verification/ticket-21/before/taskforge-header-reflow.jpg) / [After](verification/ticket-21/after/taskforge-header-reflow.jpg) |
| CodeGraph card | [Before](verification/ticket-21/before/codegraph-card-desktop.jpg) / [After](verification/ticket-21/after/codegraph-card-desktop.jpg) | [Before](verification/ticket-21/before/codegraph-card-tablet.jpg) / [After](verification/ticket-21/after/codegraph-card-tablet.jpg) | [Before](verification/ticket-21/before/codegraph-card-mobile.jpg) / [After](verification/ticket-21/after/codegraph-card-mobile.jpg) | [Before](verification/ticket-21/before/codegraph-card-reflow.jpg) / [After](verification/ticket-21/after/codegraph-card-reflow.jpg) |
| TaskForge card | [Before](verification/ticket-21/before/taskforge-card-desktop.jpg) / [After](verification/ticket-21/after/taskforge-card-desktop.jpg) | [Before](verification/ticket-21/before/taskforge-card-tablet.jpg) / [After](verification/ticket-21/after/taskforge-card-tablet.jpg) | [Before](verification/ticket-21/before/taskforge-card-mobile.jpg) / [After](verification/ticket-21/after/taskforge-card-mobile.jpg) | [Before](verification/ticket-21/before/taskforge-card-reflow.jpg) / [After](verification/ticket-21/after/taskforge-card-reflow.jpg) |

Additional captures are saved under `verification/ticket-21/after/` for keyboard focus, `text-200/` for each enlarged route/card and the complete mobile summaries, and `reduced-motion/` for desktop/mobile headers/cards. Hero preservation captures are in both `before/` and `after/` at all four sizes.

Recorded results: [before](verification/ticket-21/before-checks.json), [after](verification/ticket-21/after-checks.json), [preservation](verification/ticket-21/preservation-checks.json), [enlargement](verification/ticket-21/text-200-validation.json), [resting overlap](verification/ticket-21/text-overlap-checks.json), [case-study navigation](verification/ticket-21/navigation-checks.json), [home navigation](verification/ticket-21/home-navigation-checks.json), [reduced motion](verification/ticket-21/reduced-motion-checks.json), and [acceptance assertions](verification/ticket-21/acceptance-checks.json).

## Dependencies and boundaries

No missing required dependency or remaining implementation blocker. Tickets 16, 17, and 19 are present. The pass uses the existing labeled conceptual diagrams; Ticket 22 product assets were not introduced. Recheck layout when those assets land. No future ticket content, benchmark storytelling, technical-story rewrite, hero redesign, or deployment was implemented.
