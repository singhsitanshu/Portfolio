# Ticket 21 — Improve first-screen density and responsive reading order

**Status:** Ready for implementation planning; not implemented by this ticket-writing task.  
**Priority:** P2  
**Review recommendation:** 6 of 12  
**Depends on / coordinates with:** Tickets 16, 17, 19, and 20; review again after Ticket 22 assets land.

## Shared requirements

Read [the employer-portfolio ticket index](README.md) for controlling facts, source precedence, common verification, and implementation boundaries. These requirements are part of this ticket.

## Problem and intended outcome

Large header spacing and illustrations currently delay achievements and project identities. Improve access to relevant information while preserving the site's readable typography and restrained visual identity.

## Implementation scope

- Audit the hero, case-study header, overview cards, project cards, and section gaps using screenshots of the implemented content.
- Reduce excessive vertical padding, title scale, and gaps in the case-study headers so the project name, concise purpose, solo role, and primary result fit within a 1440×900 desktop viewport at default text size.
- On homepage project cards, honor Ticket 17's text/result/action-before-visual structure; avoid CSS ordering that disagrees with assistive-technology reading order.
- On 390×844 mobile screens, prioritize identity, purpose, and the result ahead of decorative media. Aim to show the primary result without a long introductory scroll, but do not clip text or shrink essential qualifications to force a viewport target.
- Keep heading hierarchy, comfortable body text, touch targets, focus styling, and breathing room between distinct sections.
- Preserve image aspect ratios and meaningful captions. Do not distort the portrait or crop away important product controls.
- Keep key achievements fully visible at rest and with reduced motion. Do not use scroll-triggered reveal as a prerequisite for reading them.
- Check desktop/tablet/mobile section navigation and deep-link offsets after changing header dimensions.

## Files to inspect

- `src/styles.css`
- `src/components/CaseStudyLayout.tsx`
- `src/components/ProjectShowcase.tsx`
- `src/pages/Home.tsx`
- `src/components/Motion.tsx if necessary`

## Acceptance criteria

- Desktop screenshots demonstrate the primary case-study achievement in the initial viewport at 1440×900.
- Titles and achievement text precede illustrations in both DOM and visual reading order.
- No horizontal scrolling at 320, 390, 768, or 1440 CSS-pixel widths.
- At 200% text enlargement all content remains available without overlap, clipping, or fixed-height truncation.
- Keyboard focus, section anchors, and reduced-motion rendering remain usable.

## Verification

Save before/after screenshots at the named viewport sizes and record any unavoidable fold differences. Reuse existing responsive/accessibility checks where applicable; do not add screenshot pixel-lock tests for simple spacing changes. Run shared build/production/navigation checks.

Record the implementation, checks actually performed, screenshots where relevant, and any remaining dependency in `docs/ticket-21-verification.md`. Do not report unperformed checks as passing.

## Scope boundaries and handoff

This is an integration layout pass, not a visual rebrand. It should not change metric meaning, remove technical sections, or require unrelated animation rewrites.
