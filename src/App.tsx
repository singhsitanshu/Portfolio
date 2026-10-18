import { lazy, Suspense, useEffect, useRef, type ComponentType, type RefObject } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { MotionProvider, MotionRule, MotionToggle } from './components/Motion';
import { SectionNav } from './components/SectionNav';
import { Container } from './components/ui';
import { RouteMetadata } from './components/RouteMetadata';
import { NotFound } from './pages/NotFound';
import { projects, profile, ui, type Project } from './content/site';
import { anchorIdFor } from './content/navigation';

// Development-only print reference; the production build drops this route and chunk.
const Styleguide = import.meta.env.DEV ? lazy(() => import('./pages/Styleguide').then(module => ({ default: module.Styleguide }))) : null;

export type PageComponents = { Home: ComponentType; CodeGraphCaseStudy: ComponentType<{ project: Project }>; TaskForgeCaseStudy: ComponentType<{ project: Project }> };

// Commit focus effects with the resolved page, including lazily loaded routes.
function RoutedContent({ main, pages }: { main: RefObject<HTMLElement | null>; pages: PageComponents }) {
  const { Home, CodeGraphCaseStudy, TaskForgeCaseStudy } = pages;
  const { pathname, hash, key } = useLocation();
  const previousPath = useRef(pathname);
  useEffect(() => {
    const pathChanged = previousPath.current !== pathname;
    previousPath.current = pathname;
    // Hash targets exist after React commits the destination route, including
    // a direct URL load where the browser tried to scroll before it mounted.
    const anchorId = anchorIdFor(pathname, hash);
    const target = anchorId ? document.getElementById(anchorId) : null;
    if (target) {
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: 'start', behavior: 'instant' });
    } else if (pathChanged) {
      main.current?.focus();
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, key]);
  return <Routes>
    <Route path="/" element={<Home />} />
    {projects.map((project) => <Route key={project.id} path={project.path} element={project.id === 'codegraph' ? <CodeGraphCaseStudy project={project} /> : <TaskForgeCaseStudy project={project} />} />)}
    {Styleguide && <Route path="/styleguide" element={<Styleguide />} />}
    <Route path="*" element={<NotFound />} />
  </Routes>;
}

export function App({ pages }: { pages: PageComponents }) {
  const { pathname } = useLocation();
  const main = useRef<HTMLElement>(null);
  return <MotionProvider>
    <RouteMetadata />
    <a className="skip-link" href="#main">{ui.skipLink}</a>
    <Container>
      <header className="site-header">
        <NavLink className="wordmark" to="/" aria-label={ui.homeLink.label}>{ui.homeLink.initials[0]}<span aria-hidden="true">{ui.homeLink.separator}</span>{ui.homeLink.initials[1]}</NavLink>
        <SectionNav />
        <a className="text-link header-resume" href={profile.resumeUrl}>{ui.resume.label} <span className="file-label">{ui.resume.fileLabel}</span></a>
      </header>
      <main id="main" ref={main} tabIndex={-1}>
        <MotionRule key={pathname} className="route-motion" route />
        <Suspense fallback={<p className="status" role="status">{ui.loading}</p>}><RoutedContent main={main} pages={pages} /></Suspense>
      </main>
      <footer className="site-footer"><span>{profile.name} / {profile.role}</span><nav aria-label={ui.footerSocialLabel}><a href={profile.links.github}>{ui.github}</a><a href={profile.links.linkedin}>{ui.linkedin}</a></nav><MotionToggle /></footer>
    </Container>
  </MotionProvider>;
}
