import { toBase64 } from '../browser';
import * as assert from 'assert';

describe('browser - to-base64', () => {
  it('Null, undefined, empty', () => {
    assert.strictEqual(toBase64(null as any), '');
    assert.strictEqual(toBase64(undefined as any), '');
    assert.strictEqual(toBase64(''), '');
  });

  it('Ok', () => {
    assert.strictEqual(toBase64('Something'), 'U29tZXRoaW5n');
  });
});
