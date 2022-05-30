import * as assert from 'assert';
import { getClosestNumber, getClosestValue } from './get-closest';

describe('getClosestNumber', function () {
  it('In array', () => {
    assert.strictEqual(getClosestNumber(1, [1, 2]), 1);
    assert.strictEqual(getClosestNumber(2, [1, 2]), 2);
    assert.strictEqual(getClosestNumber(2, [1, 2, 3]), 2);
    assert.strictEqual(getClosestNumber(2, [1, 2, 2, 3]), 2);
    assert.strictEqual(getClosestNumber(2, [3, 1, 2, 2]), 2);
  });

  it('Not in array', () => {
    assert.strictEqual(getClosestNumber(0, [1, 2]), 1);
    assert.strictEqual(getClosestNumber(3, [1, 2]), 2);
    assert.strictEqual(getClosestNumber(13, [1, 2]), 2);
  });

  it('Null', () => {
    assert.strictEqual(getClosestNumber(null, []), null);
    assert.strictEqual(getClosestNumber(null, null), null);
  });

  it('Undefined', () => {
    assert.strictEqual(getClosestNumber(undefined, []), null);
    assert.strictEqual(getClosestNumber(undefined, undefined), null);
  });
});

describe('getClosestValue', function () {
  const reducer = (value: { value: number }, a: { value: number }, b: { value: number }) => {
    const aDiff = Math.abs(a.value - value.value);
    const bDiff = Math.abs(b.value - value.value);

    if (aDiff === bDiff) {
      return a.value > b.value ? a : b;
    } else {
      return bDiff < aDiff ? b : a;
    }
  };

  it('In array', () => {
    assert.deepStrictEqual(getClosestValue<{ value: number }>({ value: 1 }, [{ value: 1 }, { value: 2 }], reducer), { value: 1 });
    assert.deepStrictEqual(getClosestValue<{ value: number }>({ value: 2 }, [{ value: 1 }, { value: 2 }], reducer), { value: 2 });
  });

  it('Not in array', () => {
    assert.deepStrictEqual(getClosestValue<{ value: number }>({ value: 0 }, [{ value: 1 }, { value: 2 }], reducer), { value: 1 });
    assert.deepStrictEqual(getClosestValue<{ value: number }>({ value: 3 }, [{ value: 1 }, { value: 2 }], reducer), { value: 2 });
    assert.deepStrictEqual(getClosestValue<{ value: number }>({ value: 13 }, [{ value: 1 }, { value: 2 }], reducer), { value: 2 });
  });

  it('Null', () => {
    assert.strictEqual(getClosestValue<{ value: number }>(null, [], reducer), null);
    assert.strictEqual(getClosestValue<{ value: number }>(null, null, reducer), null);
  });

  it('Undefined', () => {
    assert.strictEqual(getClosestValue<{ value: number }>(undefined, [], reducer), null);
    assert.strictEqual(getClosestValue<{ value: number }>(undefined, undefined, reducer), null);
  });
});
