import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const bootstrap = html.match(/<script>([\s\S]*?)<\/script>/)[1];

// Exercise the actual pre-paint script without loading React or the client bundle.
function open({ path = '/', hash = '', saved = false, systemReduced = false, storageBlocked = false } = {}) {
  const attributes = new Set();
  const root = {
    setAttribute: name => attributes.add(name),
    removeAttribute: name => attributes.delete(name),
    hasAttribute: name => attributes.has(name),
  };
  const window = new EventTarget();
  const media = Object.assign(new EventTarget(), { matches: !systemReduced });
  let timeout;
  runInNewContext(bootstrap, {
    document: { documentElement: root }, window, location: { pathname: path, hash },
    localStorage: { getItem: () => { if (storageBlocked) throw Error('blocked'); return String(saved); } },
    matchMedia: () => media, AbortController,
    setTimeout: callback => { timeout = callback; return 1; },
    clearTimeout: () => { timeout = undefined; },
  });
  return { window, media, active: () => root.hasAttribute('data-paper-opening'), expire: () => timeout?.() };
}

test('intro bypasses inside pages, hash links, and both reduced-motion preferences', () => {
  for (const options of [{ path: '/projects/codegraph' }, { hash: '#projects' }, { saved: true }, { systemReduced: true }]) {
    assert.equal(open(options).active(), false);
  }
  assert.equal(open({ storageBlocked: true }).active(), true);
});

test('first interaction ends the intro before the client bundle loads', () => {
  for (const type of ['keydown', 'pointerdown', 'wheel', 'touchstart', 'focusin', 'pagehide', 'popstate', 'hashchange']) {
    const page = open();
    assert.equal(page.active(), true);
    page.window.dispatchEvent(new Event(type));
    assert.equal(page.active(), false, type);
  }
});

test('completion, preference changes, and the bundle-failure timeout release the page', () => {
  const page = open();
  page.window.dispatchEvent(Object.assign(new Event('animationend'), { animationName: 'print-draw' }));
  assert.equal(page.active(), true);
  page.window.dispatchEvent(Object.assign(new Event('animationend'), { animationName: 'paper-arrive' }));
  assert.equal(page.active(), false);
  const reduced = open();
  reduced.media.dispatchEvent(new Event('change'));
  assert.equal(reduced.active(), false);
  const failedBundle = open();
  failedBundle.expire();
  assert.equal(failedBundle.active(), false);
});
