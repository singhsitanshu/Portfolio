// Test-only server for the production bundle; never included in dist.
// Open /?clipboard=denied#contact or /?clipboard=unsupported#contact.
// ?motion=system-reduced simulates the system media signal before React mounts.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';

const root = resolve('dist');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.pdf': 'application/pdf' };
createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://127.0.0.1:4176');
    let path = resolve(root, `.${decodeURIComponent(url.pathname)}`);
    if (path !== root && !path.startsWith(`${root}/`)) {
      response.writeHead(403).end();
      return;
    }
    if (!(await stat(path).catch(() => null))?.isFile()) path = resolve(root, 'index.html');
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
    response.writeHead(200, { 'Content-Type': types[extname(path)] ?? 'application/octet-stream', 'Cache-Control': 'no-store' });
    response.end(body);
  } catch {
    response.writeHead(500).end('Preview failed');
  }
}).listen(4176, '127.0.0.1', () => console.log('Homepage test preview: http://127.0.0.1:4176'));
