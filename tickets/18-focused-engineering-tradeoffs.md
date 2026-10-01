# Ticket 18 — Condense and reposition engineering tradeoffs

**Status:** Ready for implementation planning; not implemented by this ticket-writing task.  
**Priority:** P2  
**Review recommendation:** 3 of 12  
**Depends on / coordinates with:** Ticket 16; coordinate narrative boundaries with Ticket 25.

## Shared requirements

Read [the employer-portfolio ticket index](README.md) for controlling facts, source precedence, common verification, and implementation boundaries. These requirements are part of this ticket.

## Problem and intended outcome

Tradeoffs can demonstrate engineering judgment, but CodeGraph introduces them before its achievement. Some statements explain generic limitations rather than a consequential decision. TaskForge already places tradeoffs after results and should retain that relationship.

## Implementation scope

- Place CodeGraph's decisions/tradeoffs after the achievement summary, architecture, and detailed validation/results. Retain TaskForge's tradeoffs after its benchmark section.
- Keep two or three substantive decisions per project, with enough context to explain the actual choice rather than enforcing identical card counts.
- Use compact prose or labeled fields covering constraint → decision → benefit → accepted limitation. Do not invent an alternative Aansh evaluated or a motivation that is absent from source material.
- CodeGraph candidates: Tree-sitter multi-language static analysis and dynamic-dispatch limits; graph/vector/community retrieval and the meaning of exploratory clusters; bounded ingestion stages when a concrete design implication can be explained.
- TaskForge candidates: short transactions and renewable ownership; a single PostgreSQL authority and contention; priority with bounded attempts and fairness.
- Explain external-effect idempotency once in the relevant TaskForge decision. Retain the concise execution-repeat boundary in recovery without adding repeated warnings.
- Remove filler such as a generic assertion that batch sizes balance resources unless it is tied to a concrete implemented choice. Keep relevant exact configuration facts in the technical walkthrough.
- Preserve `#decisions` and `#tradeoffs` anchors. Update navigation labels/order and any affected accessible descriptions.

## Files to inspect

- `src/content/codegraph-case-study.ts`
- `src/content/taskforge-case-study.ts`
- `src/pages/CodeGraphCaseStudy.tsx`
- `src/pages/TaskForgeCaseStudy.tsx`
- `src/styles.css`

## Acceptance criteria

- No tradeoff section precedes the new achievements summary.
- Each retained decision identifies a specific mechanism and an actual consequence; generic lesson paragraphs are removed or merged.
- Source-supported limitations remain accurate and concise; the copy does not imply a limitation was fixed or promise exactly-once effects.
- No conflict or substantial repetition remains between this section and Ticket 25's problem-solving stories.
- Existing incoming fragment links still resolve.

## Verification

Perform a side-by-side copy review against current content and the selected source notes. Check final heading/navigation order, mobile wrapping, and fragment links. Run shared checks if page code changes.

Record the implementation, checks actually performed, screenshots where relevant, and any remaining dependency in `docs/ticket-18-verification.md`. Do not report unperformed checks as passing.

## Scope boundaries and handoff

Retain engineering substance; this is neither wholesale removal nor restoration of the old audit/defect inventory. Layout changes here supersede earlier ticket instructions fixing section placement.
