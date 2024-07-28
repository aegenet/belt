/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { escapeRegex } from './index';

describe('escapeRegex', () => {
  it('Ok', () => {
    assert.equal(escapeRegex('Hello'), 'Hello');
  });

  it('Escape !', () => {
    assert.equal(escapeRegex('Hell{o} [you]'), 'Hell\\{o\\} \\[you\\]');
  });

  it('Empty', () => {
    assert.equal(escapeRegex(''), '');
  });

  it('Null', () => {
    try {
      escapeRegex(null as any);
      throw new Error('Must failed');
    } catch (error) {
      assert.strictEqual((error as Error).message, 'Invalid usage: argument provided is not a string.');
    }
  });

  it('undefined', () => {
    try {
      escapeRegex(undefined as any);
      throw new Error('Must failed');
    } catch (error) {
      assert.strictEqual((error as Error).message, 'Invalid usage: argument provided is not a string.');
    }
  });
});
