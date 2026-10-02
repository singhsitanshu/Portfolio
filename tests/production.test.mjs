import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { gzipSync } from 'node:zlib';

const origin = 'https://aanshsingh.com';
const fixtures = [
  { path: '/', file: 'index.html', title: 'Aansh Singh | Software Engineer', heading: 'Aansh' },
  { path: '/projects/codegraph', file: 'projects/codegraph.html', title: 'CodeGraph Case Study | Aansh Singh', heading: 'CodeGraph' },
  { path: '/projects/taskforge', file: 'projects/taskforge.html', title: 'TaskForge Case Study | Aansh Singh', heading: 'TaskForge' },
];
const root = resolve('dist');
const documents = new Map(await Promise.all([...fixtures, { path: '/404', file: '404.html' }].map(async fixture => [fixture.path, await readFile(resolve(root, fixture.file), 'utf8')])));
const decode = value => value.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(match => [match[1], decode(match[2])]));
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map(match => attributes(match[0]));
const meta = (html, key) => tags(html, 'meta').filter(tag => tag.name === key || tag.property === key);
const outputFiles = (await readdir(root, { recursive: true, withFileTypes: true }))
  .filter(entry => entry.isFile()).map(entry => resolve(entry.parentPath, entry.name));

test('static output contains only production URLs and no server runtime', async () => {
  for (const file of outputFiles) {
    if (!/\.(html|js|css|xml|txt|svg)$/.test(file)) continue;
    const body = await readFile(file, 'utf8');
    assert.doesNotMatch(body, /localhost|127\.0\.0\.1|workers\.dev|pages\.dev|example\.(?:com|org)|www\.aanshsingh\.com|\/Users\/|file:\/\/|\/src\/main\.tsx|\/_test\//, file);
  }
  assert.ok(!outputFiles.some(file => /entry-server|\.map$/.test(file)), 'build-only runtime files are not deployed');
});

test('three generated pages expose distinct metadata and complete content without JavaScript', () => {
  const descriptions = new Set();
  for (const page of fixtures) {
    const html = documents.get(page.path);
    const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
    assert.deepEqual([...head.matchAll(/<title>(.*?)<\/title>/g)].map(match => decode(match[1])), [page.title]);
    assert.deepEqual(tags(head, 'link').filter(tag => tag.rel === 'canonical').map(tag => tag.href), [origin + page.path]);
    assert.equal(meta(head, 'description').length, 1);
    descriptions.add(meta(head, 'description')[0].content);
    assert.equal(meta(head, 'og:title')[0].content, page.title);
    assert.equal(meta(head, 'og:description')[0].content, meta(head, 'description')[0].content);
    assert.equal(meta(head, 'og:url')[0].content, origin + page.path);
    assert.equal(meta(head, 'og:image')[0].content, origin + '/social-preview.jpg');
    assert.equal(meta(head, 'og:image:type')[0].content, 'image/jpeg');
    assert.equal(meta(head, 'og:image:width')[0].content, '1200');
    assert.equal(meta(head, 'og:image:height')[0].content, '630');
    assert.equal(meta(head, 'twitter:card')[0].content, 'summary_large_image');
    assert.equal(meta(head, 'twitter:image')[0].content, origin + '/social-preview.jpg');
    assert.equal(meta(head, 'robots')[0].content, 'index, follow');
    assert.match(html, new RegExp(`<h1[^>]*>${page.heading}`));
    assert.ok(html.length > 10000, `${page.path} must contain its content, not just a shell`);
    assert.ok(!html.includes('Loading page…') && !html.includes('<!--app-html-->'));
    assert.ok(!html.includes('www.aanshsingh.com') && !html.includes('/_test/'));
    assert.equal(tags(html, 'script').length, 1, 'only the local client entry is shipped');
  }
  assert.equal(descriptions.size, 3);
});

test('every generated internal link, hash target, and head asset resolves', async () => {
  let checked = 0;
  for (const [path, html] of documents) {
    for (const tag of [...tags(html, 'a'), ...tags(html, 'link'), ...tags(html, 'script'), ...tags(html, 'img')]) {
      const reference = tag.href ?? tag.src;
      if (!reference) continue;
      const url = new URL(reference, origin + path);
      if (url.origin !== origin) continue;
      const target = documents.get(url.pathname);
      if (target) {
        if (url.hash) assert.ok(target.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `Broken fragment: ${reference} from ${path}`);
      } else {
        assert.ok(url.pathname.startsWith('/'));
        await access(resolve(root, `.${url.pathname}`));
      }
      checked++;
    }
  }
  assert.ok(checked > 50);
});

test('sitemap, robots, and noindex not-found output use the intended origin', async () => {
  const sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8');
  assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]), fixtures.map(page => origin + page.path));
  assert.equal(await readFile(resolve(root, 'robots.txt'), 'utf8'), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
  const html = documents.get('/404');
  assert.match(html, /<h1[^>]*>Page not found\.<\/h1>/);
  assert.equal(meta(html, 'robots')[0].content, 'noindex, follow');
  assert.equal(tags(html, 'link').filter(tag => tag.rel === 'canonical').length, 0);
  assert.equal(meta(html, 'og:url').length, 0);
  assert.match(html, /Return home/);
  assert.match(html, /View Projects/);
});

