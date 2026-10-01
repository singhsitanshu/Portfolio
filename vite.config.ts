import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { renderHead } from './src/content/metadata';

function staticPages(): Plugin {
  return {
    name: 'portfolio-static-pages',
    transformIndexHtml(html, context) {
      return html.replace(/<!--metadata:start-->[\s\S]*?<!--metadata:end-->/, `<!--metadata:start-->${renderHead(context.path)}<!--metadata:end-->`);
    },
    configurePreviewServer(server) {
      // Run after Vite resolves extensionless HTML files, before its HTML handler.
      // Cloudflare Pages serves this same generated 404.html as its static fallback.
      return () => server.middlewares.use(async (request, response, next) => {
        if (!['GET', 'HEAD'].includes(request.method ?? '')) return next();
        const root = resolve(server.config.root, server.config.build.outDir);
        const pathname = new URL(request.url ?? '/', 'http://localhost').pathname;
        const file = resolve(root, `.${pathname}`);
        if (file.startsWith(root + sep) && (await stat(file).catch(() => null))?.isFile()) return next();
        try {
          const html = await readFile(resolve(root, '404.html'));
          response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
          response.end(request.method === 'HEAD' ? undefined : html);
        } catch (error) { next(error); }
      });
    },
  };
}

export default defineConfig(({ isPreview }) => ({
  appType: isPreview ? 'mpa' : 'spa',
  plugins: [react(), tailwindcss(), staticPages()],
}));
