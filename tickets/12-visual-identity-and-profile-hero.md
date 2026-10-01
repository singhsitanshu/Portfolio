# Ticket 12 — Give the portfolio a distinctive visual identity and portrait-led hero

## Objective

Redesign Aansh Singh’s portfolio so its first impression feels personal, intentional, and visually compelling. The owner finds the current site plain, basic, and generic, and will attach a profile photograph to this ticket. Integrate that photograph as a major element of the composition.

## Context for an agent new to this website

- Website: https://aanshsingh.com. During the September 30, 2026 review, the domain failed DNS resolution in the review environment. Findings below come from the actual repository and its rendered local homepage; they do not establish a production outage or production/local parity. Inspect the current checkout before editing.
- Repository: `/Users/sitanshusingh/Documents/AanshSingh.com` on the originating machine. Use the repository root if working elsewhere.
- Stack: React 19, TypeScript, Vite, Tailwind CSS 4, Framer Motion, React Router; static HTML prerendering and Cloudflare static hosting. Run `npm ci` if needed, then `npm run dev`. Node 22.12+ is required by the README.
- Read `README.md`, `docs/content-sources.md`, `src/pages/Home.tsx`, `src/App.tsx`, `src/styles.css`, `src/components/ui.tsx`, `src/components/Motion.tsx`, and `src/content/portfolio.ts`.
- Existing routes: `/`, `/projects/codegraph`, `/projects/taskforge`. Existing résumé, GitHub, LinkedIn, email, motion controls, and case studies must remain functional.
- This ticket owns global visual tokens, shared component styling, and the hero. Ticket 13 owns project showcase composition. Ticket 14 owns navigation destinations and Experience/Education structure. Implement in that sequence when handling the whole set. Each ticket includes enough context to be assigned separately.
- The owner's current redesign request supersedes older tickets' preference for an extremely restrained paper/ink appearance. Preserve sourced facts and functionality while changing the presentation substantially.

## Observed problem

The current hero has an enormous two-line name on the left, a pipe-separated positioning statement, and a bordered “Selected work” index on the right. There is no portrait. A large unoccupied area above the right-hand panel makes the composition feel unbalanced. Repeated thin rules, small uppercase labels, Helvetica-style type, and closely related cream surfaces provide little visual variety. The existing restrained animation does not address this composition problem.

## Reference direction

- [Radnaabazar](https://www.radnaabazar.com/en): use the principles of a substantial hero image, confident accent color, strong display typography, and subtle background structure. Its observed hero uses a dark surface, green accent, and circular image treatment.
- [Dhruv](https://dhruvsingh.com/): use the principles of a personal portrait balanced against introduction text, a deliberate image frame, and a consistent developer-inspired visual language. Its observed hero uses a light surface and layered rectangular portrait frame.
- These are references for composition and personality. Create Aansh’s own design and assets; do not reproduce another person's branding or biography.

## Required implementation

1. Establish one coherent visual direction. Recommended starting direction: deep charcoal/navy background, off-white text, mint/green accent, and slightly lighter panel surfaces. Use a subtle grid or restrained diagram motif around the hero to connect to Aansh’s developer-tools and systems projects. Treat these as design starting values, not approval-dependent choices; adjust colors for contrast and the supplied photo.
2. Create reusable tokens for background/surface/text/accent/border, type hierarchy, spacing, radii, and shadows. Use a characterful display face with readable body type; reserve monospace for metadata and small technical cues. If adding fonts, use properly licensed, self-hosted files with a robust fallback and limited weights. Avoid making every element a terminal imitation.
3. Recompose the hero into balanced text and portrait columns. On desktop, reserve roughly 40–45% of its width for the photograph, with a portrait around 320–440 px wide where space permits. Use a thoughtfully cropped, softly rounded rectangular frame with restrained layering or an accent edge. The actual photo should determine the final crop; the face must remain clearly visible.
4. Replace the prominent right-hand project index with the portrait. Remove that duplicate index or reduce it to a small secondary cue beneath the hero; projects will have their own section.
5. Keep “Aansh Singh” as a stable, immediately readable H1. Add a natural greeting and a concise introduction grounded in existing content. Suggested copy: “I’m Aansh, a computer science student at UCLA building developer tools, AI systems, and reliable backend software.” Refine wording without inventing credentials, availability, or personal interests. Avoid animated typing that conceals identity during loading.
6. Give “View Projects” and “Resume” clear primary/secondary hierarchy. Preserve GitHub and LinkedIn with accessible names; use one consistent social-link treatment rather than competing button styles. Coordinate the project target with Ticket 14; keep it functional if this ticket lands first.
7. Integrate the owner's attached photograph locally with responsive image sizes, modern compression, explicit dimensions/aspect ratio, descriptive alt text, and an intentional focal point. Do not lazy-load the above-the-fold portrait. Do not substitute a stock or generated person. If the promised attachment is absent, finish the surrounding design and report the missing asset as the specific remaining dependency; do not claim the portrait requirement is complete.
8. Carry the new tokens through header, footer, contact, shared buttons, links, and case-study reading surfaces. Maintain clear readable diagrams and benchmark labels when changing colors. Update the existing social-preview source/export only if necessary to avoid an obvious visual mismatch; preserve the existing metadata asset contract.
9. Use restrained entrance and hover/focus feedback, approximately 150–250 ms for controls. Honor system reduced motion and the existing user motion control. Essential content must be visible without animation. Avoid continuous spinning portrait borders, cursor effects, and decorative interaction that competes with reading.

## Acceptance criteria

- The first desktop screen presents Aansh’s identity, short introduction, real portrait, and main actions together. It no longer consists of giant text opposite a project directory.
- At 390 px width the name, introduction, portrait, and actions form a coherent stack without cropping the face, overflowing, or creating a large empty spacer. Do not force all content into one mobile viewport.
- Shared styles visibly change the composition, hierarchy, and surface contrast; merely changing the accent color or adding a photograph to the old layout is insufficient.
- Verify at 360, 390, 768, and 1440 px, plus 200% text enlargement. No horizontal page scrolling, clipped text, overlapping controls, or illegible case-study diagrams.
- Body-text contrast meets WCAG AA; interactive controls have visible keyboard focus and practical touch targets. Portrait loading reserves space and does not move the surrounding content.
- Navigation, résumé, contact/copy email, both project routes, and reduced-motion behavior still work.

## Deliverables and validation

Implement the design, then provide before/after desktop and mobile screenshots, final portrait asset paths, and a brief rationale tying the result to the reference principles. Run `npm run build`, `npm run check:production`, and `node --experimental-strip-types --test tests/copy-email.test.mjs`. Inspect both case-study routes after changing shared styles. Report actual results and any unavailable checks. Do not migrate the framework or deploy as part of this ticket.
