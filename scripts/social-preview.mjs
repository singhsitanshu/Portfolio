// Build-only composition (T-17): the newspaper front page's masthead and name
// banner, taken from the prerendered homepage with its stylesheets.
// Capture /_test/social-preview.html at 1200 x 630 with tests/homepage-preview.mjs.
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const image = '/social-preview-times-v1.jpg';
const home = await readFile('dist/index.html', 'utf8');
const masthead = home.match(/<header class="masthead[\s\S]*?<\/header>/)?.[0];
const banner = home.match(/<h1 id="introduction-title"[\s\S]*?<\/h1>/)?.[0];
const stylesheets = [...home.matchAll(/<link[^>]*rel="(?:stylesheet|preconnect)"[^>]*>/g)].map(match => match[0]).join('\n');
if (!masthead || !banner || !stylesheets) throw new Error('Build the current homepage before composing its social preview.');

await mkdir('.social-preview', { recursive: true });
await writeFile('.social-preview/index.html', `<!doctype html>
<html lang="en" data-reduce-motion><head><meta charset="utf-8"><title>Homepage social preview source</title>
${stylesheets}
<style>
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body { display: flex; flex-direction: column; justify-content: center; }
  .np-sheet, .preview-banner { width: 1104px; margin-inline: auto; }
  .masthead { padding-top: 0; }
  .preview-banner { margin-top: 18px; }
  .preview-banner .name-banner { margin: 0; }
</style></head><body>${masthead}<div class="preview-banner">${banner}</div></body></html>`);

// Review the delivered JPEG rather than taking another capture of the source.
for (const [name, width, height, fit] of [['small', 360, 189, 'contain'], ['center', 630, 630, 'cover']]) {
  await writeFile(`.social-preview/${name}.html`, `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Social preview ${name} review</title><style>html,body{margin:0;width:${width}px;height:${height}px;background:#f4f3ee}img{display:block;width:100%;height:100%;object-fit:${fit};object-position:center}</style></head><body><img src="${image}" alt="Current homepage social preview"></body></html>`);
}
console.log('Composed .social-preview/index.html and JPEG review pages. See README for capture steps.');
