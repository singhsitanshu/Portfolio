import { Contact } from '../components/Contact';
import { CodeGraphFeature } from '../components/CodeGraphFeature';
import { TaskForgeFeature } from '../components/TaskForgeFeature';
import { homepage, profile, projects, experience } from '../content/site';
import { Box, Dateline, JumpLink, Kicker, Rule, SectionFront } from '../components/print';

// Native same-document fragment navigation can focus the alias after router effects.
// Forward that focus to the containing, named section as well.
function LegacyAnchor({ id }: { id: string }) {
  return <span id={id} className="anchor-alias" tabIndex={-1} onFocus={event => event.currentTarget.parentElement?.focus({ preventScroll: true })} />;
}

const [codegraph, taskforge] = projects;
const portraitSizes = '(min-width: 68.75em) 24rem, (min-width: 43.75em) 45vw, 92vw';

// The front page opens on Aansh: a full-width name banner, the original hero
// copy beside the portrait, and a ruled list of what he builds.
function Introduction() {
  const { portrait } = profile.hero;
  const copy = homepage.intro;
  return <section id="introduction" className="front-intro" aria-labelledby="introduction-title" tabIndex={-1}>
    <LegacyAnchor id="about" />
    <h1 id="introduction-title" className="name-banner"><span aria-hidden="true">{copy.banner}</span><span className="sr-only">{profile.name}</span></h1>
    <div className="np-grid intro-grid">
      <div className="intro-lede span-md-3 span-lg-4">
        <Kicker>{copy.kicker}</Kicker>
        <figure className="intro-photo">
          <picture className="halftone">
            <source type="image/webp" srcSet={portrait.webpSrcSet} sizes={portraitSizes} />
            <img src={portrait.src} srcSet={portrait.srcSet} sizes={portraitSizes} alt={portrait.alt} width={portrait.width} height={portrait.height} fetchPriority="high" loading="eager" decoding="async" />
          </picture>
          <figcaption className="caption">{portrait.caption}</figcaption>
        </figure>
        <p className="deck intro-perspective">{profile.hero.perspective}</p>
        <div className="body-copy drop-cap intro-body"><p><strong>{profile.hero.greeting} {profile.name}.</strong> {profile.hero.introduction}</p></div>
      </div>
      <div className="intro-focus span-md-3 span-lg-8 rule-md">
        <ul className="intro-focus-list display-ruled" aria-label={copy.focusLabel}>{copy.focus.map(item => <li key={item}>{item}</li>)}</ul>
        <Box as="div" className="intro-edition">
          <p className="label">{copy.editionLabel}</p>
          <ol>{projects.map((project, index) => <li key={project.id}>
            <span className="kicker">{project.story.kicker}</span>
            <JumpLink to={`/#${project.id}`} label={copy.editionPage(index)}>{project.story.headline}</JumpLink>
          </li>)}</ol>
        </Box>
      </div>
    </div>
  </section>;
}

export function Home() {
  return <>
    <Introduction />
    <section id="projects" className="front-page" aria-labelledby="projects-title" tabIndex={-1}>
      <LegacyAnchor id="work" />
      <SectionFront id="projects-title">{homepage.sections.projects}</SectionFront>
      <div className="np-grid front-stories">
        <CodeGraphFeature project={codegraph} />
        <TaskForgeFeature project={taskforge} />
      </div>
    </section>
    <div className="np-grid front-sections">
      <section id="experience" className="business span-lg-8" aria-labelledby="experience-title" tabIndex={-1}>
        <SectionFront id="experience-title" aside={homepage.experience.title}>{homepage.experience.section}</SectionFront>
        <ol className="briefs">
          {experience.map(entry => <li key={entry.organization} className="brief">
            <Dateline>{homepage.experience.dateline(entry)}</Dateline>
            <h3 className="headline-brief">{homepage.experience.headline(entry)}</h3>
            <ul className="brief-body">{entry.contributions.map(contribution => <li key={contribution}>{contribution}</li>)}</ul>
          </li>)}
        </ol>
      </section>
      <Box as="section" id="education" className="notice span-lg-4" aria-labelledby="education-title" tabIndex={-1}>
        <p className="kicker">{homepage.education.kicker}</p>
        <h2 className="section-head" id="education-title">{homepage.education.title}</h2>
        <Rule />
        <p className="headline-brief notice-institution">{profile.education.institution}</p>
        <p className="notice-detail">{profile.education.school}</p>
        <p className="notice-detail">{profile.education.degree}</p>
        <p className="dateline">{homepage.education.graduation} · {profile.education.expectedGraduation}</p>
      </Box>
    </div>
    <Contact />
  </>;
}
