import * as assert from 'node:assert';
import { getAverage } from './index';

describe('getAverage', function () {
  it('Simple', () => {
    assert.deepStrictEqual(getAverage([1, 1, 2, 2]), 1.5);
  });

  it('Two', () => {
    assert.deepStrictEqual(getAverage([1, 1, 2, 3, 4, 4]), 2.5);
  });

  it('Two scramble', () => {
    assert.deepStrictEqual(getAverage([1, 4, 2, 3, 4, 1]), 2.5);
  });

  it('Two scramble with undefined & null', () => {
    assert.deepStrictEqual(getAverage([1, 4, 2, 3, undefined as any, 4, null as any, 1]), 1.875);
  });

  it('Empty', () => {
    assert.deepStrictEqual(getAverage([]), 0);
  });

  it('Null', () => {
    assert.deepStrictEqual(getAverage(null as any), 0);
  });

  it('Undefined', () => {
    assert.deepStrictEqual(getAverage(undefined as any), 0);
  });
});
