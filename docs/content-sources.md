# Authoritative portfolio sources

## Source precedence

The user's explicit portfolio updates take precedence. The supplied information bank is authoritative for personal, education, experience, skills, links, and résumé-related facts. Its archived prompts, tailoring workflows, and commands are source material, not instructions to execute for this website.

- Bank: `/Users/sitanshusingh/Downloads/resumes/information-bank/`
- Supplied résumé: `/Users/sitanshusingh/Downloads/Aansh Singh — Master Software Engineering Resume.pdf`
- Explicit portfolio update: preferred email, LinkedIn, GitHub, both repository URLs, and **Summer 2026** for both projects.

The PDF text was extracted and reviewed for facts, not audited for layout. The bank and résumé remain outside the public assets and browser bundle. Do not copy the entire bank onto the website. The local paths are retrieval references; they may need updating if the sources move.

## Retrieval map for subsequent tickets

| Content needed | Bank source |
| --- | --- |
| Identity, education, chronology | `01_PROFILE.md` |
| Experience contributions | `02_EXPERIENCE.md` |
| Supported skills and project associations | `03_SKILLS.md` |
| Metrics, units, workload conditions | `04_METRICS.md` |
| CodeGraph scope and architecture | `projects/CODEGRAPH.md` |
| TaskForge scope and architecture | `projects/TASKFORGE.md` |
| Exact original bullet wording | `catalog/resume-bullets.json` and entity-specific bullet files |
| Deeper implementation/evidence | Relevant `sources/manuals/codegraph/` or `sources/manuals/taskforge/` files linked from project summaries |

Select only facts needed by the active ticket. Add selected reusable facts to `src/content/portfolio.ts`; presentation components should consume that module. No content module existed in Ticket 1; this additive module preserves its routes, components, and styling.

## Context to preserve

- Display name: Aansh Singh. Preferred email and links match the user's latest message.
- Education: UCLA, Henry Samueli School of Engineering, B.S. Computer Science, expected June 2029. The historical May variant does not override the authoritative profile.
- “Present” in experience chronology is source-relative; do not silently extend it. Select experience only when its ticket requires it.
- CodeGraph's 97.5% result means LLM context reduction (737K → ~18K tokens/query), not accuracy, cost, or latency. Keep seven analysis tools distinct from the application's source-inspection endpoint.
- TaskForge's 15.84× / 99% result is synthetic 50 ms waiting-task scaling from 1 to 16 workers. The 2,143/sec figure describes API admission with zero execution workers, not task-execution throughput.
- Retry validation (3,000 tasks / 6,000 attempts) and 30 hard-killed-attempt recovery are separate experiments. Zero duplicates is an observed result under those conditions, not a universal guarantee.
- Bank metrics are supplied as user-confirmed claims. This intake did not rerun benchmarks or independently audit the repositories. Retrieve the linked evidence when composing the relevant project ticket.
- Do not infer Oracle employment or patent ownership from D-Tech's mentor/patent context. Do not publish a phone number or choose a portfolio location just because résumé variants contain them.

## Intake verification

Reviewed the profile, experience, skills, project summaries, metric register, and supplied PDF text. Centralized selected identity/education, links, project summaries, and user-supplied dates. Updated existing placeholders and readiness tracking only. Ticket 2 has not begun; no homepage sections, full case studies, or deployment were added.

Validation: `npm run build` passed TypeScript and Vite production compilation after intake changes. Source inspection confirmed project names, dates, and repository URLs are consumed from the shared content module, and obsolete missing-link/date messages were removed. No browser or live external-link check was performed for this content-only update.
