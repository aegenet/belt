import { fromBase64 } from '../node';
import * as assert from 'node:assert';

describe('node - from-base64', () => {
  it('Null, undefined, empty', () => {
    assert.strictEqual(fromBase64(null as any), '');
    assert.strictEqual(fromBase64(undefined as any), '');
    assert.strictEqual(fromBase64(''), '');
  });

  it('Ok', () => {
    assert.strictEqual(fromBase64('U29tZXRoaW5n'), 'Something');
  });
});
