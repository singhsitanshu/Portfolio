import { StrictMode, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { MotionProvider, MotionRule, MotionToggle } from './components/Motion';
import { Container, Heading, TextLink } from './components/ui';
import { Home } from './pages/Home';
import { CodeGraphCaseStudy } from './pages/CodeGraphCaseStudy';
import { TaskForgeCaseStudy } from './pages/TaskForgeCaseStudy';
import { projects, profile } from './content/portfolio';
import './styles.css';

function App() {
  const { pathname, hash } = useLocation();
  const main = useRef<HTMLElement>(null);
  const previousPath = useRef(pathname);
  useEffect(() => {
    const name = pathname === '/' ? profile.name : projects.find((project) => project.path === pathname)?.name ?? 'Page not found';
    document.title = `${name} · Portfolio`;
    const pathChanged = previousPath.current !== pathname;
    previousPath.current = pathname;
    // Hash targets exist after React commits the destination route, including
    // a direct URL load where the browser tried to scroll before it mounted.
    let target: HTMLElement | null = null;
    if (hash) {
      try {
        target = document.getElementById(decodeURIComponent(hash.slice(1)));
      } catch {
        // Ignore malformed URL fragments without interrupting navigation.
      }
    }
    if (target) {
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: 'start', behavior: 'instant' });
    } else if (pathChanged) {
      main.current?.focus();
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return <MotionProvider>
    <a className="skip-link" href="#main">Skip to content</a>
    <Container>
      <header className="site-header">
        <NavLink className="wordmark" to="/" aria-label={`${profile.name} home`}>A<span aria-hidden="true"> / </span>S</NavLink>
        <nav aria-label="Primary">
          <a href="/#work">Work</a><a href="/#about">About</a>
          <a href={profile.resumeUrl}>Resume</a>
          <a href={profile.links.github}>GitHub</a><a href={profile.links.linkedin}>LinkedIn</a>
        </nav>
      </header>
      <main id="main" ref={main} tabIndex={-1}>
        <MotionRule key={pathname} className="route-motion" route />
        <Routes>
          <Route path="/" element={<Home />} />
          {projects.map((project) => <Route key={project.id} path={project.path} element={project.id === 'codegraph' ? <CodeGraphCaseStudy project={project} /> : <TaskForgeCaseStudy project={project} />} />)}
          <Route path="*" element={<section className="intro"><Heading as="h1">Page not found</Heading><TextLink to="/">Return home</TextLink></section>} />
        </Routes>
      </main>
      <footer className="site-footer"><span>{profile.name} / {profile.role}</span><MotionToggle /><span>Built around the work.</span></footer>
    </Container>
  </MotionProvider>;
}

createRoot(document.getElementById('root')!).render(<StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>);
