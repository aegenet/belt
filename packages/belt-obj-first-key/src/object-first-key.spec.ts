import * as assert from 'assert';
import { objectFirstKey } from './index';

describe('objectFirstKey', () => {
  describe('simple', () => {
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

  describe('predicate', () => {
    it('Null', () => {
      assert.equal(
        objectFirstKey(null, key => !!key),
        null
      );
    });

    it('Undefined', () => {
      assert.equal(
        objectFirstKey(undefined, key => !!key),
        null
      );
    });

    it('{}', () => {
      assert.equal(
        objectFirstKey({}, key => !!key),
        null
      );
    });

    it('{ id: 1 }', () => {
      assert.equal(
        objectFirstKey({ id: 1 }, key => !key.startsWith('_')),
        'id'
      );
    });

    it('{ id: 1, code: "go" }', () => {
      assert.equal(
        objectFirstKey({ id: 1, code: 'go' }, key => !key.startsWith('_')),
        'id'
      );
    });

    it('{ _id: 1, code: "go" }', () => {
      assert.equal(
        objectFirstKey({ _id: 1, code: 'go' }, key => !key.startsWith('_')),
        'code'
      );
    });
  });
});
