# Ticket 27 — Make the contact section invite software engineering opportunities

**Status:** Ready for implementation planning; not implemented by this ticket-writing task.  
**Priority:** P2  
**Review recommendation:** 12 of 12  
**Depends on / coordinates with:** None; Ticket 20 is cancelled.

## Shared requirements

Read [the employer-portfolio ticket index](README.md) for controlling facts, source precedence, common verification, and implementation boundaries. These requirements are part of this ticket.

## Problem and intended outcome

The current invitation, “Have a project or an idea to discuss?”, is generic. Make the next step explicit for an employer who has just reviewed the portfolio.

## Implementation scope

- Use a concise employer-facing heading and sentence, for example: “Let’s talk software engineering.” / “Interested in my work? Get in touch to discuss software engineering opportunities.” Final copy should sound natural and consistent with the hero.
- Keep the existing owner-selected email address, mailto link, Copy email action, accessible success/failure feedback, and LinkedIn destination.
- Add or retain convenient résumé access beside the invitation using the existing résumé asset; do not generate or edit a résumé as part of this ticket.
- Use an evergreen invitation as the default. Add a specific internship season, employment type, availability date, or location only if explicitly supplied in current authoritative owner context. The request does not establish those details.
- Ensure each case study offers a clear path to the homepage contact section near its ending, alongside the repository/back-to-projects actions, without overwhelming it with buttons.
- Keep anchor navigation native to the existing routing/focus system. Do not add a contact form, booking widget, analytics tracker, or backend service.

## Files to inspect

- `src/components/Contact.tsx`
- `src/content/portfolio.ts`
- `src/pages/CodeGraphCaseStudy.tsx`
- `src/pages/TaskForgeCaseStudy.tsx`
- `src/styles.css`
- `tests/copy-email.test.mjs and tests/navigation.test.mjs as existing verification`

## Acceptance criteria

- The contact copy explicitly invites software engineering opportunities.
- Email, copy action, résumé, and any LinkedIn/contact links use the existing verified destinations.
- A reader at the end of either case study can reach contact in one action.
- Clipboard success/failure remains announced; buttons and links are keyboard reachable with visible focus.
- No invented recruiting availability or personal contact detail is published.

## Verification

Run existing copy-email and navigation checks where behavior/routes are touched. Test mailto destination, résumé download, case-study-to-contact navigation, and clipboard fallback on mobile/desktop. Run shared checks.

Record the implementation, checks actually performed, screenshots where relevant, and any remaining dependency in `docs/ticket-27-verification.md`. Do not report unperformed checks as passing.

## Scope boundaries and handoff

Own employer invitation and contact access here. Ticket 20 is cancelled; preserve the existing homepage hero and do not add recruiting language to it through this ticket.
