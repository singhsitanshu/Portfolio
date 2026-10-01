# Ticket 25 — Replace generic technical narration with concrete engineering stories

**Status:** Ready for implementation planning; not implemented by this ticket-writing task.  
**Priority:** P2  
**Review recommendation:** 10 of 12  
**Depends on / coordinates with:** Tickets 16 and 19; coordinate with Ticket 18 to avoid repeated decisions.

## Shared requirements

Read [the employer-portfolio ticket index](README.md) for controlling facts, source precedence, common verification, and implementation boundaries. These requirements are part of this ticket.

## Problem and intended outcome

CodeGraph's current challenge/lesson statements are general. TaskForge explains many state transitions before readers learn why the choices matter. Use two or three specific stories per project to show Aansh's reasoning and execution.

## Implementation scope

- Review existing project sources for implemented mechanisms and documented validation. Build an internal outline for each story: problem/constraint → Aansh's action → resulting capability → supported validation or observed outcome.
- CodeGraph candidate stories: constructing navigable repository structure across parsing/storage/source lookup; making multi-stage ingestion observable; combining graph relationships with metadata-vector retrieval. Choose only claims supported by the implemented system.
- TaskForge candidate stories: competing workers claiming different rows safely; crash recovery with ownership guards and durable attempt history; workload-dependent worker scaling demonstrated by its benchmark results.
- Use first-person language for Aansh's actual design/build work, drawing ownership from Ticket 19. Do not invent a dramatic incident, a failed first implementation, an evaluated alternative, or an unmeasured improvement.
- Where a source supports a design but no before/after story, write “I designed X to handle Y” rather than asserting that a specific production failure happened and was fixed.
- Keep architecture and the most useful walkthrough. Move fine-grained mechanics into clearly labeled later subsections or accessible disclosures only where this reduces repetition.
- Merge general lessons into the story that demonstrates them, and remove lessons that merely repeat the architecture.
- Keep Ticket 18's concise tradeoffs focused on accepted limitations, rather than restating the entire story.
- Preserve existing incoming anchors (`#challenges`, `#lessons`, `#submission`, `#claiming`, `#execution`, `#recovery`) through retained subsection IDs or accessible legacy targets when restructuring.

## Files to inspect

- `src/content/codegraph-case-study.ts`
- `src/content/taskforge-case-study.ts`
- `src/pages/CodeGraphCaseStudy.tsx`
- `src/pages/TaskForgeCaseStudy.tsx`
- `src/components/CaseStudyLayout.tsx if disclosures need shared structure`

## Acceptance criteria

- Each project contains two or three distinct, source-grounded engineering stories with clear personal action.
- Each story explains the resulting capability or measured outcome without inventing a before/after benchmark.
- Stories, tradeoffs, and lessons do not repeat the same explanation at length.
- Essential technical distinctions and material configuration values remain available in the deeper content.
- Legacy fragments, section navigation, heading hierarchy, and keyboard access work after restructuring.

## Verification

Review each story against sources and the owner clarification. Audit anchors and final reading order. Ask whether each paragraph adds a constraint, action, result, or evidence; remove filler. Run shared checks and existing navigation tests when anchors change.

Record the implementation, checks actually performed, screenshots where relevant, and any remaining dependency in `docs/ticket-25-verification.md`. Do not report unperformed checks as passing.

## Scope boundaries and handoff

Do not resurrect historical defect inventories or describe proposed fixes as completed. Ticket 25 owns narrative depth, not a technical redesign of either underlying project.
