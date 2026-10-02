// Build-only composition: reuses the prerendered homepage hero and its stylesheet.
// Capture /_test/social-preview.html at 1200 x 630 with tests/homepage-preview.mjs.
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const home = await readFile('dist/index.html', 'utf8');
const hero = home.match(/<section id="introduction"[\s\S]*?<\/section>/)?.[0];
const stylesheet = home.match(/<link[^>]*rel="stylesheet"[^>]*>/)?.[0];
if (!hero || !stylesheet) throw new Error('Build the current homepage before composing its social preview.');

await mkdir('.social-preview', { recursive: true });
await writeFile('.social-preview/index.html', `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Homepage social preview source</title>
${stylesheet}
<style>
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  .hero { width: 1080px; height: 630px; margin: 0 auto; padding: 35px 0; grid-template-columns: 625px 375px; gap: 80px; }
  .hero-copy { padding-left: 0; opacity: 1 !important; transform: none !important; }
  .hero-role { font-size: 19px; line-height: 1.7; margin-bottom: 28px; letter-spacing: .08em; }
  .hero-greeting { font-size: 24px; }
  .hero h1 { font-size: 84px; white-space: nowrap; }
  .hero-perspective { font-size: 27px; margin-top: 20px; }
  .hero .lede { font-size: 22px; line-height: 1.65; margin-top: 16px; }
  .hero-portrait { padding: 12px; opacity: 1 !important; transform: none !important; }
  .portrait-caption { font-size: 12px; }
  .hero-actions, .hero-socials, .anchor-alias { display: none; }
  *, *::before, *::after { animation: none !important; transition: none !important; }
</style></head><body>${hero}</body></html>`);

// Review the delivered JPEG rather than taking another capture of the source.
for (const [name, width, height, fit] of [['small', 360, 189, 'contain'], ['center', 630, 630, 'cover']]) {
  await writeFile(`.social-preview/${name}.html`, `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Social preview ${name} review</title><style>html,body{margin:0;width:${width}px;height:${height}px;background:#0c161d}img{display:block;width:100%;height:100%;object-fit:${fit};object-position:center}</style></head><body><img src="/social-preview-homepage-v3.jpg" alt="Current homepage social preview"></body></html>`);
}
console.log('Composed .social-preview/index.html and JPEG review pages. See README for capture steps.');
