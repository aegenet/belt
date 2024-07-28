/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { objectIsEmpty } from './index';

describe('objectIsEmpty', () => {
  it('Null', () => {
    assert.equal(objectIsEmpty(null as any), true);
  });

  it('Undefined', () => {
    assert.equal(objectIsEmpty(undefined as any), true);
  });

  it('{}', () => {
    assert.equal(objectIsEmpty({}), true);
  });

  it('{ id: 1 }', () => {
    assert.equal(objectIsEmpty({ id: 1 }), false);
  });

  it('{ id: 1, code: "go" }', () => {
    assert.equal(objectIsEmpty({ id: 1, code: 'go' }), false);
  });
});
