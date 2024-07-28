/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { getDuplicates } from './index';

describe('getDuplicates', function () {
  it('One', () => {
    assert.deepStrictEqual(getDuplicates([1, 1, 2]), [1]);
  });

  it('Two', () => {
    assert.deepStrictEqual(getDuplicates([1, 1, 2, 3, 4, 4]), [1, 4]);
  });
});
