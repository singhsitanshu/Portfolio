// Test-only server for the production bundle; never included in dist.
// Open /?clipboard=denied#contact or /?clipboard=unsupported#contact.
// ?motion=system-reduced simulates the system media signal before React mounts.
// ?audit=1 runs axe-core from AXE_SCRIPT_PATH. ?text=200 checks text enlargement.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';

const root = resolve('dist');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.pdf': 'application/pdf', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.xml': 'application/xml', '.txt': 'text/plain' };
createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://127.0.0.1:4176');
    const socialReview = {
      '/_test/social-preview.html': 'index',
      '/_test/social-preview-small.html': 'small',
      '/_test/social-preview-center.html': 'center',
    }[url.pathname];
    if (socialReview) {
      response.writeHead(200, { 'Content-Type': 'text/html', 'Cache-Control': 'no-store' });
      response.end(await readFile(resolve('.social-preview', `${socialReview}.html`)));
      return;
    }
    if (url.pathname === '/_test/axe.min.js' || url.pathname === '/_test/accessibility-audit.js') {
      const file = url.pathname.endsWith('axe.min.js') ? process.env.AXE_SCRIPT_PATH : resolve('tests/accessibility-audit.js');
      if (!file) { response.writeHead(503).end('AXE_SCRIPT_PATH is required'); return; }
      response.writeHead(200, { 'Content-Type': 'text/javascript', 'Cache-Control': 'no-store' });
      response.end(await readFile(file));
      return;
    }
    let path = resolve(root, `.${decodeURIComponent(url.pathname)}`);
    if (path !== root && !path.startsWith(`${root}/`)) {
      response.writeHead(403).end();
      return;
    }
    let status = 200;
    if (path === root) path = resolve(root, 'index.html');
    if (!(await stat(path).catch(() => null))?.isFile()) {
      if ((await stat(`${path}.html`).catch(() => null))?.isFile()) path += '.html';
      else { path = resolve(root, '404.html'); status = 404; }
    }
    let body = await readFile(path);
    const fault = url.searchParams.get('clipboard');
    if (extname(path) === '.html' && ['denied', 'unsupported'].includes(fault)) {
      const clipboard = fault === 'denied'
        ? "{writeText: async () => {throw new DOMException('Clipboard access denied', 'NotAllowedError');}}"
        : 'undefined';
      body = Buffer.from(body.toString().replace('<head>', `<head><script>Object.defineProperty(navigator, 'clipboard', {configurable: true, value: ${clipboard}});</script>`));
    }
    if (extname(path) === '.html' && url.searchParams.get('motion') === 'system-reduced') {
      const media = "const originalMedia=window.matchMedia.bind(window);window.matchMedia=query=>query==='(prefers-reduced-motion: reduce)'?{matches:true,media:query,onchange:null,addEventListener(){},removeEventListener(){},addListener(){},removeListener(){},dispatchEvent(){return true}}:originalMedia(query);";
      body = Buffer.from(body.toString().replace('<head>', `<head><script>${media}</script>`));
    }
    if (extname(path) === '.html' && url.searchParams.get('text') === '200') {
      body = Buffer.from(body.toString().replace('<head>', '<head><style>html { font-size: 200%; }</style>'));
    }
    if (extname(path) === '.html' && url.searchParams.get('audit') === '1') {
      body = Buffer.from(body.toString().replace('</body>', '<script src="/_test/axe.min.js"></script><script src="/_test/accessibility-audit.js"></script></body>'));
    }
    response.writeHead(status, { 'Content-Type': types[extname(path)] ?? 'application/octet-stream', 'Cache-Control': 'no-store' });
    response.end(body);
  } catch {
    response.writeHead(500).end('Preview failed');
  }
}).listen(4176, '127.0.0.1', () => console.log('Homepage test preview: http://127.0.0.1:4176'));
