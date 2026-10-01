import { build } from 'vite';
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { pages, renderHead, site, escapeHtml } from '../src/content/metadata.ts';

const serverOutput = resolve('.prerender');
try {
  // Build tooling only: this server bundle is removed, never deployed.
  await build({ build: { ssr: 'src/entry-server.tsx', outDir: serverOutput, emptyOutDir: true, copyPublicDir: false } });
  const { render } = await import(pathToFileURL(resolve(serverOutput, 'entry-server.js')).href);
  const template = await readFile('dist/index.html', 'utf8');
  if (!template.includes('<!--app-html-->')) throw new Error('Missing prerender outlet');
  for (const page of [...pages, { path: '/404' }]) {
    const html = template
      .replace(/<!--metadata:start-->[\s\S]*?<!--metadata:end-->/, `<!--metadata:start-->${renderHead(page.path)}<!--metadata:end-->`)
      .replace('<!--app-html-->', await render(page.path));
    const target = resolve('dist', page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, html);
    console.log(`Prerendered ${page.path} → ${target.slice(resolve('.').length + 1)}`);
  }
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(page => `  <url><loc>${escapeHtml(new URL(page.path, site.origin).href)}</loc></url>`).join('\n')}\n</urlset>\n`);
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site.origin}/sitemap.xml\n`);
} finally {
  await rm(serverOutput, { recursive: true, force: true });
}
