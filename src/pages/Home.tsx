import { Heading } from '../components/ui';
import { Contact } from '../components/Contact';
import { CodeGraphFeature } from '../components/CodeGraphFeature';
import { TaskForgeFeature } from '../components/TaskForgeFeature';
import { homepage, profile, projects, experience } from '../content/site';
import { Entrance } from '../components/Motion';

// Native same-document fragment navigation can focus the alias after router effects.
// Forward that focus to the containing, named section as well.
function LegacyAnchor({ id }: { id: string }) {
  return <span id={id} className="anchor-alias" tabIndex={-1} onFocus={event => event.currentTarget.parentElement?.focus({ preventScroll: true })} />;
}

export function Home() {
  return <>
    <section id="projects" className="front-page np-grid" aria-labelledby="projects-title" tabIndex={-1}>
      <LegacyAnchor id="work" />
      <h2 id="projects-title" className="sr-only">{homepage.projects.title}</h2>
      {projects.map((project) => project.id === 'codegraph' ? <CodeGraphFeature key={project.id} project={project} /> : <div key={project.id} className="span-lg-4 rule-lg front-second"><TaskForgeFeature project={project} /></div>)}
    </section>
    <section id="introduction" className="hero" aria-label={profile.name} tabIndex={-1}>
      <LegacyAnchor id="about" />
      <Entrance className="hero-copy">
        <p className="hero-perspective">{profile.hero.perspective}</p>
        <p className="lede">{profile.hero.introduction}</p>
      </Entrance>
      <Entrance className="hero-portrait">
        <div className="portrait-frame">
          <picture className="portrait-image">
            <img src={profile.hero.portrait.src} alt={profile.hero.portrait.alt} width={profile.hero.portrait.width} height={profile.hero.portrait.height} fetchPriority="high" loading="eager" decoding="async" />
          </picture>
        </div>
        <p className="portrait-caption"><span aria-hidden="true">{homepage.hero.portraitIndex}</span> {profile.educationLabel}</p>
      </Entrance>
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
