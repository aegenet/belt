import * as assert from 'node:assert';
import { objectToMap } from './index';

describe('objectToMap', function () {
  it('null', () => {
    assert.strictEqual(objectToMap(null).size, 0);
  });

  it('undefined', () => {
    assert.strictEqual(objectToMap(undefined).size, 0);
  });

  it('{}', () => {
    assert.strictEqual(objectToMap({}).size, 0);
  });

  it('{ id: 1 }', () => {
    const map = objectToMap({ id: 1 });
    assert.strictEqual(map.size, 1);
    assert.strictEqual(map.has('id'), true);
    assert.strictEqual(map.get('id'), 1);
  });

  it('Instance', () => {
    const instance = new (class {
      id = 1;
    })();
    const map = objectToMap(instance);
    assert.strictEqual(map.size, 1);
    assert.strictEqual(map.has('id'), true);
    assert.strictEqual(map.get('id'), 1);
  });
});
