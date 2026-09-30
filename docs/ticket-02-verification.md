# Ticket 02: Homepage shell, navigation, and personal content

## Changes

- Replaced the root foundation preview with hero → CodeGraph → TaskForge → about/journey → contact.
- Preserved Ticket 01 tokens, shared primitives, React routing, and reduced-motion configuration. No dependencies added.
- Added responsive Work/About/Resume/GitHub/LinkedIn navigation and all four required hero actions.
- Reserved large project sections with sourced summaries and real repository links. Detailed project features/case studies remain explicitly deferred; no links imply completed case studies.
- Centralized personal positioning, education, résumé URL, and three sourced journey entries in the content module. Dates come from the authoritative bank; “Present” remains relative to the September 2026 source collection.
- Served the supplied PDF unchanged and added mailto plus copy-email feedback in a live status region.
- Fixed fragment navigation after the destination route renders: a valid hash target receives focus without an implicit scroll, then scrolls into view instantly. Initial direct hash loads and cross-route links now work. Normal route changes still focus main and return to the top; malformed fragments are ignored safely.

## Checks

- `npm run build`: TypeScript and production bundle passed; static PDF included in dist.
- `node --experimental-strip-types --test tests/copy-email.test.mjs`: both tests passed, covering exact copied value, success, denied permission, and missing Clipboard API.
- Development server: homepage rendered at desktop and 375 × 812 mobile dimensions. Mobile document width equals viewport width (375px), with no horizontal overflow.
- Browser: Explore My Work focuses its work target; keyboard activation of About focuses its section. All hero anchor targets exist. Copy-email displayed success at desktop and mobile sizes.
- Navigation link destinations matched the user's supplied GitHub/LinkedIn/repository URLs and preferred email. External profiles were not independently audited; no email was sent.
- Static résumé HTTP check: 200, application/pdf. Served bytes, public asset, production asset, and original source match. In-app PDF viewer was blank, so delivery was verified by HTTP and byte comparison rather than viewer rendering.
- Reduced-motion support inherited; no new motion effects introduced.

## Completion checks — September 30, 2026

The interrupted implementation's verification record was already present. The follow-up audit identified cross-route hash navigation as broken and clipboard failure rendering as unverified. The following checks close those gaps against the rebuilt production bundle.

### Hash navigation

At **1280 × 800** and **375 × 812**, all 12 cases passed:

| Entry point | Destination | Result at both sizes |
| --- | --- | --- |
| Direct URL load | `/#work` | Work focused; top approximately 24px below viewport edge |
| Direct URL load | `/#about` | About focused; top approximately 24px below viewport edge |
| `/projects/codegraph` → Work | `/#work` | Work focused and scrolled into view |
| `/projects/codegraph` → About | `/#about` | About focused and scrolled into view |
| `/projects/taskforge` → Work | `/#work` | Work focused and scrolled into view |
| `/projects/taskforge` → About | `/#about` | About focused and scrolled into view |

Cross-route checks activated the real navigation links using Enter. Direct URL checks loaded the homepage from a different route, rather than merely changing the hash in an already-mounted homepage. DOM assertions verified the focused element and target position (24px ± 2px). The mobile direct Work URL was also reloaded and visually inspected. No horizontal overflow appeared in the direct-load checks.

### Clipboard feedback in the rendered UI

All four end-to-end failure cases passed: rejected `writeText` and unavailable Clipboard API, each at desktop and mobile sizes. The test-only preview serves the real production HTML/assets with a pre-load browser-environment override; the application has no test hooks and the preview is not deployed.

After activating Copy email with Enter, each case rendered:

> Couldn’t copy automatically. Select and copy singhsitanshu@ucla.edu, or use the email link.

Assertions checked the exact message in the polite live status region, the re-enabled button, the correct mailto fallback, and absence of horizontal overflow. The mobile failure message was visually inspected for wrapping and readability. These are controlled browser fault simulations, not changes to the user's actual clipboard permissions. The existing success/helper checks also passed.

To reproduce the rendered failure checks:

```sh
npm run build
node tests/homepage-preview.mjs
```

Open `http://127.0.0.1:4176/?clipboard=denied#contact` and `http://127.0.0.1:4176/?clipboard=unsupported#contact`, activate Copy email, and check the feedback and fallback link. Normal hash checks ran against a separate unmodified `npm run preview` server.

### Project prominence

The reserved shell is acceptable for Ticket 02 based on visual hierarchy, placement, and substantial dedicated space:

| Width | Combined Work height | Hero height | About height | Project / About heading size |
| --- | --- | --- | --- | --- |
| 1280px | 1088px | 674px | 655px | 76.8px / 44px |
| 375px | 1024px | 911px | 1019px | 44px / 28px |

Work is the largest continuous content region at both sizes, immediately follows the hero, and has larger headings than About. The earlier audit's approximately 37% desktop / 30% mobile height share remains accurate; a majority-height threshold is not specified by the ticket. This review accepts the deliberately reserved project shells without inflating empty space or implementing their future feature content. No layout changes were needed.

### Build and scope

- `npm run build` passed after the hash fix.
- `node --experimental-strip-types --test tests/copy-email.test.mjs` passed both tests.
- Changes are limited to fragment handling, the local test fixture, and this verification record. No Ticket 03 work or unrelated refactoring was performed.

## Blockers / scope

No Ticket 02 blockers. Full project features (Tickets 03–04), case studies (05–06), motion pass, deployment, and broader accessibility/production-readiness tickets remain unimplemented. No backend, form, CMS, or invented metrics added.
