import { Heading } from '../components/ui';
import { Contact } from '../components/Contact';
import { CodeGraphFeature } from '../components/CodeGraphFeature';
import { TaskForgeFeature } from '../components/TaskForgeFeature';
import { profile, projects, journey } from '../content/portfolio';
import { Entrance } from '../components/Motion';

export function Home() {
  return <>
    <section className="hero" aria-labelledby="hero-title">
      <Entrance className="hero-copy">
        <p className="eyebrow hero-role">{profile.role} / {profile.educationLabel}</p>
        <p className="hero-greeting">{profile.hero.greeting}</p>
        <h1 id="hero-title">{profile.name}<span className="hero-period">.</span></h1>
        <p className="hero-perspective">{profile.hero.perspective}</p>
        <p className="lede">{profile.hero.introduction}</p>
        <div className="actions hero-actions">
          <a className="button" href="#work">View Projects <span aria-hidden="true">↗</span></a>
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
            <source type="image/webp" srcSet={profile.hero.portrait.srcSet} sizes="(max-width: 52rem) min(27.5rem, 90vw), (max-width: 75rem) 40vw, 27.5rem" />
            <img src={profile.hero.portrait.src} alt={profile.hero.portrait.alt} width={profile.hero.portrait.width} height={profile.hero.portrait.height} fetchPriority="high" loading="eager" decoding="async" />
          </picture>
        </div>
        <p className="portrait-caption"><span aria-hidden="true">01 /</span> {profile.educationLabel}</p>
      </Entrance>
    </section>
    <div id="work" className="project-showcases" tabIndex={-1}>
      {projects.map((project) => project.id === 'codegraph' ? <CodeGraphFeature key={project.id} project={project} /> : <TaskForgeFeature key={project.id} project={project} />)}
    </div>
    <section id="about" className="section about-section" aria-labelledby="about-title" tabIndex={-1}>
      <div>
        <Entrance><Heading id="about-title" eyebrow="03 / About & journey">Curiosity, put to work.</Heading></Entrance>
        <p className="about-copy">{profile.introduction}</p>
        <p className="status">{profile.education.degree}<br />{profile.education.institution}<br />Expected graduation · {profile.education.expectedGraduation}</p>
      </div>
      <ol className="journey">
        {journey.map((entry) => <li key={entry.organization}><p className="eyebrow">{entry.dates}</p><h3>{entry.organization}</h3><p className="journey-role">{entry.role}</p><p className="muted">{entry.summary}</p></li>)}
      </ol>
    </section>
    <Contact />
  </>;
}
