# Ticket 26 — Prioritize engineering experience while preserving leadership breadth

**Status:** Ready for implementation planning; not implemented by this ticket-writing task.  
**Priority:** P2  
**Review recommendation:** 11 of 12  
**Depends on / coordinates with:** None; use the current authoritative career source map.

## Shared requirements

Read [the employer-portfolio ticket index](README.md) for controlling facts, source precedence, common verification, and implementation boundaries. These requirements are part of this ticket.

## Problem and intended outcome

BUR's technical work has one dense bullet and D-Tech appears below operations work. Make relevant engineering execution and team leadership easier to recognize without losing the broader experience record.

## Implementation scope

- Keep the homepage `#experience` section and BUR as the first entry, honoring the established owner preference.
- Group BUR and D-Tech under “Engineering experience.” Place exploretech.la, RRISD, and CompuChild under “Leadership, operations & teaching,” preserving their relative order within that group.
- This explicitly supersedes the previous interleaved presentation order for this implementation batch; do not change role dates to make the new order appear chronological.
- Split BUR's supported contribution into two readable bullets: Python/YOLOv11 perception work for autonomous RoboSub, and the automated Unity pipeline generating **3,000+ labeled training images**. Add an outcome beyond image count only if an authoritative source already supports it.
- Give D-Tech's **five-intern leadership** and requirements/user-flow/prototype work clear emphasis. Do not convert its documented design responsibilities into an unsupported claim of a shipped production platform or backend implementation.
- Keep job titles, organizations, date precision, and all existing entries. Preserve the existing outreach, ambassador, and teaching achievements while trimming repetition rather than deleting evidence.
- Keep Education limited to UCLA's academic information; avoid duplicating BUR there or changing graduation date.
- Update the internal content/source map to explain the presentation grouping. Use consistent data-driven rendering, semantic group headings, and accessible lists.

## Files to inspect

- `src/content/portfolio.ts`
- `src/pages/Home.tsx`
- `src/styles.css`
- `docs/content-sources.md`
- `docs/ticket-14-content-map.md as reference`

## Acceptance criteria

- BUR remains the first experience entry; D-Tech is the next engineering entry.
- Engineering and additional leadership/operations/teaching are clearly labeled without implying the entire section is one chronological list.
- The 3,000+ training-image contribution and five-intern leadership are easy to scan.
- All five roles and their authoritative titles/dates remain present; no unsupported employment, impact, or affiliation claim appears.
- `#experience`, `#education`, and existing navigation continue to work.

## Verification

Compare final career copy with `src/content/portfolio.ts` and `docs/ticket-14-content-map.md` plus later owner updates in `docs/content-sources.md`. Inspect group headings and mobile reading order, and run shared/navigation checks.

Record the implementation, checks actually performed, screenshots where relevant, and any remaining dependency in `docs/ticket-26-verification.md`. Do not report unperformed checks as passing.

## Scope boundaries and handoff

The current user requested implementation tickets for this grouping improvement. Do not modify the résumé asset, silently extend “Present,” or remove non-engineering experience.
