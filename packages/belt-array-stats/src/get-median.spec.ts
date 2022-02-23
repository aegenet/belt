import * as assert from 'assert';
import { getMedian } from './index';

describe('getMedian', function () {
  it('Simple', () => {
    assert.deepStrictEqual(getMedian([1, 1, 2]), 1);
  });

  it('Two', () => {
    assert.deepStrictEqual(getMedian([1, 1, 2, 3, 4, 4], { sorted: true }), 2.5);
  });

  it('One scramble', () => {
    assert.deepStrictEqual(getMedian([2, 1, 2]), 2);
  });

  it('Two scramble', () => {
    assert.deepStrictEqual(getMedian([1, 4, 2, 3, 4, 1]), 2.5);
  });

  it('Two scramble with null & undefined', () => {
    assert.deepStrictEqual(getMedian([1, 4, 2, undefined, 4, null]), 3);
  });

  it('One - already sorted', () => {
    assert.deepStrictEqual(getMedian([], { sorted: true }), 0);
  });

  it('Null', () => {
    assert.deepStrictEqual(getMedian(null), 0);
  });

  it('Undefined', () => {
    assert.deepStrictEqual(getMedian(undefined), 0);
  });
});
