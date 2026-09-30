import { test } from 'node:test';
import assert from 'node:assert/strict';
import { copyEmailAddress } from '../src/components/copyEmail.ts';

test('copies the exact email and confirms success', async () => {
  let copied;
  const result = await copyEmailAddress('person@example.com', { writeText: async (value) => { copied = value; } });
  assert.equal(copied, 'person@example.com');
  assert.equal(result, 'Email copied to clipboard.');
});
test('permission rejection and unsupported clipboard give a usable fallback', async () => {
  for (const clipboard of [undefined, { writeText: async () => { throw new Error('Denied'); } }]) {
    assert.equal(await copyEmailAddress('person@example.com', clipboard), 'Couldn’t copy automatically. Select and copy person@example.com, or use the email link.');
  }
});
