# Ticket 19 — solo project ownership

Implemented October 2, 2026. Scope: shared project attribution, homepage card labels, case-study header attribution, source notes, and verification evidence.

## Implementation

`src/content/portfolio.ts` now records settled solo ownership for both projects, using one shared Summer 2026 period and **Solo project · Summer 2026** label. Homepage cards consume this label; their rendered wording is unchanged. Case-study headers consume the same label and the project's first-person ownership statement and full implementation scope directly from shared data. The previously unused optional ownership prop is replaced with the required project attribution.

Each case study states: “I designed and built [project] independently during summer 2026, before the school year began.” The following sentence explicitly describes work across the full system:

- CodeGraph: repository ingestion and parsing, graph and retrieval pipeline, API, and interactive dashboard.
- TaskForge: API and console, PostgreSQL task and attempt model, Go workers and schedulers, observability, and benchmark harness.

The ownership paragraph follows the existing achievement summary and precedes the technical overview in both document and visual order. The label precedes the project heading. Existing system-behavior explanations remain intact; no deeper engineering stories were added.

`docs/content-sources.md` records the October 1 owner clarification and its boundaries. Public copy adds no team/client/employment sponsorship, partial-contribution implication, college-entry claim, precise dates, duration, or adoption claim. Existing library/model attributions, metrics, configuration, experience, homepage hero, links, and résumé are preserved. All four inspected project content modules remain unchanged because the rendered attribution comes from the shared project records.

## Checks actually performed

| Check | Outcome |
| --- | --- |
| `npm run build` | Passed TypeScript, Vite client/SSR builds, and static route prerendering. |
| `npm run check:production` | 9 passed, 0 failed; 2 optional HTTP/Workers checks skipped because their environment URLs were not supplied. |
| `git diff --check` | Passed. |
| Prerendered copy | Both homepage labels are present. Both case-study headers contain the exact label, ownership statement, and scope from shared data. Each header has one first-person ownership statement. |
| Semantic reading order | Label → heading → existing introduction → measured results → ownership and full scope → technical overview. Browser DOM and prerendered HTML agree. No section/navigation reorder or new interactive element. |
| Responsive browser inspection | Inspected `/`, `/projects/codegraph`, and `/projects/taskforge` at 1440×900, 768×1024, and 390×844. All labels match. No horizontal document overflow on any inspected route/size. |
| Case-study visual review | Reviewed both introductions at all three sizes. Ownership paragraphs wrap to 2 desktop, 3 tablet, and 6 mobile lines. The full statements remain readable without clipping. Captures include the label, heading, introduction, existing results, and ownership paragraph. |
| Fact preservation | Compared shared content exports against the initial committed version: all pre-existing project fields and all profile, career, and readiness facts are identical. Only ownership fields were added. Other project content modules and styles have no changes. |

Evidence: [browser checks](verification/ticket-19/browser-checks.json) and [prerender/fact checks](verification/ticket-19/content-checks.json). The fact/prerender assertions were one-time verification commands; no prose-only regression tests were added.

| Case study | Desktop | Tablet | Mobile |
| --- | --- | --- | --- |
| CodeGraph | [Introduction](verification/ticket-19/codegraph-desktop.jpg) | [Introduction](verification/ticket-19/codegraph-tablet.jpg) | [Introduction](verification/ticket-19/codegraph-mobile.jpg) |
| TaskForge | [Introduction](verification/ticket-19/taskforge-desktop.jpg) | [Introduction](verification/ticket-19/taskforge-tablet.jpg) | [Introduction](verification/ticket-19/taskforge-mobile.jpg) |

Screenshots are cropped to each introduction through its ownership paragraph at the recorded viewport size; mobile captures extend below the first screen.

No focused navigation or copy-email tests were run because navigation/contact behavior is unchanged. No browser run with JavaScript disabled, deployed-link check, deployment, project benchmark rerun, or Ticket 21 integration pass was performed. Critical attribution was checked directly in prerendered HTML.

## Blockers

No missing required dependency or remaining implementation blocker. The local preview server initially encountered the sandbox's port-listening restriction and ran successfully with the permitted sandbox override. Optional HTTP/Workers production checks remain unperformed as described above. Changes are limited to Ticket 19.
