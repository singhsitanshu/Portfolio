import { Link, type LinkProps } from 'react-router-dom';

// An internal text link in the paper's link style.
export function TextLink({ className = '', ...props }: LinkProps) {
  return <Link className={`text-link ${className}`} {...props} />;
}
