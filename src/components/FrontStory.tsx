import type { ReactNode } from 'react';
import { homepage, profile, type Project } from '../content/site';
import { Byline, Deck, Headline, JumpLink, Kicker, PullQuote } from './print';

// A front-page project story (T-07): kicker, headline, deck, byline, pulled
// metric, body, stack and jump links, then the story's graphic.
export function FrontStory({ project, size, className = '', children }: {
  project: Project; size: 'lead' | 'secondary'; className?: string; children?: ReactNode;
}) {
  const { story } = project;
  const copy = homepage.projects;
  return <article id={project.id} className={`front-story front-story-${size} ${className}`} aria-labelledby={`${project.id}-title`} tabIndex={-1}>
    <header className="story-head">
      <Kicker>{story.kicker}</Kicker>
      <Headline as="h3" size={size} id={`${project.id}-title`}>{story.headline}</Headline>
      <Deck>{story.deck}</Deck>
      <Byline className="byline-with-photo"><img className="byline-photo" src={profile.hero.portrait.srcSet.split(' ')[0]} alt="" width={profile.hero.portrait.width} height={profile.hero.portrait.height} loading="lazy" decoding="async" />{story.byline}</Byline>
    </header>
    <div className="story-columns">
      <div className="story-body body-copy drop-cap">
        {story.body.map(paragraph => <p key={paragraph.text}>{paragraph.runIn && <strong>{paragraph.runIn} </strong>}{paragraph.text}</p>)}
      </div>
      <div className="story-aside">
        <PullQuote quote={story.pullQuote.quote} attribution={story.pullQuote.attribution} />
        <div className="story-stack">
          <p className="label">{copy.builtWith}</p>
          <ul className="mono" aria-label={copy.technologiesLabel(project.name)}>{story.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>
        </div>
        <div className="story-jumps">
          <JumpLink to={project.path}>{copy.caseStudyJump(project.name)}</JumpLink>
          <JumpLink to={project.repository} label={copy.sourceLabel}>{copy.githubJump(project.name)}</JumpLink>
        </div>
      </div>
    </div>
    {children}
  </article>;
}
