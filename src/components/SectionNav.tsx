import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { homeSections } from '../content/navigation';
import { projects, ui } from '../content/site';

// Read actual section positions so scrolling, history restoration, and layout
// changes all use the same definition of the current section.
function useCurrentSection(pathname: string) {
  const [current, setCurrent] = useState<string | null>(null);
  useEffect(() => {
    if (pathname !== '/') return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const sections = homeSections.map(({ id }) => document.getElementById(id));
      let next: string | null = null;
      for (const section of sections) {
        if (!section) continue;
        const inset = parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
        if (section.getBoundingClientRect().top <= inset + 1) next = section.id;
      }
      // Contact may be too short to reach the top of the viewport.
      if (next && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) next = 'contact';
      setCurrent(next);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resize = new ResizeObserver(schedule);
    resize.observe(document.body);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('pageshow', schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('pageshow', schedule);
    };
  }, [pathname]);
  return pathname === '/' ? current : projects.some(project => project.path === pathname) ? 'projects' : null;
}

export function SectionNav({ label }: { label?: string }) {
  const { pathname } = useLocation();
  const current = useCurrentSection(pathname);
  return <nav className="primary-nav" aria-label={ui.primaryNavLabel}>
    {label && <p className="index-label" aria-hidden="true">{label}</p>}
    <ul className="index-links">
      {homeSections.map(section => <li key={section.id}><Link to={`/#${section.id}`} aria-current={current === section.id ? 'location' : undefined}>{section.label}</Link></li>)}
    </ul>
  </nav>;
}
