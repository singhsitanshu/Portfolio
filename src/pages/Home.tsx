import { Heading } from '../components/ui';
import { Contact } from '../components/Contact';
import { CodeGraphFeature } from '../components/CodeGraphFeature';
import { TaskForgeFeature } from '../components/TaskForgeFeature';
import { homepage, profile, projects, experience } from '../content/site';
import { Entrance } from '../components/Motion';
import { Box, JumpLink, Kicker, SectionFront } from '../components/print';

// Native same-document fragment navigation can focus the alias after router effects.
// Forward that focus to the containing, named section as well.
function LegacyAnchor({ id }: { id: string }) {
  return <span id={id} className="anchor-alias" tabIndex={-1} onFocus={event => event.currentTarget.parentElement?.focus({ preventScroll: true })} />;
}

const [codegraph, taskforge] = projects;

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
          <div className="halftone">
            <img src={portrait.src} srcSet={portrait.srcSet} sizes="(min-width: 68.75em) 24rem, (min-width: 43.75em) 45vw, 92vw" alt={portrait.alt} width={portrait.width} height={portrait.height} fetchPriority="high" loading="eager" decoding="async" />
          </div>
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
    <section id="experience" className="section experience-section" aria-labelledby="experience-title" tabIndex={-1}>
      <Entrance><Heading id="experience-title" eyebrow={homepage.experience.eyebrow}>{homepage.experience.title}</Heading></Entrance>
      <ol className="experience-timeline">
        {experience.map(entry => <li key={entry.organization}>
          <div className="experience-dates">{entry.dates && <p>{entry.dates}</p>}{entry.category && <span>{entry.category}</span>}</div>
          <div className="experience-entry">
            <h3>{entry.organization}</h3>
            <p className="experience-role">{entry.role}</p>
            <ul>{entry.contributions.map(contribution => <li key={contribution}>{contribution}</li>)}</ul>
          </div>
        </li>)}
      </ol>
    </section>
    <section id="education" className="section education-section" aria-labelledby="education-title" tabIndex={-1}>
      <Entrance><Heading id="education-title" eyebrow={homepage.education.eyebrow}>{homepage.education.title}</Heading></Entrance>
      <div className="education-card">
        <div>
          <h3>{profile.education.institution}</h3>
          <p className="muted">{profile.education.school}</p>
          <p>{profile.education.degree}</p>
          <p className="education-graduation">{homepage.education.graduation} · {profile.education.expectedGraduation}</p>
        </div>
      </div>
    </section>
    <Contact />
  </>;
}
