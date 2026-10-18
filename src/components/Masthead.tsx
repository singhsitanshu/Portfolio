import { NavLink } from 'react-router-dom';
import { masthead, profile, ui } from '../content/site';
import { Rule } from './print';
import { SectionNav } from './SectionNav';

// The build date, fixed at build time so prerendered and hydrated markup match.
const edition = new Date(`${__EDITION_DATE__}T12:00:00Z`);
const editionLabel = new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(edition);

function ResumeLink({ className = '' }: { className?: string }) {
  return <a className={`ear-link ${className}`} href={profile.resumeUrl} target="_blank" rel="noopener">
    {ui.resume.label} <span className="ear-file">{ui.resume.fileLabel}</span><span className="sr-only"> {ui.newTab}</span>
  </a>;
}

// Front page: nameplate between two ears, edition bar between double rules.
export function FrontMasthead() {
  return <header className="masthead np-sheet">
    <div className="masthead-top">
      <div className="masthead-ear masthead-ear-left">
        <p className="masthead-motto">“{masthead.motto}”</p>
        <ResumeLink />
      </div>
      <p className="masthead-title">
        <span className="masthead-name">{profile.name}</span><span className="sr-only">, </span>
        <span className="nameplate">{masthead.nameplate}</span>
      </p>
      <nav className="masthead-ear masthead-ear-right" aria-label={ui.socialLabel}>
        <a className="ear-link" href={profile.links.github}>{ui.github}</a>
        <a className="ear-link" href={profile.links.linkedin}>{ui.linkedin}</a>
      </nav>
    </div>
    <Rule variant="double" />
    <p className="edition-bar">
      {masthead.edition.map(item => <span key={item}>{item}</span>)}
      <time dateTime={__EDITION_DATE__}>{editionLabel}</time>
    </p>
    <Rule variant="hairline" />
  </header>;
}

// The "Inside Today" index: a thin bar under the nameplate that sticks on desktop.
export function IndexBar() {
  return <div className="index-bar">
    <div className="index-bar-inner np-sheet">
      <NavLink className="index-home" to="/" aria-label={ui.homeLink.label}>{ui.homeLink.initials[0]}<span aria-hidden="true">{ui.homeLink.separator}</span>{ui.homeLink.initials[1]}</NavLink>
      <SectionNav label={masthead.indexLabel} />
    </div>
  </div>;
}
