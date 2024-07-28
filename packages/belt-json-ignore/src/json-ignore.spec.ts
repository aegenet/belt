/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { jsonIgnore } from './index';

class MyClass {
  public something: string = 'ok';
  @jsonIgnore
  public declare mySubPrivateField: string;

  constructor() {
    this.mySubPrivateField = 'abcdefg';
  }
}

describe('jsonIgnore', () => {
  it('Ignore', () => {
    const instance = new MyClass();
    assert.strictEqual(JSON.stringify(instance), '{"something":"ok"}');
    assert.deepStrictEqual(Object.keys(instance), ['something']);
    assert.strictEqual(instance.mySubPrivateField, 'abcdefg');
    instance.mySubPrivateField += 'h';
    assert.strictEqual(instance.mySubPrivateField, 'abcdefgh');
    assert.strictEqual(JSON.stringify(instance), '{"something":"ok"}');
  });
});
