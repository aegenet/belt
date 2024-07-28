/**
 * @vitest-environment jsdom
 */
import { describe, it, assert } from 'vitest';
import { fromBase64 } from '../browser';

describe('browser - from-base64', () => {
  it('Null, undefined, empty', () => {
    assert.strictEqual(fromBase64(null as any), '');
    assert.strictEqual(fromBase64(undefined as any), '');
    assert.strictEqual(fromBase64(''), '');
  });

  it('Ok', () => {
    assert.strictEqual(fromBase64('U29tZXRoaW5n'), 'Something');
  });
});
