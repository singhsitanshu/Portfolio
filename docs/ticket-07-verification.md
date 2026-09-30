# Ticket 07 verification

Implemented September 30, 2026. Scope: motion and engineering-visualization pass only.

## Changes

- Added shared Framer Motion helpers for restrained 6px/320ms section/hero entrances, once-per-mount decorative metric rules, and a 320ms route accent. Routing/content/focus update immediately; no exit wait, overlay, loading screen, scroll handler, smooth-scroll gate, or hidden-copy entrance.
- Added desktop hover/focus color and link feedback. Existing focus outlines remain intact.
- CodeGraph's five glyphs and connector pulses progress from files through functions/calls to focused context and agent. TaskForge's queue marks, exclusive claim glyph, workers, lease/heartbeat glyph, and outcome advance before highlighting the explicitly alternative retry path.
- Sequences are deterministic illustrations, not backend simulations or measured live activity. Stage text, outcomes, captions, and qualifiers are always available. TaskForge's retry cue uses the already-documented backoff/promotion/budget behavior and stays centralized in its content module.
- One pending 650ms timer advances each diagram, then permanently settles for that mount (CodeGraph five steps; TaskForge six including the alternative path). Leaving the viewport cancels the timer; re-entry resumes without resetting. Document visibility uses the same eligibility gate and timer cleanup. Glyph/pulse effects are finite, with no infinite repeat or RAF polling loop added.
- At widths ≤60rem, skip entrances/sequence timers and show static completed visuals. Reduced motion also settles every diagram, removes entrance offsets and transitions, and retains every state/result. System preference changes are subscribed through matchMedia. A keyboard-accessible footer control persists the user's reduction preference; system reduction cannot be overridden. Storage failure leaves the control functional for the current page.
- Numerical metrics and benchmark bars are never interpolated. Only decorative accents animate, so values remain exact from the initial render through the final animation frame: ≈737K → ≈18K, 97.5%, 60,000, ≈1,284, 99%, and all case-study chart endpoints.
- Extended the existing test-only preview to simulate the system reduced-motion application signal before mount. No runtime test query/hooks are in the production bundle. No new dependency or source claims were added.

## Checks performed

- `npm run build` passed TypeScript and Vite production compilation after final code changes. Output JS: 437.26 kB / 139.27 kB gzip. The existing Framer Motion animation runtime is now used; no unrelated performance refactor was made.
- `node --experimental-strip-types --test tests/copy-email.test.mjs`: both existing regression tests passed.
- Production desktop initial render: all entrance wrappers had opacity 1; all stage labels and final numerical values were in the DOM while offscreen diagrams were paused at step 0.
- Sampled CodeGraph phases 0–5 and TaskForge phases 0–6 at controlled intervals. Active glyphs matched the expected order; TaskForge's final illustrative phase highlighted the alternative retry cue. Every sample retained exact homepage metrics `97.5%`, `60,000`, `≈1,284`, and `99%`. Completion had no active glyphs, and completed TaskForge did not restart on re-entry.
- Paused unfinished CodeGraph at step 1 by moving to About. It remained paused at step 1 after 1.4 seconds (more than two sequence intervals) and resumed at step 1 upon returning to Work. Page-hidden cancellation was inspected in the shared visibility/eligibility effect; native background-tab visibility was not emulated.
- Keyboard Reduce motion control: all diagram states became static at endpoints 5/6, no active glyphs remained, entrance opacity stayed 1, and computed CSS transitions were zero. Main text before/after was identical. Reload retained the choice; the choice remained reduced across both project entry and return links. Restored the preference through the same control after verification.
- Test-only `?motion=system-reduced` page: system label/control disabled, root reduced mode, static diagrams, zero active glyphs, no entrance/glyph transforms, no button transition, and exact metrics. This simulates the application's system-media signal; it is not an OS preference change or native CSS media emulation. Production CSS uses the reduced root attribute as well as the existing system-media rule to suppress transitions.
- At 1280 × 900, 768 × 900, 375 × 812, and 320 × 700, checked homepage CodeGraph/TaskForge direct hashes and case-study architecture/benchmark direct hashes: no document overflow, one h1, opaque copy, and correct destination focus. All tablet/mobile diagrams were static with no active stages.
- At 1280px and 375px, keyboard project entry/back links preserved main/section focus, and cross-route Work/About navigation focused the correct homepage sections. Existing routing is not delayed by the route accent. Case-study layout spacing was preserved around the new entrance wrapper.
- Normal desktop project entry rendered TaskForge and focused main immediately with heading-wrapper opacity 1. Observed the decorative benchmark rule in flight while its numerical values remained exact.
- Rendered clipboard-denied and unsupported-browser feedback remained immediate and readable on mobile. Existing helper regression tests also passed.
- Inspected desktop and mobile visuals; observed no browser console errors. Hover styling was reviewed in CSS; no physical pointer-hover or native OS preference test was performed.
- Screenshot: `/private/tmp/ticket07-taskforge-motion.jpg` captures the settled desktop illustration, including the alternative retry path.

## Blockers / scope

No implementation or dependency blocker remains. No backend simulation, new project fact, future-ticket content, redesign, deployment, or unrelated refactor was implemented. Ticket 08 and later remain untouched. Existing numerical measurement qualifications remain unchanged.
