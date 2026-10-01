# Ticket 17 — Lead homepage project cards with measured results

**Status:** Ready for implementation planning; not implemented by this ticket-writing task.  
**Priority:** P1  
**Review recommendation:** 2 of 12  
**Depends on / coordinates with:** Ticket 16 for shared metric representation; coordinate ownership language with Ticket 19.

## Shared requirements

Read [the employer-portfolio ticket index](README.md) for controlling facts, source precedence, common verification, and implementation boundaries. These requirements are part of this ticket.

## Problem and intended outcome

The homepage cards explain features but omit the strongest results. A visitor who does not open a case study should still understand the accomplishment and Aansh's role.

## Implementation scope

- Add one visually prominent result to each card immediately after the project name and short purpose statement.
- CodeGraph headline: **97.5% less LLM context**. Adjacent supporting line: **≈737K → ≈18K tokens/query; supported source vs. retrieved tool context**.
- TaskForge headline: **15.84× worker scaling**. Adjacent supporting line: **1 → 16 workers on synthetic 50 ms waits; local Docker benchmark**.
- Consume the same canonical metrics as Ticket 16. Do not use TaskForge's API-admission rate as execution throughput.
- Reorder the card's actual document structure to: name/date → purpose → outcome → compact solo contribution → case-study/GitHub actions → visual → optional technical highlights and stack. Coordinate the ownership text with Ticket 19.
- Keep useful features but reduce repetition of the purpose statement. Limit the card to the information that helps a reader choose to explore it.
- Keep both projects and their current ordering; project reordering by job target is not part of this ticket.
- Preserve accessible project-specific link names and existing `#codegraph`/`#taskforge` anchors.

## Files to inspect

- `src/components/ProjectShowcase.tsx`
- `src/components/CodeGraphFeature.tsx`
- `src/components/TaskForgeFeature.tsx`
- `src/content/codegraph.ts`
- `src/content/taskforge.ts`
- `src/content/portfolio.ts`
- `src/styles.css`

## Acceptance criteria

- Each card shows a meaningful quantified achievement with context before its illustration in DOM and visual order.
- Result, purpose, ownership, and a case-study link are visible without expanding a disclosure or hovering.
- Cards link to the correct case studies and repositories, and metrics match those destinations.
- Card typography makes the result distinct without allowing the number to overwhelm the project identity.
- At narrow widths, text wraps without truncating units or requiring horizontal scrolling.

## Verification

Compare both homepage cards at 1440×900, 768×1024, and 390×844. Inspect keyboard reading order and 200% text enlargement. Verify results exist in prerendered homepage output and run shared checks.

Record the implementation, checks actually performed, screenshots where relevant, and any remaining dependency in `docs/ticket-17-verification.md`. Do not report unperformed checks as passing.

## Scope boundaries and handoff

Own the card hierarchy and result content here. Ticket 21 adjusts spacing after that structure lands; Ticket 22 replaces/augments its visual asset. Avoid a second competing card redesign.
