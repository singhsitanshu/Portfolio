import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

export function Container({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`container ${className}`} {...props} />;
}

export function Heading({ as: Tag = 'h2', eyebrow, children, id }: {
  as?: 'h1' | 'h2' | 'h3'; eyebrow?: string; children: ReactNode; id?: string;
}) {
  return <div className="heading-group">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<Tag id={id}>{children}</Tag></div>;
}

export function Button({ className = '', type = 'button', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={`button ${className}`} {...props} />;
}

export function TextLink({ className = '', ...props }: LinkProps) {
  return <Link className={`text-link ${className}`} {...props} />;
}

// Keep metrics honest: unavailable values have an explicit evidence status.
export function Metric({ label, value, note }: { label: string; value?: string; note: string }) {
  return <div className="metric"><dt>{label}</dt><dd><span>{value ?? 'Pending'}</span><p>{note}</p></dd></div>;
}
