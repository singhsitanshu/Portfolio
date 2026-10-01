# Ticket 19 — Make solo ownership and summer project context explicit

**Status:** Ready for implementation planning; not implemented by this ticket-writing task.  
**Priority:** P1  
**Review recommendation:** 4 of 12  
**Depends on / coordinates with:** None; land before or alongside Tickets 16, 17, 20, and 25.

## Shared requirements

Read [the employer-portfolio ticket index](README.md) for controlling facts, source precedence, common verification, and implementation boundaries. These requirements are part of this ticket.

## Problem and intended outcome

Owner clarification on October 1, 2026: CodeGraph and TaskForge were built alone during summer 2026 while waiting for school to start; all project contribution is Aansh's. The current third-person descriptions leave that ownership unnecessarily implicit.

## Implementation scope

- Record the owner's clarification in `docs/content-sources.md` and reusable project data. Treat it as settled rather than requesting confirmation again.
- Use a compact shared label such as **Solo project · Summer 2026** on homepage cards and case-study headers.
- Add one short first-person ownership statement per case study: “I designed and built CodeGraph independently during summer 2026, before the school year began.” Use the equivalent wording for TaskForge.
- Describe CodeGraph contribution scope using its existing implemented components: repository ingestion/parsing, graph and retrieval pipeline, API, and interactive dashboard.
- Describe TaskForge scope using its existing components: API and console, PostgreSQL task/attempt model, Go workers and schedulers, observability, and benchmark harness.
- Use first person where it clarifies decisions or measured work, while allowing system-behavior explanations to remain in third person. Avoid beginning every sentence with “I.”
- Phrase the timing professionally; do not use “while waiting for school” as the public headline. Do not infer that this was before the first year of college, a gap year, or a particular semester start date.
- Keep Summer 2026 dates and existing technology attributions. Solo ownership does not imply authorship of third-party libraries or models.

## Files to inspect

- `src/content/portfolio.ts`
- `src/content/codegraph.ts`
- `src/content/taskforge.ts`
- `src/content/codegraph-case-study.ts`
- `src/content/taskforge-case-study.ts`
- `src/components/ProjectShowcase.tsx`
- `src/components/CaseStudyLayout.tsx`
- `docs/content-sources.md`

## Acceptance criteria

- A visitor can identify Aansh as the sole project builder from either homepage card or case-study introduction.
- Both projects explicitly state independent summer-2026 development and list concrete contribution scope.
- No copy implies team delivery, employment/client sponsorship, or only partial contribution.
- Ownership is consistent across shared data, rendered content, and internal source notes.
- No unsupported start/end date, project duration, college-entry claim, or production adoption is added.

## Verification

Review every rendered project introduction, card eyebrow, and contribution sentence for consistency. Check mobile length and semantic reading order. Run shared checks for content/component changes; no new tests are needed solely to assert prose.

Record the implementation, checks actually performed, screenshots where relevant, and any remaining dependency in `docs/ticket-19-verification.md`. Do not report unperformed checks as passing.

## Scope boundaries and handoff

This is the authoritative ownership ticket for this batch. It changes project attribution only; do not rewrite employment history as solo work.