test('social image dimensions, MIME signature, and production asset sizes are appropriate', async () => {
  const image = await readFile(resolve(root, 'social-preview.jpg'));
  assert.equal(image.readUInt16BE(0), 0xffd8);
  let dimensions;
  for (let offset = 2; offset < image.length;) {
    const marker = image[offset + 1];
    if ([0xc0, 0xc1, 0xc2].includes(marker)) {
      dimensions = [image.readUInt16BE(offset + 7), image.readUInt16BE(offset + 5)];
      break;
    }
    offset += 2 + image.readUInt16BE(offset + 2);
  }
  assert.deepEqual(dimensions, [1200, 630]);
  assert.ok(image.length < 150000, 'social preview should remain lightweight');
  assert.match(await readFile(resolve(root, 'favicon.svg'), 'utf8'), /viewBox="0 0 64 64"/);
  const files = await readdir(resolve(root, 'assets'));
  assert.ok(files.some(file => file.startsWith('Home-')) && files.some(file => file.startsWith('CodeGraphCaseStudy-')) && files.some(file => file.startsWith('TaskForgeCaseStudy-')));
  for (const file of files) {
    const body = await readFile(resolve(root, 'assets', file));
    assert.ok(body.length < 500000, `Oversized asset: ${file}`);
    if (file.endsWith('.js')) assert.ok(gzipSync(body).length < 150000, `Oversized compressed script: ${file}`);
    assert.ok(!file.endsWith('.map'), 'no production source maps');
  }
  assert.equal((await stat(resolve(root, 'aansh-singh-resume.pdf'))).size, (await stat('public/aansh-singh-resume.pdf')).size);
  assert.deepEqual(await readFile(resolve(root, 'aansh-singh-resume.pdf')), await readFile('public/aansh-singh-resume.pdf'));
});

test('original portrait is preserved and self-hosted display font is present and bounded', async () => {
  const home = documents.get('/');
  const portrait = tags(home, 'img')[0];
  assert.equal(portrait.loading, 'eager');
  assert.equal(portrait.fetchPriority ?? portrait.fetchpriority, 'high');
  assert.ok(Number(portrait.width) > 0 && Number(portrait.height) > 0);
  assert.ok(portrait.alt.includes('Aansh Singh'));
  assert.equal(tags(home, 'source').length, 0, 'portrait uses the original JPEG without converted variants');
  const portraitBytes = await readFile(resolve(root, `.${portrait.src}`));
  assert.equal(portraitBytes.readUInt16BE(0), 0xffd8);
  assert.deepEqual(portraitBytes, await readFile(resolve('public', `.${portrait.src}`)), 'build preserves the portrait file byte for byte');
  const font = await readFile(resolve(root, 'fonts/space-grotesk-latin-wght.woff2'));
  assert.equal(font.toString('ascii', 0, 4), 'wOF2');
  assert.ok(font.length < 30000);
  assert.match(await readFile(resolve(root, 'fonts/space-grotesk-LICENSE.txt'), 'utf8'), /SIL OPEN FONT LICENSE/);
});

