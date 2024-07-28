/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { isRecord } from './index';

describe('isRecord', () => {
  it('Null', () => {
    assert.equal(isRecord(null), false);
  });

  it('Undefined', () => {
    assert.equal(isRecord(undefined), false);
  });

  it('{}', () => {
    assert.equal(isRecord({}), true);
  });

  it('{ id: 1 }', () => {
    assert.equal(isRecord({ id: 1 }), true);
  });

  it('{ id: 1, code: "go" }', () => {
    assert.equal(isRecord({ id: 1, code: 'go' }), true);
  });

  it('date', () => {
    assert.equal(isRecord(new Date(2015)), false);
  });

  it('number', () => {
    assert.equal(isRecord(2015), false);
  });

  it('string', () => {
    assert.equal(isRecord('abcdefg'), false);
  });
});
