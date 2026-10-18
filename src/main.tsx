import { lazy, StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App, type PageComponents } from './App';
import { projects } from './content/site';
import './styles.css';

const loadHome = () => import('./pages/Home').then(module => module.Home);
const loadCodeGraph = () => import('./pages/CodeGraphCaseStudy').then(module => module.CodeGraphCaseStudy);
const loadTaskForge = () => import('./pages/TaskForgeCaseStudy').then(module => module.TaskForgeCaseStudy);

const pages: PageComponents = {
  Home: lazy(() => loadHome().then(page => ({ default: page }))),
  CodeGraphCaseStudy: lazy(() => loadCodeGraph().then(page => ({ default: page }))),
  TaskForgeCaseStudy: lazy(() => loadTaskForge().then(page => ({ default: page }))),
};

// Hydrate with the current page already loaded (T-18). A page still lazy at
// hydration leaves a dehydrated Suspense boundary that an early update can
// replace with the loading fallback, shifting the whole page.
async function loadCurrentPage() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  if (path === '/') pages.Home = await loadHome();
  else if (path === projects[0].path) pages.CodeGraphCaseStudy = await loadCodeGraph();
  else if (path === projects[1].path) pages.TaskForgeCaseStudy = await loadTaskForge();
}

const root = document.getElementById('root')!;
const app = () => <StrictMode><BrowserRouter><App pages={pages} /></BrowserRouter></StrictMode>;
if (root.childElementCount > 0) void loadCurrentPage().then(() => hydrateRoot(root, app()));
else createRoot(root).render(app());
