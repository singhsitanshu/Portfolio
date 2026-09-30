import { StrictMode, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Container, Heading, TextLink } from './components/ui';
import { Foundation } from './pages/Foundation';
import { ProjectPlaceholder } from './pages/ProjectPlaceholder';
import './styles.css';

function App() {
  const { pathname } = useLocation();
  const main = useRef<HTMLElement>(null);
  const previousPath = useRef(pathname);
  useEffect(() => {
    const name = pathname === '/' ? 'Foundation' : pathname === '/projects/codegraph' ? 'CodeGraph' : pathname === '/projects/taskforge' ? 'TaskForge' : 'Page not found';
    document.title = `${name} · Portfolio`;
    if (previousPath.current !== pathname) {
      main.current?.focus();
      window.scrollTo(0, 0);
      previousPath.current = pathname;
    }
  }, [pathname]);
  return <MotionConfig reducedMotion="user">
    <a className="skip-link" href="#main">Skip to content</a>
    <Container>
      <header className="site-header">
        <NavLink className="wordmark" to="/" aria-label="Portfolio foundation">A<span aria-hidden="true"> / </span>S</NavLink>
        <nav aria-label="Primary"><NavLink to="/" end>Foundation</NavLink><NavLink to="/projects/codegraph">CodeGraph</NavLink><NavLink to="/projects/taskforge">TaskForge</NavLink></nav>
      </header>
      <main id="main" ref={main} tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Foundation />} />
          <Route path="/projects/codegraph" element={<ProjectPlaceholder name="CodeGraph" />} />
          <Route path="/projects/taskforge" element={<ProjectPlaceholder name="TaskForge" />} />
          <Route path="*" element={<section className="intro"><Heading as="h1">Page not found</Heading><TextLink to="/">Return to foundation</TextLink></section>} />
        </Routes>
      </main>
      <footer className="site-footer"><span>Portfolio / Foundation</span><span>Built around the work.</span></footer>
    </Container>
  </MotionConfig>;
}

createRoot(document.getElementById('root')!).render(<StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>);
