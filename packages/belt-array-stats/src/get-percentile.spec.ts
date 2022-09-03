import * as assert from 'assert';
import { p10, p25, p50, p75, p90 } from './index';

describe('p10', function () {
  it('Simple', () => {
    assert.deepStrictEqual(p10([1, 1, 2]), 1);
  });

  it('Two', () => {
    assert.deepStrictEqual(p10([1, 1, 2, 3, 4, 4]), 1);
  });

  it('One scramble', () => {
    assert.deepStrictEqual(p10([2, 1, 2]), 1);
  });

  it('Two scramble', () => {
    assert.deepStrictEqual(p10([1, 4, 2, 3, 4, 1]), 1);
  });

  it('Two scramble with null & undefined', () => {
    assert.deepStrictEqual(p10([1, 4, 2, undefined, 4, null]), 0);
  });
});

describe('p25', function () {
  it('Simple', () => {
    assert.deepStrictEqual(p25([1, 1, 2]), 1);
  });

  it('Two', () => {
    assert.deepStrictEqual(p25([1, 1, 2, 3, 4, 4]), 1);
  });

  it('One scramble', () => {
    assert.deepStrictEqual(p25([2, 1, 2]), 1);
  });

  it('Two scramble', () => {
    assert.deepStrictEqual(p25([1, 4, 2, 3, 4, 1]), 1);
    assert.deepStrictEqual(p25([1, 4, 2, 3, 4, 2]), 2);
  });

  it('Two scramble with null & undefined', () => {
    assert.deepStrictEqual(p25([1, 4, 2, undefined, 4, null]), 0);
  });
});

describe('p50', function () {
  it('Simple', () => {
    assert.deepStrictEqual(p50([1, 1, 2]), 1);
  });

  it('Two', () => {
    assert.deepStrictEqual(p50([1, 1, 2, 3, 4, 4]), 3);
  });

  it('One scramble', () => {
    assert.deepStrictEqual(p50([2, 1, 2]), 2);
  });

  it('Two scramble', () => {
    assert.deepStrictEqual(p50([1, 4, 2, 3, 4, 1]), 3);
  });

  it('Two scramble with null & undefined', () => {
    assert.deepStrictEqual(p50([1, 4, 2, undefined, 4, null]), 2);
  });

  it('One - already sorted', () => {
    assert.deepStrictEqual(p50([]), 0);
  });

  it('Null', () => {
    assert.deepStrictEqual(p50(null), 0);
  });

  it('Undefined', () => {
    assert.deepStrictEqual(p50(undefined), 0);
  });
});

describe('p75', function () {
  it('Simple', () => {
    assert.deepStrictEqual(p75([1, 1, 2]), 2);
  });

  it('Two', () => {
    assert.deepStrictEqual(p75([1, 1, 2, 3, 4, 4]), 4);
  });

  it('One scramble', () => {
    assert.deepStrictEqual(p75([2, 1, 2]), 2);
  });

  it('Two scramble', () => {
    assert.deepStrictEqual(p75([1, 4, 2, 3, 4, 1]), 4);
  });

  it('Two scramble with null & undefined', () => {
    assert.deepStrictEqual(p75([1, 4, 2, undefined, 4, null]), 4);
  });
});

describe('p90', function () {
  it('Simple', () => {
    assert.deepStrictEqual(p90([1, 1, 2]), 2);
  });

  it('Two', () => {
    assert.deepStrictEqual(p90([1, 1, 2, 3, 4, 4]), 4);
  });

  it('One scramble', () => {
    assert.deepStrictEqual(p90([2, 1, 2]), 2);
  });

  it('Two scramble', () => {
    assert.deepStrictEqual(p90([1, 4, 2, 3, 4, 1]), 4);
  });

  it('Two scramble with null & undefined', () => {
    assert.deepStrictEqual(p90([1, 4, 2, undefined, 4, null]), 4);
  });
});
