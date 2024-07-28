/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { stripDuplicates } from './index';

describe('stripDuplicates', function () {
  describe('number', () => {
    it('One', () => {
      assert.deepStrictEqual(stripDuplicates([1, 1, 2]), [1, 2]);
    });

    it('Two', () => {
      assert.deepStrictEqual(stripDuplicates([1, 1, 2, 3, 4, 4]), [1, 2, 3, 4]);
    });

    it('One scramble', () => {
      assert.deepStrictEqual(stripDuplicates([2, 1, 2]), [2, 1]);
    });

    it('Two scramble', () => {
      assert.deepStrictEqual(stripDuplicates([1, 4, 2, 3, 4, 1]), [1, 4, 2, 3]);
    });

    it('One - already sorted', () => {
      assert.deepStrictEqual(stripDuplicates([1, 1, 2], { sorted: true }), [1, 2]);
    });

    it('Two - already sorted', () => {
      assert.deepStrictEqual(stripDuplicates([1, 1, 2, 3, 4, 4], { sorted: true }), [1, 2, 3, 4]);
    });
  });

  describe('object', () => {
    it('One', () => {
      assert.deepStrictEqual(
        stripDuplicates([{ id: 1 }, { id: 1 }, { id: 2 }], {
          compare: (a, b) => a.id === b.id,
          sorted: true,
        }),
        [{ id: 1 }, { id: 2 }]
      );
    });

    it('Two', () => {
      assert.deepStrictEqual(
        stripDuplicates([{ id: 1 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 4 }], {
          compare: (a, b) => a.id === b.id,
          sorted: true,
        }),
        [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
      );
    });

    it('With null and undefined values', () => {
      assert.deepStrictEqual(
        stripDuplicates([{ id: 1 }, null, { id: 2 }, { id: 3 }, { id: 4 }, undefined], {
          sorted: true,
        }),
        [{ id: 1 }, null, { id: 2 }, { id: 3 }, { id: 4 }, undefined]
      );
    });

    it('With null and undefined values', () => {
      assert.deepStrictEqual(stripDuplicates([{ id: 1 }, null, { id: 2 }, { id: 3 }, { id: 4 }, undefined]), [
        { id: 1 },
        null,
        { id: 2 },
        { id: 3 },
        { id: 4 },
        undefined,
      ]);
    });

    it('Invalid options', () => {
      try {
        stripDuplicates([{ id: 1 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 4 }], {
          compare: (a, b) => a.id === b.id,
          sorted: false,
        });
        throw new Error('Must failed');
      } catch (error) {
        assert.strictEqual(
          (error as Error).message,
          'Invalid usage: compare function is only available with sorted array.'
        );
      }
    });
  });
});
