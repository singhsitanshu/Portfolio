# Ticket 20 — Give the homepage hero a concrete engineering pitch

**Status:** Ready for implementation planning; not implemented by this ticket-writing task.  
**Priority:** P1  
**Review recommendation:** 5 of 12  
**Depends on / coordinates with:** Tickets 16 and 19; coordinate hiring-intent wording with Ticket 27.

## Shared requirements

Read [the employer-portfolio ticket index](README.md) for controlling facts, source precedence, common verification, and implementation boundaries. These requirements are part of this ticket.

## Problem and intended outcome

The hero introduces Aansh and his interests, but “Pragmatic, system-minded” is less persuasive than the available evidence. Use the first screen to establish technical focus and a concrete accomplishment while preserving its personal character.

## Implementation scope

- Keep the name, portrait, UCLA Computer Science identity, résumé, Projects, GitHub, and LinkedIn access.
- Replace or subordinate the self-description with a concise, factual engineering focus. Suggested direction: “I build developer tools, AI systems, and reliable backend software.” Avoid unsupported seniority or production-scale claims.
- Add one compact proof line based on canonical project data, linked to the relevant case study. Prefer the CodeGraph 97.5% result with its short baseline qualification; do not turn the hero into a wall of statistics.
- Incorporate solo summer-project context only if it adds clarity without repeating every card's copy. Ticket 19 remains its source of truth.
- If a specific hiring target and availability are already explicitly owner-supplied in current authoritative sources, show a short accurate line. Otherwise use an evergreen invitation to discuss software engineering opportunities and omit dates, internship season, location preference, and work authorization.
- Keep the project and résumé actions prominent. Do not add a new contact form or signup flow.
- Review route title/description in `src/content/metadata.ts` for consistency if the positioning changes; preserve canonical URLs and existing social assets.

## Files to inspect

- `src/pages/Home.tsx`
- `src/content/portfolio.ts`
- `src/content/metadata.ts`
- `src/styles.css`

## Acceptance criteria

- The opening screen communicates identity, engineering focus, at least one grounded achievement, and a clear route to projects/résumé.
- Essential metric context remains visible, not confined to a hover state.
- The portrait and text remain balanced and readable at desktop/mobile sizes.
- No recruiting date, internship availability, or seniority has been guessed.
- Project proof links go directly to the relevant project/results destination and remain usable by keyboard.

## Verification

Capture the hero at 1440×900 and 390×844, plus 200% text enlargement. Check résumé and project links, metadata consistency, and reduced-motion visibility. Run shared checks.

Record the implementation, checks actually performed, screenshots where relevant, and any remaining dependency in `docs/ticket-20-verification.md`. Do not report unperformed checks as passing.

## Scope boundaries and handoff

Ticket 20 owns hero copy and proof selection. Ticket 21 owns the final spacing pass. The current request establishes an employer audience, not a specific recruiting season.
