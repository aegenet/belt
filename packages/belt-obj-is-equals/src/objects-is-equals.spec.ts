import * as assert from 'node:assert';
import { objectsIsEquals, objectsIsNotEquals } from './index';

describe('objectsIsEquals', () => {
  it('Null', () => {
    assert.equal(objectsIsEquals(null, null), true);
    assert.equal(objectsIsEquals(null, {}), false);
    assert.equal(objectsIsEquals({}, null), false);
  });

  it('Undefined', () => {
    assert.equal(objectsIsEquals(undefined, undefined), true);
    assert.equal(objectsIsEquals(undefined, {}), false);
    assert.equal(objectsIsEquals({}, undefined), false);
  });

  it('{}', () => {
    assert.equal(objectsIsEquals({}, {}), true);
    assert.equal(objectsIsEquals({ a: 1 }, {}), false);
    assert.equal(objectsIsEquals({}, { a: 1 }), false);
  });

  it('number', () => {
    assert.equal(objectsIsEquals(1, 1), true);
    assert.equal(objectsIsEquals(1, 2), false);
    assert.equal(objectsIsEquals(2, 1), false);
  });

  it('string', () => {
    assert.equal(objectsIsEquals('abcdef', 'abcdef'), true);
    assert.equal(objectsIsEquals('1', 1 as any), false);
    assert.equal(objectsIsEquals('abcdef', 'abcdefg'), false);
    assert.equal(objectsIsEquals('abcdefg', 'abcdef'), false);
  });

  it('date', () => {
    assert.equal(objectsIsEquals(new Date(2015, 1, 1, 1, 1), new Date(2015, 1, 1, 1, 1)), true);
    assert.equal(objectsIsEquals(new Date(2016, 1, 1, 1, 1), new Date(2015, 1, 1, 1, 1)), false);
    assert.equal(objectsIsEquals(new Date(2015, 1, 1, 1, 1), new Date(2016, 1, 1, 1, 1)), false);
    assert.equal(objectsIsEquals(new Date(2015, 1, 1, 1, 1), null), false);
    assert.equal(objectsIsEquals(null, new Date(2015, 1, 1, 1, 1)), false);
  });
});

describe('objectsIsNotEquals', () => {
  it('Null', () => {
    assert.equal(objectsIsNotEquals(null, null), false);
    assert.equal(objectsIsNotEquals(null, {}), true);
    assert.equal(objectsIsNotEquals({}, null), true);
  });

  it('Undefined', () => {
    assert.equal(objectsIsNotEquals(undefined, undefined), false);
    assert.equal(objectsIsNotEquals(undefined, {}), true);
    assert.equal(objectsIsNotEquals({}, undefined), true);
  });

  it('{}', () => {
    assert.equal(objectsIsNotEquals({}, {}), false);
    assert.equal(objectsIsNotEquals({ a: 1 }, {}), true);
    assert.equal(objectsIsNotEquals({}, { a: 1 }), true);
  });

  it('number', () => {
    assert.equal(objectsIsNotEquals(1, 1), false);
    assert.equal(objectsIsNotEquals(1, 2), true);
    assert.equal(objectsIsNotEquals(2, 1), true);
  });

  it('string', () => {
    assert.equal(objectsIsNotEquals('abcdef', 'abcdef'), false);
    assert.equal(objectsIsNotEquals('1', 1 as any), true);
    assert.equal(objectsIsNotEquals('abcdef', 'abcdefg'), true);
    assert.equal(objectsIsNotEquals('abcdefg', 'abcdef'), true);
  });

  it('date', () => {
    assert.equal(objectsIsNotEquals(new Date(2015, 1, 1, 1, 1), new Date(2015, 1, 1, 1, 1)), false);
    assert.equal(objectsIsNotEquals(new Date(2016, 1, 1, 1, 1), new Date(2015, 1, 1, 1, 1)), true);
    assert.equal(objectsIsNotEquals(new Date(2015, 1, 1, 1, 1), new Date(2016, 1, 1, 1, 1)), true);
    assert.equal(objectsIsNotEquals(new Date(2015, 1, 1, 1, 1), null), true);
    assert.equal(objectsIsNotEquals(null, new Date(2015, 1, 1, 1, 1)), true);
  });
});
