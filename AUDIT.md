# Repo audit and baseline (T-00)

Recorded October 18, 2026 on `redesign/aansh-times`, before any redesign change (base commit `89ea181`). Every later redesign ticket matches the stack and conventions below.

## Stack

| Concern | What the site uses |
| --- | --- |
| Framework | React 19 + TypeScript 5.9 (strict, `verbatimModuleSyntax`, no unused locals/params) |
| Routing | React Router 7 (`BrowserRouter` in the client, `StaticRouter` at build time) |
| Build | Vite 7, `@vitejs/plugin-react` |
| Styling | Tailwind CSS 4 via `@tailwindcss/vite`, used only for its `@theme` tokens and preflight. All component styles are hand-written classes in `src/styles.css`; no utility classes appear in JSX |
| Motion | Framer Motion 12, wrapped by `src/components/Motion.tsx` (`MotionProvider`, `Entrance`, `MotionRule`, diagram sequences) |
| Fonts | Self-hosted Space Grotesk variable woff2 (`public/fonts/`) plus system stacks |
| Rendering | Static prerender: `scripts/prerender.mjs` builds `src/entry-server.tsx` and writes complete HTML for every route. The client hydrates and lazy-loads page chunks |
| Hosting | Cloudflare Workers Static Assets serving `dist/` (`wrangler.jsonc`: `drop-trailing-slash`, `404-page`). No Worker script, no server runtime |
| Deploy flow | Manual owner action: `npm run build`, then Wrangler deploy (see `docs/ticket-10-deployment-readiness.md`) |
| Node | 22.12+; the TypeScript content modules are also imported by Node scripts with `--experimental-strip-types`, so modules reachable from `src/content/metadata.ts` must import siblings with explicit `.ts` extensions |

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | `tsc -b`, client build, prerender `/`, `/projects/codegraph`, `/projects/taskforge`, `/404`, plus `sitemap.xml` and `robots.txt` |
| `npm run preview` | Vite preview of `dist/` (MPA mode with real 404s) |
| `npm run preview:cloudflare` | Local Wrangler runtime on port 8787 |
| `npm run check:production` | Generated-output tests (`tests/production.test.mjs`) |
| `node --experimental-strip-types --test tests/*.test.mjs` | All Node tests: production output, navigation anchors, copy email |
| `node tests/homepage-preview.mjs` | Test-only server for `dist/` on port 4176, with `?clipboard=`, `?motion=system-reduced`, `?text=200`, `?audit=1` switches |

## Conventions

- Copy lives in `src/content/*.ts` as `as const` objects; components read from them.
- Components are small function components in one-line JSX style, with semantic HTML and explicit `aria-labelledby` on sections.
- Every homepage section is a `<section id tabIndex={-1}>` so hash navigation can move focus to it (`App.tsx` handles focus after routes commit).
- Motion never hides content: entrances only offset by 6px, and mobile, system reduced motion and the footer toggle all render static.
- Verification notes and screenshots go under `docs/`.

## Must-not-break inventory (confirmed in the baseline build)

| Item | Where it lives | Status |
| --- | --- | --- |
| `/` | `dist/index.html` | Present, prerendered |
| `/projects/codegraph` | `dist/projects/codegraph.html` | Present, prerendered |
| `/projects/taskforge` | `dist/projects/taskforge.html` | Present, prerendered |
| `/aansh-singh-resume.pdf` | `public/aansh-singh-resume.pdf`, copied byte for byte | Present |
| `#main` | `<main id="main" tabIndex={-1}>` in `App.tsx` | Present |
| `#projects`, `#experience`, `#education`, `#contact` | Homepage sections in `Home.tsx` / `Contact.tsx` | Present, one each |
| Legacy `#work`, `#about`; project anchors `#codegraph`, `#taskforge` | `LegacyAnchor` spans and project articles | Present |
| Skip link | First focusable element, `a.skip-link[href="#main"]` | Present |
| Reduce motion toggle | `MotionToggle` in the footer; persists `portfolio-reduce-motion` in `localStorage`; disabled when the system prefers reduced motion | Present |
| Copy email button | `Contact.tsx`, `role="status"` + `aria-live="polite"` feedback, fallback text when the clipboard is unavailable | Present |
| OG/Twitter meta | `src/content/metadata.ts`: description, robots, `og:*` (type, site_name, title, description, image + type/width/height/alt, url), `twitter:*` (card, title, description, image, image:alt), canonical | Present on all three routes |
| Preview images | `public/social-preview-homepage-v3.jpg` (current, 1200×630) plus the older `social-preview.jpg` and `social-preview-homepage-v2.jpg` kept for old share URLs | Present |
| `theme-color` | `index.html`, `#f4f3ee` | Present |

## Assets

| Asset | Size | Notes |
| --- | --- | --- |
| `public/images/aansh-singh-trim.jpg` | 646 KB, 1277×1804 | The only image the homepage loads; eager, `fetchpriority="high"` |
| `public/images/aansh-singh-{480,800,1120}.webp`, `aansh-singh-800.jpg` | 47–167 KB | Converted variants, currently unused |
| `public/fonts/space-grotesk-latin-wght.woff2` | 22 KB | Display font, OFL licence alongside |
| `public/favicon.svg` | 0.4 KB | |
| `dist/assets/index-*.js` | 400 KB (React, Router, Framer Motion) | Shared client entry |
| `dist/assets/index-*.css` | 42 KB | Single stylesheet |

