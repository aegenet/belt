import * as assert from 'assert';
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
      escapeRegex(null);
      throw new Error('Must failed');
    } catch (error) {
      assert.strictEqual(error.message, 'Invalid usage: argument provided is not a string.');
    }
  });

  it('undefined', () => {
    try {
      escapeRegex(undefined);
      throw new Error('Must failed');
    } catch (error) {
      assert.strictEqual(error.message, 'Invalid usage: argument provided is not a string.');
    }
  });
});
