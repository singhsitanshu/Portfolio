import { Heading } from '../components/ui';
import { Contact } from '../components/Contact';
import { CodeGraphFeature } from '../components/CodeGraphFeature';
import { profile, projects, journey } from '../content/portfolio';

export function Home() {
  return <>
    <section className="hero" aria-labelledby="hero-title">
      <div>
        <p className="eyebrow">{profile.role} / {profile.educationLabel}</p>
        <h1 id="hero-title">{profile.name.split(' ')[0]}<br /><span className="muted">{profile.name.split(' ').slice(1).join(' ')}<span className="hero-period">.</span></span></h1>
        <p className="lede">{profile.positioning}</p>
        <div className="actions">
          <a className="button" href="#work">Explore My Work <span aria-hidden="true">↓</span></a>
          <a className="text-link" href={profile.resumeUrl}>Resume <span className="file-label">PDF</span></a>
          <a className="text-link" href={profile.links.github}>GitHub</a>
          <a className="text-link" href={profile.links.linkedin}>LinkedIn</a>
        </div>
      </div>
      <aside className="hero-index" aria-label="Selected work index">
        <p className="eyebrow">Selected work / {projects[0].dates}</p>
        {projects.map((project, index) => <a key={project.id} href={`#${project.id}`}><span className="eyebrow">0{index + 1}</span><span>{project.name}</span><span aria-hidden="true">↘</span></a>)}
        <p className="hero-index-note">From understanding code<br />to coordinating execution.</p>
      </aside>
    </section>
    <div id="work" tabIndex={-1}>
      {projects.map((project, index) => project.id === 'codegraph' ? <CodeGraphFeature key={project.id} project={project} /> : <section id={project.id} key={project.id} className="section project-shell" aria-labelledby={`${project.id}-title`} tabIndex={-1}>
        <div className="project-meta"><span className="eyebrow">0{index + 1} / Selected work</span><span className="eyebrow">{project.dates}</span></div>
        <div className="project-shell-body">
          <Heading id={`${project.id}-title`}>{project.name}</Heading>
          <div><p className="project-summary">{project.summary}</p><a className="text-link" href={project.repository}>View repository <span aria-hidden="true">↗</span></a></div>
        </div>
        <p className="project-shell-note">Project overview · Detailed feature forthcoming</p>
      </section>)}
    </div>
    <section id="about" className="section about-section" aria-labelledby="about-title" tabIndex={-1}>
      <div>
        <Heading id="about-title" eyebrow="03 / About & journey">Curiosity, put to work.</Heading>
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
