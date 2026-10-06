import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { homeSections } from '../content/navigation';
import { projects } from '../content/portfolio';

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

export function SectionNav() {
  const { pathname } = useLocation();
  const current = useCurrentSection(pathname);
  const nav = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [highlight, setHighlight] = useState({ x: 0, y: 0, width: 0, height: 0 });
  useEffect(() => {
    if (!hovered || !nav.current) return;
    const measure = () => {
      const link = nav.current?.querySelector<HTMLElement>(`[data-section="${hovered}"]`);
      if (link) setHighlight({ x: link.offsetLeft, y: link.offsetTop, width: link.offsetWidth, height: link.offsetHeight });
    };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(nav.current);
    return () => resize.disconnect();
  }, [hovered]);
  useEffect(() => { setHovered(null); }, [pathname]);
  return <nav ref={nav} className="primary-nav" aria-label="Primary" onPointerLeave={() => setHovered(null)}>
    <span aria-hidden="true" className="nav-highlight" data-visible={hovered !== null} style={{ transform: `translate(${highlight.x}px, ${highlight.y}px)`, width: highlight.width, height: highlight.height }} />
    {homeSections.map(section => <Link key={section.id} to={`/#${section.id}`} data-section={section.id}
      aria-current={current === section.id ? 'location' : undefined}
      onPointerEnter={event => { if (event.pointerType !== 'touch') setHovered(section.id); }}
    >{section.label}</Link>)}
  </nav>;
}
