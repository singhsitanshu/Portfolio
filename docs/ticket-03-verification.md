# Ticket 03: CodeGraph homepage feature

## Changes

- Replaced only CodeGraph's homepage placeholder with a dedicated feature component, consuming centralized content from `src/content/codegraph.ts` and the existing shared project record.
- Introduced the ticket's question and positioned CodeGraph as repository intelligence for AI-assisted engineering.
- Added a static HTML/CSS figure with five numbered stages: files → functions → calls/dependencies → focused context → agent. It uses a semantic ordered list, visible explanations, a caption, and decorative symbols/arrows hidden from assistive technology.
- Added concise explanations of repository scope, source lookup, graph reasoning, and vector search. Source retrieval remains an application endpoint/UI capability, distinct from the seven registered agent tools.
- Featured approximately 737K → approximately 18K tokens per query and exactly the supplied 97.5% LLM context reduction. Neither cost, accuracy, nor latency claims are inferred.
- Mentioned the Claude-powered LangGraph ReAct agent and seven repository-scoped tools; technologies remain supporting context.
- Added a keyboard-accessible internal link to `/projects/codegraph` using the shared link primitive.

## Content provenance

All project facts come from the supplied information bank at `/Users/sitanshusingh/Downloads/resumes/information-bank/`. Archived commands and prompts were not executed as instructions. The introductory question comes from Ticket 03 itself.

| Visible content | Supplied source |
| --- | --- |
| Product positioning and problem/system synthesis | `projects/CODEGRAPH.md`, Product and ownership story |
| Files/functions/calls and repository scope | `projects/CODEGRAPH.md`, Ingestion and normalization; Graph, embeddings, and community structure |
| Source retrieval | `projects/CODEGRAPH.md`, Frontend and API experience; Agent tools distinction |
| Graph reasoning, communities, vector search | `projects/CODEGRAPH.md`, Graph, embeddings, and community structure; Agent tools |
| Seven tools / LangGraph ReAct agent | `projects/CODEGRAPH.md`, Agent tools; `04_METRICS.md` M09 |
| Context comparison / 97.5% reduction | `04_METRICS.md` M11–M12; original wording pointers B0013, B0032, B0185; `projects/CODEGRAPH.md`, verified resume outcome |
| Technologies | `projects/CODEGRAPH.md`, Core accomplishments and architecture sections |

The bank identifies the result as user-confirmed. The archived evidence ledger reports that original reproducible artifacts for the numeric benchmark were not found in the pinned repository snapshot. This does not override the authoritative bank's supplied result; the website labels it as a reported résumé result. No benchmark was rerun, no missing workload or hardware details were invented, and the rounded values were not used to recalculate 97.5%.

## Verification

- `npm run build` passed TypeScript and Vite production compilation.
- Inspected the production feature visually on desktop and at 320px, including the ordered flow and the result block.
- Browser assertions at 1280 × 800, 768 × 900, 375 × 812, and 320 × 700 verified all five stage labels/order, preserved approximate token values and exact 97.5%, correct direct-hash focus, no document overflow, and no feature elements outside the viewport.
- Diagram orientation was horizontal at 1280px and vertical at 768/375/320px.
- Computed styles confirmed no animation on feature elements. All explanations and results are present in the initial DOM; there is no animation, hover, or disclosure prerequisite. Existing reduced-motion support remains in place; OS preference emulation was not needed for this static feature.
- At desktop and mobile sizes, Enter on Explore CodeGraph rendered the existing `/projects/codegraph` placeholder with focus on main. Enter on Work returned to the homepage and focused work.
- Browser captured no console errors during these checks.
- No dependencies were added. TaskForge's placeholder, journey/contact content, and project-route implementation were not expanded.

## Blockers and boundaries

No missing dependency blocks Ticket 03. Original reproducible benchmark artifacts remain unavailable in the supplied bank and are tracked in `content-checklist.md`; supplied claims remain traceable to its metric register. The CodeGraph case study belongs to Ticket 05, TaskForge's feature to Ticket 04, and the broader motion pass to Ticket 07. None was implemented here.
