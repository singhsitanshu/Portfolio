import test from 'node:test';
import assert from 'node:assert/strict';
import { anchorIdFor } from '../src/content/navigation.ts';

test('homepage canonical and legacy fragments resolve without changing project anchors', () => {
  for (const id of ['projects', 'experience', 'education', 'contact', 'codegraph', 'taskforge']) {
    assert.equal(anchorIdFor('/', `#${id}`), id);
  }
  assert.equal(anchorIdFor('/', '#work'), 'projects');
  assert.equal(anchorIdFor('/', '#about'), 'introduction');
  assert.equal(anchorIdFor('/', '#%77ork'), 'projects');
});

test('legacy aliases are restricted to home and malformed fragments are harmless', () => {
  assert.equal(anchorIdFor('/projects/codegraph', '#work'), 'work');
  assert.equal(anchorIdFor('/projects/taskforge', '#about'), 'about');
  assert.equal(anchorIdFor('/projects/taskforge', '#claiming'), 'claiming');
  assert.equal(anchorIdFor('/', '#%E0%A4%A'), null);
  assert.equal(anchorIdFor('/', ''), null);
  assert.equal(anchorIdFor('/', '#constructor'), 'constructor');
});
