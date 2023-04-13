import * as assert from 'node:assert';
import { jsonIgnore } from './index';

class MyClass {
  @jsonIgnore
  public mySubPrivateField: string = 'abcdefg';
  public something: string = 'ok';
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
