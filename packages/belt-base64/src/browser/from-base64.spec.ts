import { fromBase64 } from '../browser';
import * as assert from 'assert';

describe('browser - from-base64', () => {
  it('Null, undefined, empty', () => {
    assert.strictEqual(fromBase64(null), '');
    assert.strictEqual(fromBase64(undefined), '');
    assert.strictEqual(fromBase64(''), '');
  });

  it('Ok', () => {
    assert.strictEqual(fromBase64('U29tZXRoaW5n'), 'Something');
  });
});