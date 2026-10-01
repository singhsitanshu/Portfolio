# Ticket 16 — Move case-study achievements to the top

**Status:** Ready for implementation planning; not implemented by this ticket-writing task.  
**Priority:** P1  
**Review recommendation:** 1 of 12  
**Depends on / coordinates with:** None; establishes the shared result presentation used by Tickets 17 and 20.

## Shared requirements

Read [the employer-portfolio ticket index](README.md) for controlling facts, source precedence, common verification, and implementation boundaries. These requirements are part of this ticket.

## Problem and intended outcome

CodeGraph currently places results after six substantive sections; TaskForge places benchmarks after five. Both headers spend their overview space on system components. Make a visitor understand the achievement before asking them to read implementation details.

## Implementation scope

- Extend the shared case-study header to accept a concise result summary directly after the introduction and a compact ownership line from Ticket 19. Keep this before the technical overview and section navigation.
- CodeGraph: lead with **97.5% LLM context reduction** and **≈737K → ≈18K tokens per query**. Include “Supported-source tokens compared with tool-returned context.” Keep the existing scope definition accessible nearby; this is not an accuracy, billing, or latency result.
- TaskForge: lead with **15.84× speedup** from **1 to 16 workers on synthetic 50 ms waits**. Add **≈1,284 no-op tasks/sec at four workers** as a distinct measurement. State “Local Docker benchmarks” adjacent to these results. Do not combine results from different workloads into one performance claim.
- Reuse canonical metric data rather than copying numbers into new JSX strings. Keep the exact TaskForge value 15.842× and 1,284.015 tasks/sec in detailed evidence.
- Give the summary a descriptive link to the existing detailed results anchor. Preserve CodeGraph `#results` and TaskForge `#benchmarks` as the detailed destinations; give the new summary its own unique ID if needed.
- Move the technical overview below the achievement summary. Do not move all methodology into the header or duplicate the full result panel twice.
- Update section navigation to match the final reading order. The pages currently destructure section arrays by position: replace fragile positional associations with stable IDs or otherwise keep heading/body associations correct when reordering.

## Files to inspect

- `src/components/CaseStudyLayout.tsx`
- `src/pages/CodeGraphCaseStudy.tsx`
- `src/pages/TaskForgeCaseStudy.tsx`
- `src/content/codegraph-case-study.ts`
- `src/content/taskforge-case-study.ts`
- `src/content/codegraph.ts`
- `src/content/taskforge.ts`
- `src/styles.css`

## Acceptance criteria

- Both routes communicate a quantified result before architecture, walkthroughs, or tradeoffs.
- Every headline has its workload/baseline and units beside it, including on mobile; essential qualifications are not tooltip-only.
- Figures in the summary and detailed sections agree. Existing exact benchmark values and scoped validation counts are retained.
- Direct links to `#results` and `#benchmarks` still reach the intended detailed evidence; all IDs are unique.
- New results appear in prerendered HTML and remain readable without animation or hydration.

## Verification

Inspect both route tops at 1440×900 and 390×844. Check heading order, keyboard links, reduced motion, and existing fragment navigation. Run the shared build and production checks. Record screenshots of the new header and its detailed-result destination.

Record the implementation, checks actually performed, screenshots where relevant, and any remaining dependency in `docs/ticket-16-verification.md`. Do not report unperformed checks as passing.

## Scope boundaries and handoff

This ticket owns the new summary and its shared data/API. Ticket 23 owns the internal order of TaskForge's detailed benchmark section. Ticket 21 owns global spacing refinement. No new benchmark runs are needed.
