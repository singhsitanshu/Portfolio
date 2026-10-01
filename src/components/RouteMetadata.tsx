import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { metadataFor, metadataTags } from '../content/metadata';

export function RouteMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = metadataFor(pathname).title;
    document.head.querySelectorAll('[data-portfolio-metadata]').forEach(tag => tag.remove());
    for (const { tag, attributes } of metadataTags(pathname)) {
      const element = document.createElement(tag);
      element.setAttribute('data-portfolio-metadata', '');
      for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
      document.head.appendChild(element);
    }
  }, [pathname]);
  return null;
}
