# The Aansh Times

aanshsingh.com, set as a broadsheet front page: the portfolio of Aansh Singh, a software engineer and UCLA computer science student. React, TypeScript, Vite and Tailwind CSS (preflight only), prerendered to static HTML and served by Cloudflare Workers Static Assets. Requires Node.js 22.12+ (or a supported newer release).

```sh
npm ci
npm run dev
npm run build
npm run preview
```

The routes are `/`, `/projects/codegraph` and `/projects/taskforge`. The front page opens with the masthead and an "AANSH" name banner, then the introduction and portrait, the CodeGraph and TaskForge stories, Business & Campus (experience), the Education notice, and Classifieds (contact). Each case study is an inside-page feature article. `/styleguide` (development only) shows every print style, the grid and the primitives.

## Structure

- `src/content/site.ts`: every user-facing homepage string, plus the facts shared with case studies and metadata. Layout components never hold copy.
- `src/content/codegraph.ts`, `taskforge.ts`, `*-case-study.ts`: measured results and case-study copy.
- `src/content/metadata.ts`: route titles, descriptions, Open Graph/Twitter tags, font preloads and the JSON-LD `Person`.
- `src/styles/tokens.css`: the single source of design tokens (color, type scale, spacing, rules, grid, motion). Every other stylesheet uses tokens only.
- `src/styles/fonts.css`: self-hosted Latin font subsets (`public/fonts/`, SIL OFL; see `OFL-LICENSES.txt`) and metric-matched local fallbacks.
- `src/styles/`: `typography`, `grid` (12/6/1 columns), `print` (primitives, paper grain), `masthead`, `front-page`, `infographics`, `article`, `motion`, `styleguide`.
- `src/components/print.tsx`: Rule, Kicker, Headline, Deck, Byline, Dateline, PullQuote, Figure, Box, SectionFront, JumpLink.
- `src/components/Masthead.tsx`: front-page masthead, the slim inside-page masthead, and the Inside Today index bar.
- `src/components/FrontStory.tsx`, `CodeGraphFeature.tsx`, `TaskForgeFeature.tsx`: front-page stories and their infographics.
- `src/components/CaseStudyLayout.tsx`: the feature-article template.
- `src/components/Motion.tsx`: the Reduce motion preference. Motion itself is CSS (`styles/motion.css`).
- `src/entry-server.tsx` and `scripts/prerender.mjs`: build-time rendering of complete pages; no deployed server bundle.
- `public/aansh-singh-resume.pdf`: the supplied résumé, unchanged.

## Static hosting

`npm run build` emits `dist/index.html`, `dist/projects/codegraph.html`, `dist/projects/taskforge.html` and `dist/404.html`, with complete rendered content and route-specific head metadata. It also generates `sitemap.xml` and `robots.txt`. The client loads the current page's code before hydrating, then lazy-loads other pages. The temporary `.prerender/` server bundle is removed after generation.

There is no production server runtime, CMS, authentication or form service. `wrangler.jsonc` configures **Cloudflare Workers Static Assets** to serve `dist/`, drop trailing slashes on project URLs, and serve the generated `404.html` with HTTP 404 for unknown paths ([static routing documentation](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/)). Run `npm run preview:cloudflare` after building to verify these rules locally.

To deploy, run `npm ci` and `npm run build`, then `npx wrangler login` and `npx wrangler deploy`. This publishes `dist/` as the assets-only Worker `aansh-singh-portfolio`. Production needs no server, secrets or environment variables.

The canonical URLs are `https://aanshsingh.com/`, `https://aanshsingh.com/projects/codegraph` and `https://aanshsingh.com/projects/taskforge`. Unknown pages are `noindex` and have no canonical tag.

## Checks

- `node --experimental-strip-types --test tests/*.test.mjs`: generated output (metadata, links and fragments, JSON-LD, fonts, images, stories, sections), navigation anchors, and copy-email behavior.
- `npm run check:production` after a build; with a preview server running, `PREVIEW_URL=http://127.0.0.1:4177 npm run check:production` also checks HTTP routes, assets and 404s.
- `node tests/homepage-preview.mjs` serves `dist/` for manual checks, with `?clipboard=denied|unsupported`, `?motion=system-reduced`, `?text=200` and `?audit=1` (axe-core from `AXE_SCRIPT_PATH`). None of these ship.

Canonical homepage anchors are `#main`, `#projects`, `#experience`, `#education` and `#contact`; legacy `#work` and `#about` still resolve.

## Social preview capture and refresh

The share image, `public/social-preview-times-v1.jpg` (1200 × 630), is the front page's masthead and name banner. To reproduce it:

1. Run `npm run build`, then `node scripts/social-preview.mjs`. The script copies the masthead, name banner and stylesheets from the generated homepage into ignored `.social-preview/` files.
2. Run `node tests/homepage-preview.mjs` and open `http://127.0.0.1:4176/_test/social-preview.html` at a **1200 × 630 CSS-pixel viewport**, device scale 1. Wait for `document.fonts.status === 'loaded'`.
3. Capture only the viewport as JPEG and save it under a **new filename** in `public/`. Update `site.image` in `src/content/metadata.ts`, the `image` constant in `scripts/social-preview.mjs`, and the `socialImage` fixture in `tests/production.test.mjs`. Review `/_test/social-preview-small.html` (360 × 189) and `/_test/social-preview-center.html` (630 × 630).

The masthead's edition date is the build date, so the share image shows the date it was captured. Older share images stay in `public/` for old links. After deploying, fetch the canonical pages without JavaScript and confirm the new image URL, then request a re-scrape in Meta's [Sharing Debugger](https://developers.facebook.com/tools/debug/) or LinkedIn's [Post Inspector](https://www.linkedin.com/post-inspector/).
