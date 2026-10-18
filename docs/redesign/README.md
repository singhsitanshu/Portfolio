# The Aansh Times redesign: verification

Branch `redesign/aansh-times`, one commit per ticket (T-00 to T-18), October 18, 2026. Checks ran against `npm run build` output in Playwright's Chromium: Lighthouse 12.8, axe-core 4.10 (WCAG 2.0/2.1/2.2 A and AA plus best practices), and scripted layout, keyboard and motion checks. Stack and baseline: [AUDIT.md](../../AUDIT.md).

## Owner decisions applied (October 18, 2026)

- Headlines: "Repository Tool Cuts LLM Context 97.5%" (the draft's "Student" dropped) and "Go Workers Scale 15.84× Under Load".
- The motto "All the code that's fit to ship." stays in the left ear.
- No photo credit line. No dark mode (paper edition only).
- The edition date is the build date, after "Vol. 1, No. 1".
- The front page opens on Aansh, not the projects: a full-width "AANSH" name banner, which is the only big title ("Pragmatic, system-minded." is a small line, not a headline). The portrait appears in the introduction and as byline headshots.
- The Oct 1 instruction to show only the original portrait JPEG, unfiltered, is superseded by this plan's halftone and srcset tickets. The original file is kept byte for byte, and every resized copy keeps its full proportions and Display P3 profile.

## Ticket acceptance

| Ticket | Acceptance | Result |
| --- | --- | --- |
| T-00 | `AUDIT.md` with stack, commands, routes, assets and baseline scores; baseline screenshots | Done: `AUDIT.md`, `docs/baseline/` |
| T-01 | No hard-coded homepage strings; no visual change | Copy lives in `src/content/site.ts`; a pixel diff against the baseline at 375 and 1280px showed 0 changed pixels on all three pages |
| T-02 | Tokens in one documented file; font payload under 250 KB | `src/styles/tokens.css`; 162 KB of fonts (test-enforced) |
| T-03 | Dev-only noindex `/styleguide` with every style; body text 4.5:1 | Development-only route, absent from `dist`; ink is 15.7:1 on paper |
| T-04 | Four-story layout at three breakpoints; no horizontal scroll 320–1920px | On the styleguide; 0 overflow at 320, 375, 768, 1280 and 1920px |
| T-05 | Every primitive on the styleguide; grain under 2 KB, no click or selection blocking | Grain is a 340-byte data URI with `pointer-events: none` |
| T-06 | Name, role, Resume, GitHub, LinkedIn visible without scrolling at 1280×720 and 390×844; anchors clear the sticky bar | Yes (`final/above-the-fold/`); headings land 16px below the bar |
| T-07 | Lead spans 8 of 12 columns (full width on mobile); links work; copy in the content file | Yes |
| T-08 | Benchmark caveat always visible; sits beside the lead (desktop), after it (mobile) | Caveat is the pull quote's attribution |
| T-09 | Descriptive alt, visible caption; no image layout shift | Width/height set; CLS 0 on the home page |
| T-10 | All 5 entries and 9 bullets word for word; `#experience` lands on the section front | Yes (scripted comparison) |
| T-11 | `#education` lands on the box | Yes; the box receives focus |
| T-12 | Copy email copies and announces; Reduce motion works and persists | Clipboard holds the address and "Email copied to clipboard." is announced; the toggle persists across reload |
| T-13 | Case-study URLs unchanged, all content present; wide content scrolls in its own container | Yes; formula boxes wrap or scroll inside themselves |
| T-14 | Readable at 320px; no color-only meaning | Stages stack at 320px; every stage is labelled in text |
| T-15 | Screenshots at 8 widths; no horizontal scroll, overlap or orphaned rules | `t-15/`; checks in `t-15/checks.json` |
| T-16 | Content readable and clickable before animations finish; the media query and the toggle each disable all motion | All animations end by 1.04s; links clickable with 5 running; 0 animations under either control |
| T-17 | Lighthouse Accessibility and SEO 95+; new preview image | 100 and 100 on all pages; `social-preview-times-v1.jpg`, 1200×630 |
| T-18 | Lighthouse 95+ in all categories on production; LCP under 2.0s and CLS under 0.05 on mobile; before/after in `AUDIT.md` | **Partly met.** Desktop is 100 in every category. Mobile is 91–93 Performance and 100 elsewhere, CLS at most 0.007, but LCP is 2.7–3.0s (simulated). Production is not deployed. See AUDIT.md |

## Definition of done (every ticket)

- Builds with zero errors; `tsc` strict passes; all Node tests pass (13 pass, 2 skipped without preview URLs).
- Zero console warnings on `/` and both case studies at 375 and 1280px (the 404 page logs its own expected 404 status).
- axe: no violations of any impact on `/`, both case studies or the 404 page, at 375 and 1280px, after load animations settle. (Mid-animation scans report contrast at half opacity, which is transient.)
- Keyboard: the skip link is the first stop; every stop (22 on home, 28 and 27 on the case studies) shows a visible focus ring and is at least 24px tall.
- Screenshots: per ticket in the commit messages; final pages in `final/` at 375 and 1280px; the front page at all eight widths in `t-15/`.

## Final QA checklist (local production build)

**The recruiter test**

- [x] Name, "software engineer", UCLA and the résumé link are visible at first sight (masthead name line, edition bar, left ear, name banner).
- [x] Resume PDF, GitHub, LinkedIn and email are each one click from the top (ears, and the index's Contact link to the email).

**Nothing lost**

- [x] Routes, anchors (`#main`, `#projects`, `#experience`, `#education`, `#contact`, plus legacy `#work` and `#about`), skip link, Reduce motion, Copy email, OG/Twitter meta and preview images all work.
- [x] Both projects show their metric, caveat, stack, case study link and GitHub link.
- [x] All 5 experience entries and all bullets are present, word for word.

**Looks like a newspaper**

- [x] Nameplate, edition bar, ears, column rules and double rules are visible at 1280px.
- [x] Body text is justified and hyphenated (`lang="en"`). Narrow columns show some loose lines, which come with justification.
- [x] The nameplate is UnifrakturMaguntia, a Fraktur, not the New York Times' custom blackletter.

**Quality**

- [ ] Lighthouse 95+ in all four categories on `/` and both case studies: met on desktop; mobile Performance is 91–93 (see AUDIT.md).
- [x] Keyboard-only pass on `/` (and both case studies).
- [ ] VoiceOver (Safari) pass: **not run.** Only Chromium was available.
- [ ] Chrome, Safari, Firefox, iOS Safari: **Chromium only.** Safari, Firefox and iOS Safari remain to be checked.
- [ ] Production: the branch is not merged or deployed. Repeat Lighthouse on aanshsingh.com after deploying.
