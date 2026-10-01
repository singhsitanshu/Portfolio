# Ticket 22 — Show real project interfaces and a concrete walkthrough

**Status:** Ready for implementation planning; not implemented by this ticket-writing task.  
**Priority:** P2  
**Review recommendation:** 7 of 12  
**Depends on / coordinates with:** Tickets 17 and 19; source availability may require a partial handoff.

## Shared requirements

Read [the employer-portfolio ticket index](README.md) for controlling facts, source precedence, common verification, and implementation boundaries. These requirements are part of this ticket.

## Problem and intended outcome

Homepage project media currently depicts conceptual diagrams. Actual interfaces can show that Aansh assembled working end-to-end systems and help visitors understand the user experience.

## Implementation scope

- Inspect existing authorized project assets and public repository documentation for real screenshots; use readable, relevant captures before proposing a new recording session.
- CodeGraph primary image: a real repository graph with a selected node/source drawer, or a real question and its retrieved context if available. Use a repository that may be shown publicly.
- TaskForge primary image: a real console with task state/attempt history, or a real monitoring dashboard. Do not manufacture a dashboard or synthetic chart and label it as product evidence.
- Add one primary image per case study near the overview, after its result summary. Reuse an appropriately cropped/optimized version in the homepage card when useful.
- Supply an accurate caption explaining what the reader sees and purposeful alt text. Clearly label demo data when applicable. A screenshot's displayed values must not be presented as the benchmark run unless they are from it.
- Keep useful conceptual architecture diagrams in the technical section and preserve their conceptual labels.
- Optimize dimensions, modern image format/fallback, responsive sources, and loading behavior; avoid downloading full-resolution assets for tiny cards or introducing layout shift.
- Optional enhancement: a short user-controlled walkthrough with captions/transcript, poster image, and no autoplay/audio. Do not make video a dependency for completing the image version.
- If usable assets are absent and the projects cannot be safely run with existing access, document the exact missing capture/scene and request only that input. Keep existing labeled diagrams until real media is available; do not invent a product screenshot.

## Files to inspect

- `public/images/ (new project assets)`
- `src/components/CodeGraphFeature.tsx`
- `src/components/TaskForgeFeature.tsx`
- `src/pages/CodeGraphCaseStudy.tsx`
- `src/pages/TaskForgeCaseStudy.tsx`
- `project content modules`
- `src/styles.css`

## Acceptance criteria

- Both case studies have an authentic, legible product view with source/capture provenance recorded internally, or the missing project asset is explicitly reported as blocked.
- No secrets, private repository contents, personal data, or unrelated desktop material appear in public media.
- Images have dimensions, useful alt text, accurate captions, responsive sizing, and no broken paths.
- Media follows the achievement summary and does not displace it from the priority reading path.
- Optional video is keyboard operable and understandable without sound.

## Verification

Inspect each final image at card and full case-study sizes. Verify responsive sources, loading/layout behavior, keyboard controls if present, and privacy of visible content. Run shared checks and record final asset sizes/provenance.

Record the implementation, checks actually performed, screenshots where relevant, and any remaining dependency in `docs/ticket-22-verification.md`. Do not report unperformed checks as passing.

## Scope boundaries and handoff

Do not deploy either project, incur model-provider charges, or change remote project configuration solely to obtain screenshots. Missing media should not block the independent text/hierarchy tickets.
