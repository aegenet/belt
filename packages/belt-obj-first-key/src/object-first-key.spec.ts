import * as assert from 'assert';
import { objectFirstKey } from './index';

describe('objectFirstKey', () => {
  it('Null', () => {
    assert.equal(objectFirstKey(null), null);
  });

  it('Undefined', () => {
    assert.equal(objectFirstKey(undefined), null);
  });

  it('{}', () => {
    assert.equal(objectFirstKey({}), null);
  });

  it('{ id: 1 }', () => {
    assert.equal(objectFirstKey({ id: 1 }), 'id');
  });

  it('{ id: 1, code: "go" }', () => {
    assert.equal(objectFirstKey({ id: 1, code: 'go' }), 'id');
  });
});
