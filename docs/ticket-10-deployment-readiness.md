# Ticket 10 — deployment readiness

Verified September 30, 2026. Scope follows the replacement attached Ticket 10: repository readiness for **Workers Static Assets**, with manual owner deployment afterward. It supersedes the older Pages/GitHub deployment ticket. No Cloudflare login, account configuration, DNS changes, integrations, Workers Builds, or publication was performed.

## Build and hosting contract

- Use a supported Node.js release ≥22.12 and npm with the committed lockfile. Verified with Node 26.7.0, npm 11.19.0, and pinned Wrangler 4.145.0. The repository was clean at intake; dependencies were freshly installed with `npm ci` before the successful final build.
- Build: `npm ci`, then `npm run build`. Deploy only the generated `dist/` assets. Prerendering runs during the build; its temporary server bundle is removed. Production needs no application server, secrets, runtime environment variables, or build-time variables.
- `wrangler.jsonc`: assets directory `./dist`, `html_handling: "drop-trailing-slash"`, `not_found_handling: "404-page"`. There is no Worker entry point, asset binding, account ID, route binding, or custom backend.
- `/` uses `index.html`; `/projects/codegraph` and `/projects/taskforge` use their generated `.html` files. Their trailing-slash and `.html` variants redirect to the extensionless paths. Unknown paths serve the existing `404.html` with HTTP 404 and `noindex`; do not switch to a homepage/SPA fallback.
- Canonical origin is **https://aanshsingh.com**, with `/` and both extensionless project paths. Canonical, Open Graph, social-image, sitemap, and robots URLs use that apex origin. The build also replaces React Router's inert localhost URL-parsing defaults with this origin; normal navigation still uses the browser origin.

## Repeat local verification

```sh
npm ci
npm run build
WRANGLER_SEND_METRICS=false npm run preview:cloudflare
```

In another terminal:

```sh
PREVIEW_URL=http://127.0.0.1:8787 CLOUDFLARE_PREVIEW_URL=http://127.0.0.1:8787 npm run check:production
node --experimental-strip-types --test tests/copy-email.test.mjs
```

`WRANGLER_SEND_METRICS` is an optional local tooling preference, not a portfolio build/runtime requirement. The preview runs locally with remote bindings disabled, serving the final build rather than Vite development output.

## Verification results

- Production build passes; all **7 production checks** and **2 clipboard unit checks** pass. Every generated non-HTML asset serves HTTP 200 with bytes matching `dist/`, including all lazy/shared JS chunks, CSS, favicon, JPEG/SVG social assets, résumé, sitemap, and robots. Generated links and hash targets resolve. Output contains no localhost/preview/placeholder-host or local filesystem references, test scripts, source maps, or deployed server bundle.
- At **1280 × 900** and **320 × 800**, all three routes render on direct visits and refreshes, with correct unique metadata and no horizontal overflow. Homepage project navigation, direct Work/About hashes, project-to-home hash focus, and 404 recovery work. Project visuals are the existing HTML/CSS diagrams; fonts are system fonts, so neither needs separate image/font downloads. Desktop and mobile screenshots were visually inspected.
- The résumé link opens the served PDF; HTTP checks verify the exact file from every page's root-relative path. Copy-email success feedback appears in the normal Cloudflare preview. The exact copied value is covered by the unit test; the in-app clipboard reader returned empty, so native pasteboard contents were not independently confirmed. Both permission-denied and unsupported-clipboard feedback were exercised at both widths using the existing test-only fault preview, and retained the selectable address/email link.
- External link destinations match the user-supplied GitHub profile, both repositories, and LinkedIn URLs. Read-only external retrieval confirmed the GitHub profile and TaskForge page; CodeGraph/LinkedIn retrieval was unavailable to the web tool, so their live third-party availability is not claimed. No link destinations or facts were changed.
- No unexpected browser console warnings/errors were observed. Custom missing-page, nested missing-page, and missing-asset responses return HTTP 404. Project slash/HTML variants redirect with HTTP 307 to the canonical paths. `git diff --check` passes.

## Manual owner steps after this ticket

1. In Cloudflare, ensure `aanshsingh.com` is an active zone in the account that will own the Worker; complete any required registrar/nameserver setup yourself.
2. From this repository, run `npm ci` and `npm run build`, then **you** run `npx wrangler login` and `npx wrangler deploy`. Select the intended account if prompted. This publishes `dist/` as the assets-only Worker named `aansh-singh-portfolio`; no source changes or GitHub/Workers Builds integration are needed.
3. In **Workers & Pages → aansh-singh-portfolio → Settings → Domains & Routes → Add → Custom Domain**, enter **aanshsingh.com** and add it. Allow Cloudflare's DNS/certificate provisioning to complete. Use the apex as the production hostname; if you also serve `www`, redirect it to the apex.
4. Check the live HTTPS homepage and both project routes directly and after refresh, Work/About hashes, résumé, `/sitemap.xml`, `/robots.txt`, `/social-preview.jpg`, and an unknown path (HTTP 404). Confirm the live canonical tags still point to the three apex URLs.

Hosting behavior follows [Cloudflare's static generation/404 documentation](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/) and [HTML handling](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/). Domain setup follows [Cloudflare's Custom Domains steps](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).

## Remaining blockers

None in the repository. Live DNS, certificate issuance, and deployment remain unverified until the owner performs the manual steps.

**Repository is deployment-ready. No additional source changes are required before Cloudflare deployment.**
