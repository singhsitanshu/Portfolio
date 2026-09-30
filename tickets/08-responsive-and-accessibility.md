# Ticket 08: Responsive and accessibility verification

**Depends on:** Ticket 7

## Shared requirements

- Use React, TypeScript, Vite, Tailwind CSS, and Framer Motion. Keep the site static-first and deployable through Cloudflare.
- Build an intentional, project-led portfolio with strong typography, restrained color, and systems-inspired visuals.
- Treat mobile, semantic HTML, keyboard access, and reduced motion as baseline requirements.
- Use only supported project claims, verified experiences, and real links. Flag missing content rather than inventing it.
- Exclude backend services, CMS, authentication, blog infrastructure, and contact forms from V1.
- Keep each change limited to its ticket. Record what changed, how it was verified, and any remaining blockers.

## Scope

- Review all routes at narrow mobile, tablet, and desktop widths.
- Fix overflow, diagram sizing, typography, navigation, and touch interactions.
- Verify keyboard navigation, focus visibility, landmarks, headings, contrast, and link/button names.
- Check reduced-motion behavior and screen-reader interpretation of diagrams.
- Add a skip link and accessible feedback where needed.

## Acceptance criteria

- No horizontal page overflow at 320px width or larger.
- Content remains usable at 200% zoom.
- Every action works with keyboard and touch.
- No essential content depends on hover or animation.
- Automated accessibility findings and manual keyboard issues are resolved or explicitly documented.
