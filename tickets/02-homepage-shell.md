# Ticket 02: Homepage shell, navigation, and personal content

**Depends on:** Ticket 1

## Shared requirements

- Use React, TypeScript, Vite, Tailwind CSS, and Framer Motion. Keep the site static-first and deployable through Cloudflare.
- Build an intentional, project-led portfolio with strong typography, restrained color, and systems-inspired visuals.
- Treat mobile, semantic HTML, keyboard access, and reduced motion as baseline requirements.
- Use only supported project claims, verified experiences, and real links. Flag missing content rather than inventing it.
- Exclude backend services, CMS, authentication, blog infrastructure, and contact forms from V1.
- Keep each change limited to its ticket. Record what changed, how it was verified, and any remaining blockers.

## Scope

- Build the homepage structure: hero → CodeGraph → TaskForge → journey/about → contact.
- Create responsive navigation with Work, About, Resume, GitHub, and LinkedIn.
- Implement the hero with Aansh Singh, Software Engineer, UCLA Computer Science, and concise positioning.
- Add Explore My Work, Resume, GitHub, and LinkedIn actions.
- Add a short personal introduction and a journey using verified dates only.
- Serve the résumé as a static PDF and implement email/copy-email interaction.
- Reserve substantial space for the two project sections.

## Acceptance criteria

- Navigation and available actions work on desktop and mobile.
- The hero has a deliberate visual composition.
- Project sections dominate the page.
- No invented timeline entries or dead placeholder links appear as finished content.
- Copy-email provides clear success or failure feedback.