test('preview HTTP responses expose route metadata and a real 404 without executing JavaScript', { skip: !process.env.PREVIEW_URL }, async () => {
  const base = process.env.PREVIEW_URL;
  for (const page of fixtures) {
    const response = await fetch(new URL(page.path, base));
    assert.equal(response.status, 200);
    const body = await response.text();
    assert.equal(meta(body, 'og:url')[0].content, origin + page.path);
    assert.match(body, new RegExp(`<h1[^>]*>${page.heading}`));
    assert.equal((await fetch(new URL(page.path, base), { method: 'HEAD' })).status, 200);
  }
  for (const path of ['/missing-page', '/projects/missing', '/missing.js']) {
    const response = await fetch(new URL(path, base));
    assert.equal(response.status, 404);
    assert.match(await response.text(), /Page not found\./);
  }
  for (const file of outputFiles.filter(file => !file.endsWith('.html'))) {
    const asset = file.slice(root.length).replaceAll('\\', '/');
    const response = await fetch(new URL(asset, base));
    assert.equal(response.status, 200);
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), await readFile(resolve(root, `.${asset}`)));
    if (asset.endsWith('.jpg')) assert.match(response.headers.get('content-type'), /image\/jpeg/);
    if (asset.endsWith('.svg')) assert.match(response.headers.get('content-type'), /image\/svg\+xml/);
    if (asset.endsWith('.pdf')) assert.match(response.headers.get('content-type'), /application\/pdf/);
    if (asset.endsWith('.js')) assert.match(response.headers.get('content-type'), /(?:application|text)\/javascript/);
    if (asset.endsWith('.css')) assert.match(response.headers.get('content-type'), /text\/css/);
  }
});

test('Workers redirects project HTML and trailing slashes to canonical route paths', { skip: !process.env.CLOUDFLARE_PREVIEW_URL }, async () => {
  for (const page of fixtures.filter(page => page.path !== '/')) {
    for (const suffix of ['/', '.html']) {
      const response = await fetch(new URL(page.path + suffix, process.env.CLOUDFLARE_PREVIEW_URL), { redirect: 'manual' });
      assert.equal(response.status, 307);
      assert.equal(new URL(response.headers.get('location'), process.env.CLOUDFLARE_PREVIEW_URL).pathname, page.path);
    }
  }
});

test('homepage sections, legacy anchors, and navigation are accessible in prerendered HTML', () => {
  const home = documents.get('/');
  const ids = [...home.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size, 'IDs must be unique');
  const ordered = ['introduction', 'projects', 'experience', 'education', 'contact'];
  let previous = -1;
  for (const id of ordered) {
    const index = home.indexOf(`id="${id}"`);
    assert.ok(index > previous, `${id} is present in homepage order`);
    previous = index;
    assert.match(home, new RegExp(`<section[^>]*id="${id}"[^>]*tabindex="-1"`));
  }
  for (const id of ['work', 'about', 'codegraph', 'taskforge']) assert.ok(ids.includes(id));
  for (const [id, title] of [['projects', 'Projects'], ['experience', 'Experience'], ['education', 'Education']]) {
    assert.match(home, new RegExp(`<h2 id="${id}-title">${title}</h2>`));
  }
  for (const project of ['codegraph', 'taskforge']) assert.match(home, new RegExp(`<h3 id="${project}-title">`));
  for (const role of ['Software Engineering Team Lead Intern', 'Advanced Academic Ambassador - Projects Chair', 'Instructor', 'Operations Team Member']) assert.ok(home.includes(role));
  assert.ok(home.includes('2025 – Present') && home.includes('June 2029'));
  assert.doesNotMatch(home, /About &amp; journey/);
  for (const html of documents.values()) {
    const nav = html.match(/<nav[^>]*aria-label="Primary"[^>]*>([\s\S]*?)<\/nav>/)[1];
    assert.deepEqual(tags(nav, 'a').map(a => a.href), ['/#projects', '/#experience', '/#education', '/#contact']);
    assert.ok(tags(html, 'a').some(a => a.href === '/aansh-singh-resume.pdf'));
  }
});
