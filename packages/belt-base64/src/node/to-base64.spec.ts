import { toBase64 } from '../node';
import * as assert from 'node:assert';

describe('node - to-base64', () => {
  it('Null, undefined, empty', () => {
    assert.strictEqual(toBase64(null as any), '');
    assert.strictEqual(toBase64(undefined as any), '');
    assert.strictEqual(toBase64(''), '');
  });

  it('Ok', () => {
    assert.strictEqual(toBase64('Something'), 'U29tZXRoaW5n');
  });
});
