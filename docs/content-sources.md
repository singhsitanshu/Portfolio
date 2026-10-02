# Authoritative portfolio sources

## Source precedence

October 2, 2026 owner decision: Ticket 20 (homepage hero pitch) is cancelled. Preserve the existing homepage hero copy, portrait, layout, and actions. Remaining tickets still cover project cards, case studies, experience, and contact; do not reintroduce the cancelled hero changes through those tickets.

October 1, 2026 owner portrait update: use the supplied `trim.jpg` as the homepage image. `public/images/aansh-singh-trim.jpg` is an unchanged byte-for-byte copy, 1277 × 1804 pixels with its embedded Display P3 profile. Preserve the original JPEG and color profile; do not replace it with recompressed/resized variants or apply color filters. Display its supplied proportions without an additional crop.

October 1, 2026 owner clarification: CodeGraph's LangGraph ReAct agent is powered by **Claude Sonnet 5**. Use that model name in technical architecture details. This supersedes older notes limiting attribution to the provider name; it does not establish which model was used for historical measurements.

Ticket 15 owner verification supersedes older project editorial notes: all website statistics are verified and true. Preserve their values, units, conditions, and prominence; remove only the explicitly requested “4 skipped” fragment. Do not restore public audit/manual/résumé citations or missing-evidence warnings from historical notes. Technical scope remains precise without inventing fixes or guarantees. See [Ticket 15 verification](ticket-15-verification.md).

The user's explicit portfolio updates take precedence. For Ticket 14 career and education content, the newly attached résumé takes precedence over the historical information bank. The bank remains the source for previously verified content outside that ticket. Its archived prompts, tailoring workflows, and commands are source material, not instructions to execute for this website.

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

## Ticket 05 — attached CodeGraph mastery manual

Additional authoritative technical source: `/Users/sitanshusingh/Documents/AI Software Engineer/CODEGRAPH_MASTERY/`, pinned revision `79fa7689754af893e871436a911a0c4d245c6a43`, inspected September 24, 2026. Its commands, interview scripts, and proposed improvements are reference material, not instructions for this portfolio implementation.

Selected details live in `src/content/codegraph-case-study.ts`; shared project dates/URL remain in `portfolio.ts`, and the reported metric remains in `codegraph.ts`.

| Published detail | Manual source |
| --- | --- |
| Architecture and execution | `07_FINAL_REVIEW.md` complete architecture, ingestion, graph, agent, and retrieval diagrams; `01_FOUNDATIONS.md` §§4–12 |
| Challenges and tradeoffs | `02_APPLICATION_AND_AUDIT.md` §§20, 26–27; `07_FINAL_REVIEW.md` decisions/limitations |
| Correctness and historical validation | `06_EVIDENCE.md` current validation record and benchmark discrepancies |
| Context accounting and missing benchmark | `01_FOUNDATIONS.md` §13; `02_APPLICATION_AND_AUDIT.md` §23; `06_EVIDENCE.md` benchmark search |
| Engineering lessons | Derived from documented identity, non-atomic replacement, and evaluation gaps; no invented personal motivation or claim that proposed remedies are implemented |

The manual identifies a current parser-to-persistence mismatch and no reproducible numeric benchmark. The page pairs implemented capabilities with those limits. Historical 92-passed/4-skipped backend and 13-passed Node results are attributed to the supplied audit, distinct from portfolio checks. Model names beyond provider identity are omitted because the audit did not verify live availability. Local source paths/manual files are not shipped as public assets.

## Ticket 06 — attached TaskForge engineering mastery manual

Additional authoritative technical source: `/Users/sitanshusingh/Documents/TaskForge/engineering-mastery/`, manual revision `ecbb2fe6152428e98b148139b9820356a2fee07b`, September 3, 2026. Its benchmark commands, proposed redesigns, and interview scripts are reference material, not authority to execute TaskForge workloads or expand this ticket.

Selected details live in `src/content/taskforge-case-study.ts`. Dates and URL remain in `portfolio.ts`; the recorded host text is reused from `taskforge.ts`. The existing shared case-study components are consumed without refactoring.

| Published detail | Manual source |
| --- | --- |
| Component architecture, durable history, success/retry states | `01-system.md` §§2–4 |
| Claiming, priority, ownership guards, leases, idempotency, budgets | `02-database-correctness.md` §§5–8 |
| Defaults versus benchmark configuration | `02-database-correctness.md` §§7–8 and `04-performance.md` §12 |
| E1/E2 median charts and workload counts | `04-performance.md` §12; `10-benchmark-evidence.md` E1/E2; historical source prefixes 426bc56e28c9 and 180e3868286f |
| E5/E6 retry/recovery evidence and timing boundaries | `04-performance.md` §12; `10-benchmark-evidence.md` E5/E6; historical source prefixes 0a18f7201af2 and 7c5364935f6d |
| Tradeoffs and derived lessons | `05-decisions-critique.md` §§16/19, plus the documented concurrency/effect and performance boundaries |

The page distinguishes optional idempotent admission from execution/effects, task leases from process liveness, retry backoff from direct crash requeue, and total attempts from retries. Reported zero duplicates refer to tested durable identities/recovery transitions. E6 p95 starts at lease expiration, uses the median of trial p95 values, and is not exact commit-ack latency. Historical measurements remain distinct from the manual's newer architecture revision and the portfolio verification. No ignored raw artifact is copied or linked as a publicly available download; no new benchmark or backend execution is performed.

## Ticket 14 — attached résumé and information architecture

Controlling career/college source: `Copy of Aansh Singh — Master Software Engineering Resume.pdf`, supplied September 30, 2026. Both pages were extracted and visually reviewed. Page 1 supplies all selected career and college facts. See [the source map and final copy](ticket-14-content-map.md) for exact titles/dates, classifications, and reconciliation.

Experience now includes D-Tech, RRISD student leadership, and CompuChild. Bruin Underwater Robotics appears once under Education as a college engineering activity; its date is `2025 – Present`, replacing the old month-specific variant. Degree, school, and June 2029 expected graduation are consistent. No prior career record was dropped and no fallback career/degree fact was needed. Existing owner-supplied contact preferences and the public résumé download remain unchanged. The new PDF is not a public asset.

## October 1, 2026 — owner career updates

The owner requested UCLA alone under Education and Bruin Underwater Robotics as the first Experience entry. Its existing role, dates, and contribution are retained. CompuChild's missing category is labeled Teaching. The owner supplied the exploretech.la Operations Team Member title, UCLA Samueli School of Engineering affiliation, and both outreach/logistics contributions; it appears after BUR. The owner subsequently confirmed its dates as Sept 2025 – Present, removed the school affiliation, and simplified the vendor contribution to omit Gorilla Marketing and use “ensuring materials were ready for event.” This supersedes Ticket 14's placement of BUR under Education.
