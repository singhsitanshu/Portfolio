import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { App } from './App';
import { Home } from './pages/Home';
import { CodeGraphCaseStudy } from './pages/CodeGraphCaseStudy';
import { TaskForgeCaseStudy } from './pages/TaskForgeCaseStudy';

// Resolve pages synchronously at build time, so output needs no Suspense reveal scripts.
const pages = { Home, CodeGraphCaseStudy, TaskForgeCaseStudy };

export function render(path: string) {
  const html = renderToString(<StaticRouter location={path}><App pages={pages} /></StaticRouter>);
  if (html.includes('<!--$!-->') || html.includes('<!--$?-->')) throw new Error(`Unresolved content while prerendering ${path}`);
  return html;
}