## Baseline

Screenshots of `/` and both case studies at 375px and 1280px (full page) are in `docs/baseline/`.

Lighthouse 12.8 ran locally in Playwright's Chromium (headless) against the baseline `dist/`, served by a static server that approximates Cloudflare: gzip for text, real 404s, and long caching for hashed `/assets`. (`tests/homepage-preview.mjs` sends `no-store` without compression, which understates performance.) Mobile uses Lighthouse's default profile with simulated slow 4G and 4× CPU throttling. These scores are a like-for-like local baseline for T-18, not production field data.

| Page | Profile | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | Mobile | 79 | 100 | 100 | 100 | 5.3 s | 0.001 |
| `/projects/codegraph` | Mobile | 98 | 100 | 100 | 100 | 2.1 s | 0 |
| `/projects/taskforge` | Mobile | 98 | 100 | 100 | 100 | 2.1 s | 0 |
| `/` | Desktop | 99 | 100 | 100 | 100 | 1.0 s | 0.001 |
| `/projects/codegraph` | Desktop | 100 | 100 | 100 | 100 | 0.4 s | 0 |
| `/projects/taskforge` | Desktop | 100 | 100 | 100 | 100 | 0.5 s | 0 |

Baseline findings for later tickets:

- Homepage mobile LCP is the 646 KB portrait JPEG (`aansh-singh-trim.jpg`), loaded at full size on every viewport. The existing WebP variants are unused. T-09 and T-18 address this.
- Lighthouse flags `label-content-name-mismatch` on the project buttons: the visible "Read case study" text is not contained in its `aria-label` "Read CodeGraph case study". It is advisory and does not affect the score.
- The shared client entry is 400 KB raw (about 128 KB gzip), mostly React, React Router and Framer Motion.

## After the redesign (T-18)

Measured October 18, 2026 on `redesign/aansh-times` with the same local method as the baseline (production build, gzip static server, Lighthouse 12.8, Playwright Chromium). Production was not measured: the branch is not merged or deployed. Run PageSpeed Insights on aanshsingh.com after deploying to record field-comparable numbers.

| Page | Profile | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | Mobile | 79 → **91** | 100 → 100 | 100 → 100 | 100 → 100 | 5.3 s → 3.0 s | 0.001 → 0.001 |
| `/projects/codegraph` | Mobile | 98 → **93** | 100 → 100 | 100 → 100 | 100 → 100 | 2.1 s → 2.7 s | 0 → 0.007 |
| `/projects/taskforge` | Mobile | 98 → **93** | 100 → 100 | 100 → 100 | 100 → 100 | 2.1 s → 2.7 s | 0 → 0.002 |
| `/` | Desktop | 99 → **100** | 100 → 100 | 100 → 100 | 100 → 100 | 1.0 s → 0.6 s | 0.001 → 0 |
| `/projects/codegraph` | Desktop | 100 → **100** | 100 → 100 | 100 → 100 | 100 → 100 | 0.4 s → 0.6 s | 0 → 0.003 |
| `/projects/taskforge` | Desktop | 100 → **100** | 100 → 100 | 100 → 100 | 100 → 100 | 0.5 s → 0.6 s | 0 → 0.022 |

| Asset | Before | After |
| --- | --- | --- |
| Shared JS (`index-*.js`) | 400 KB raw, 128 KB gzip | 286 KB raw, 92 KB gzip (Framer Motion removed) |
| CSS | 42 KB raw | 51 KB raw, 10 KB gzip |
| Fonts | 22 KB (Space Grotesk) | 162 KB across 9 self-hosted Latin subsets; 2 preloaded on the front page |
| Homepage portrait | 646 KB JPEG at every width | 19–45 KB AVIF (320/640/720w, single-image, not tiled), JPEG srcset fallback, original kept |

### Targets not met

The T-18 targets of mobile Performance 95+ and LCP under 2.0 s are **not met** for the simulated mobile profile: the home page scores 91 and the case studies 93, with LCP between 2.7 s and 3.0 s. Desktop scores 100 on every page, and CLS is near 0 everywhere.

The gap is the type design. With the web fonts removed as an experiment, the CodeGraph case study's mobile LCP fell from 2.8 s to 1.9 s and first paint from 2.6 s to 1.4 s. Under Lighthouse's simulated slow 4G, every face the first screen uses counts against first paint, even with `font-display: swap` (switching body faces to `optional` changed the score by about 1 point). Already done:

- Latin subsets only, self-hosted, with no third-party connection.
- The nameplate cut to "The Aansh Times" (5 KB) and the banner to capitals (3.5 KB); both preloaded.
- One IBM Plex Mono weight.
- Metric-matched local fallbacks, so the swap does not shift the page.
- The current page's code loaded before hydration, so the page never collapses to the loading fallback.

Reaching 95+ would mean dropping or deferring a family (for example, labels in a system sans or body text in Georgia), which changes the locked design direction. That is the owner's call.
