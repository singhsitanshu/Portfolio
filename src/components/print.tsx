import type { HTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

// Print primitives (T-05). Section tickets assemble pages from these; styles
// live in src/styles/print.css and typography.css and use tokens only.

export function Rule({ variant = 'hairline', className = '' }: { variant?: 'hairline' | 'heavy' | 'double'; className?: string }) {
  return <hr className={`rule rule-${variant} ${className}`} aria-hidden="true" />;
}

export function Kicker({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`kicker ${className}`}>{children}</p>;
}

const headlineSizes = { lead: 'headline-lead', secondary: 'headline-secondary', brief: 'headline-brief', section: 'section-head' } as const;

export function Headline({ as: Tag = 'h2', size = 'secondary', id, className = '', children }: {
  as?: 'h1' | 'h2' | 'h3' | 'h4'; size?: keyof typeof headlineSizes; id?: string; className?: string; children: ReactNode;
}) {
  return <Tag id={id} className={`${headlineSizes[size]} ${className}`}>{children}</Tag>;
}

export function Deck({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`deck ${className}`}>{children}</p>;
}

export function Byline({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`byline ${className}`}>{children}</p>;
}

export function Dateline({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`dateline ${className}`}>{children}</p>;
}

// A pulled metric or phrase. Not a <blockquote>: these restate the story's own
// numbers, and <aside> would add a landmark inside <main>.
export function PullQuote({ quote, attribution, className = '' }: { quote: ReactNode; attribution?: ReactNode; className?: string }) {
  return <figure className={`pull-quote ${className}`}>
    <p className="pull-quote-text">{quote}</p>
    {attribution && <figcaption className="pull-quote-attribution">{attribution}</figcaption>}
  </figure>;
}

export function Figure({ caption, credit, id, className = '', children }: {
  caption: ReactNode; credit?: ReactNode; id?: string; className?: string; children: ReactNode;
}) {
  return <figure className={`np-figure ${className}`}>
    {children}
    <figcaption id={id}><span className="caption">{caption}</span>{credit && <span className="credit">{credit}</span>}</figcaption>
  </figure>;
}

// A bordered notice: a hairline frame with an inner second rule.
export function Box({ as: Tag = 'div', className = '', children, ...props }: HTMLAttributes<HTMLElement> & { as?: 'div' | 'section' | 'article' }) {
  return <Tag className={`np-box ${className}`} {...props}>{children}</Tag>;
}

// "Continued: …" link to the rest of a story. Internal paths use the router.
export function JumpLink({ to, label = 'Continued', className = '', children, ...props }: {
  to: string; label?: string; className?: string; children: ReactNode; 'aria-label'?: string;
}) {
  const content = <><span className="jump-link-label">{label}:</span> <span className="jump-link-target">{children}</span> <span aria-hidden="true">→</span></>;
  return to.startsWith('/')
    ? <Link className={`jump-link ${className}`} to={to} {...props}>{content}</Link>
    : <a className={`jump-link ${className}`} href={to} {...props}>{content}</a>;
}
