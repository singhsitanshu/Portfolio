import { Suspense, useEffect, useRef, type ComponentType, type RefObject } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { MotionProvider, MotionRule, MotionToggle } from './components/Motion';
import { Container } from './components/ui';
import { RouteMetadata } from './components/RouteMetadata';
import { NotFound } from './pages/NotFound';
import { projects, profile, type Project } from './content/portfolio';
import { anchorIdFor, homeSections } from './content/navigation';

export type PageComponents = { Home: ComponentType; CodeGraphCaseStudy: ComponentType<{ project: Project }>; TaskForgeCaseStudy: ComponentType<{ project: Project }> };

// Commit focus effects with the resolved page, including lazily loaded routes.
function RoutedContent({ main, pages }: { main: RefObject<HTMLElement | null>; pages: PageComponents }) {
  const { Home, CodeGraphCaseStudy, TaskForgeCaseStudy } = pages;
  const { pathname, hash } = useLocation();
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
  }, [pathname, hash]);
  return <Routes>
    <Route path="/" element={<Home />} />
    {projects.map((project) => <Route key={project.id} path={project.path} element={project.id === 'codegraph' ? <CodeGraphCaseStudy project={project} /> : <TaskForgeCaseStudy project={project} />} />)}
    <Route path="*" element={<NotFound />} />
  </Routes>;
}

export function App({ pages }: { pages: PageComponents }) {
  const { pathname } = useLocation();
  const main = useRef<HTMLElement>(null);
  return <MotionProvider>
    <RouteMetadata />
    <a className="skip-link" href="#main">Skip to content</a>
    <Container>
      <header className="site-header">
        <NavLink className="wordmark" to="/" aria-label={`${profile.name} home`}>A<span aria-hidden="true"> / </span>S</NavLink>
        <nav className="primary-nav" aria-label="Primary">
          {homeSections.map(section => <Link key={section.id} to={`/#${section.id}`}>{section.label}</Link>)}
        </nav>
        <a className="text-link header-resume" href={profile.resumeUrl}>Resume <span className="file-label">PDF</span></a>
      </header>
      <main id="main" ref={main} tabIndex={-1}>
        <MotionRule key={pathname} className="route-motion" route />
        <Suspense fallback={<p className="status" role="status">Loading page…</p>}><RoutedContent main={main} pages={pages} /></Suspense>
      </main>
      <footer className="site-footer"><span>{profile.name} / {profile.role}</span><nav aria-label="Footer social profiles"><a href={profile.links.github}>GitHub</a><a href={profile.links.linkedin}>LinkedIn</a></nav><MotionToggle /></footer>
    </Container>
  </MotionProvider>;
}
