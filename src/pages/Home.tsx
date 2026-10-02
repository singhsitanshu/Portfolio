import { Heading } from '../components/ui';
import { Contact } from '../components/Contact';
import { CodeGraphFeature } from '../components/CodeGraphFeature';
import { TaskForgeFeature } from '../components/TaskForgeFeature';
import { profile, projects, experience } from '../content/portfolio';
import { Entrance } from '../components/Motion';

// Native same-document fragment navigation can focus the alias after router effects.
// Forward that focus to the containing, named section as well.
function LegacyAnchor({ id }: { id: string }) {
  return <span id={id} className="anchor-alias" tabIndex={-1} onFocus={event => event.currentTarget.parentElement?.focus({ preventScroll: true })} />;
}

export function Home() {
  return <>
    <section id="introduction" className="hero" aria-labelledby="hero-title" tabIndex={-1}>
      <LegacyAnchor id="about" />
      <Entrance className="hero-copy">
        <p className="eyebrow hero-role">{profile.role} / {profile.educationLabel}</p>
        <p className="hero-greeting">{profile.hero.greeting}</p>
        <h1 id="hero-title">{profile.name}<span className="hero-period">.</span></h1>
        <p className="hero-perspective">{profile.hero.perspective}</p>
        <p className="lede">{profile.hero.introduction}</p>
        <div className="actions hero-actions">
          <a className="button" href="#projects">View Projects <span aria-hidden="true">↗</span></a>
          <a className="button button-secondary" href={profile.resumeUrl}>Resume <span className="file-label">PDF</span></a>
        </div>
        <nav className="hero-socials" aria-label="Social profiles">
          <a href={profile.links.github}>GitHub <span aria-hidden="true">↗</span></a>
          <a href={profile.links.linkedin}>LinkedIn <span aria-hidden="true">↗</span></a>
        </nav>
      </Entrance>
      <Entrance className="hero-portrait">
        <div className="portrait-frame">
          <picture className="portrait-image">
            <img src={profile.hero.portrait.src} alt={profile.hero.portrait.alt} width={profile.hero.portrait.width} height={profile.hero.portrait.height} fetchPriority="high" loading="eager" decoding="async" />
          </picture>
        </div>
        <p className="portrait-caption"><span aria-hidden="true">01 /</span> {profile.educationLabel}</p>
      </Entrance>
    </section>
    <section id="projects" className="section projects-section" aria-labelledby="projects-title" tabIndex={-1}>
      <LegacyAnchor id="work" />
      <Entrance><Heading id="projects-title" eyebrow="01 / Selected projects">Projects</Heading></Entrance>
      <div className="project-showcases">
        {projects.map((project) => project.id === 'codegraph' ? <CodeGraphFeature key={project.id} project={project} /> : <TaskForgeFeature key={project.id} project={project} />)}
      </div>
    </section>
    <section id="experience" className="section experience-section" aria-labelledby="experience-title" tabIndex={-1}>
      <Entrance><Heading id="experience-title" eyebrow="02 / Career & leadership">Experience</Heading></Entrance>
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
      <Entrance><Heading id="education-title" eyebrow="03 / College">Education</Heading></Entrance>
      <div className="education-card">
        <div>
          <h3>{profile.education.institution}</h3>
          <p className="muted">{profile.education.school}</p>
          <p>{profile.education.degree}</p>
          <p className="education-graduation">Expected graduation · {profile.education.expectedGraduation}</p>
        </div>
      </div>
    </section>
    <Contact />
  </>;
}
