import * as assert from 'assert';
import { objectIsEmpty } from './index';

describe('objectIsEmpty', () => {
  it('Null', () => {
    assert.equal(objectIsEmpty(null), true);
  });

  it('Undefined', () => {
    assert.equal(objectIsEmpty(undefined), true);
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
