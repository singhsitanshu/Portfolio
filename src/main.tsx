import { lazy, StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App, type PageComponents } from './App';
import './styles.css';

const pages: PageComponents = {
  Home: lazy(() => import('./pages/Home').then(module => ({ default: module.Home }))),
  CodeGraphCaseStudy: lazy(() => import('./pages/CodeGraphCaseStudy').then(module => ({ default: module.CodeGraphCaseStudy }))),
  TaskForgeCaseStudy: lazy(() => import('./pages/TaskForgeCaseStudy').then(module => ({ default: module.TaskForgeCaseStudy }))),
};
const root = document.getElementById('root')!;
const app = <StrictMode><BrowserRouter><App pages={pages} /></BrowserRouter></StrictMode>;
if (root.childElementCount > 0) hydrateRoot(root, app);
else createRoot(root).render(app);
