/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { binarySearch, safeBinarySearch } from './index';

describe('binary-search & safe', () => {
  describe('binary-search', () => {
    it('number', () => {
      assert.strictEqual(binarySearch([1, 2, 3], 2, (a, b) => a - b)?.value, 2);

      assert.strictEqual(binarySearch([1, 2, 3], 3, (a, b) => a - b)?.value, 3);

      assert.strictEqual(binarySearch([1, 2, 3], 1, (a, b) => a - b)?.value, 1);

      assert.strictEqual(binarySearch([1, 2, 3, 50, 92, 99, 120], 99, (a, b) => a - b)?.value, 99);
    });

    it('string', () => {
      const sample = ['Arti', 'Morti', 'Lorti', 'Yolo', 'Yalo', 'Yago', 'Iago', 'Zorro', 'Nor', 'Aru', 'Guru'].sort();

      assert.strictEqual(
        binarySearch<string>(sample, 'Not FOund', (a, b) => a.localeCompare(b)),
        null
      );

      assert.strictEqual(binarySearch<string>(sample, 'Arti', (a, b) => a.localeCompare(b))?.value, 'Arti');

      assert.strictEqual(binarySearch<string>(sample, 'Yolo', (a, b) => a.localeCompare(b))?.value, 'Yolo');

      assert.strictEqual(binarySearch<string>(sample, 'Iago', (a, b) => a.localeCompare(b))?.value, 'Iago');

      assert.strictEqual(binarySearch<string>(sample, 'Guru', (a, b) => a.localeCompare(b))?.value, 'Guru');
    });

    it('object', () => {
      const sample = [
        {
          id: 1,
          code: 'Arti',
        },
        {
          id: 2,
          code: 'Morti',
        },
        {
          id: 3,
          code: 'Lorti',
        },
        {
          id: 4,
          code: 'Yolo',
        },
        {
          id: 5,
          code: 'Yalo',
        },
        {
          id: 6,
          code: 'Yago',
        },
        {
          id: 7,
          code: 'Iago',
        },
        {
          id: 8,
          code: 'Zorro',
        },
        {
          id: 9,
          code: 'Nor',
        },
        {
          id: 10,
          code: 'Aru',
        },
        {
          id: 11,
          code: 'Guru',
        },
      ].sort();

      assert.strictEqual(
        binarySearch<{ id: number; code?: string }>(sample, { id: 111 }, (a, b) => a.id - b.id)?.value.code,
        undefined
      );

      assert.strictEqual(
        binarySearch<{ id: number; code?: string }>(sample, { id: 1 }, (a, b) => a.id - b.id)?.value.code,
        'Arti'
      );

      assert.strictEqual(
        binarySearch<{ id: number; code?: string }>(sample, { id: 4 }, (a, b) => a.id - b.id)?.value.code,
        'Yolo'
      );

      assert.strictEqual(
        binarySearch<{ id: number; code?: string }>(sample, { id: 7 }, (a, b) => a.id - b.id)?.value.code,
        'Iago'
      );

      assert.strictEqual(
        binarySearch<{ id: number; code?: string }>(sample, { id: 11 }, (a, b) => a.id - b.id)?.value.code,
        'Guru'
      );
    });
  });

  describe('binary-search', () => {
    it('number', () => {
      assert.strictEqual(safeBinarySearch([1, 2, 3], 2)?.value, 2);

      assert.strictEqual(safeBinarySearch([1, 2, 3], 3)?.value, 3);

      assert.strictEqual(safeBinarySearch([1, 2, 3], 1)?.value, 1);

      assert.strictEqual(safeBinarySearch([1, 2, 3, 50, 92, 99, 120], 99)?.value, 99);
    });

    it('string', () => {
      const sample = ['Arti', 'Morti', 'Lorti', 'Yolo', 'Yalo', 'Yago', 'Iago', 'Zorro', 'Nor', 'Aru', 'Guru'].sort();

      assert.strictEqual(safeBinarySearch<string>(sample, 'Not FOund'), null);

      assert.strictEqual(safeBinarySearch<string>(sample, 'Arti')?.value, 'Arti');

      assert.strictEqual(safeBinarySearch<string>(sample, 'Yolo')?.value, 'Yolo');

      assert.strictEqual(safeBinarySearch<string>(sample, 'Iago')?.value, 'Iago');

      assert.strictEqual(safeBinarySearch<string>(sample, 'Guru')?.value, 'Guru');
    });

    it('object but sort first', () => {
      const sample = [
        {
          id: 11,
          code: 'Guru',
        },
        {
          id: 3,
          code: 'Lorti',
        },
        {
          id: 1,
          code: 'Arti',
        },
        {
          id: 2,
          code: 'Morti',
        },
        {
          id: 4,
          code: 'Yolo',
        },
        {
          id: 5,
          code: 'Yalo',
        },
        {
          id: 8,
          code: 'Zorro',
        },
        {
          id: 6,
          code: 'Yago',
        },
        {
          id: 7,
          code: 'Iago',
        },
        {
          id: 9,
          code: 'Nor',
        },
        {
          id: 10,
          code: 'Aru',
        },
      ].sort();

      assert.strictEqual(
        safeBinarySearch<{ id: number; code?: string }>(sample, { id: 111 }, (a, b) => a.id - b.id)?.value.code,
        undefined
      );

      assert.strictEqual(
        safeBinarySearch<{ id: number; code?: string }>(sample, { id: 1 }, (a, b) => a.id - b.id)?.value.code,
        'Arti'
      );

      assert.strictEqual(
        safeBinarySearch<{ id: number; code?: string }>(sample, { id: 4 }, (a, b) => a.id - b.id)?.value.code,
        'Yolo'
      );

      assert.strictEqual(
        safeBinarySearch<{ id: number; code?: string }>(sample, { id: 7 }, (a, b) => a.id - b.id)?.value.code,
        'Iago'
      );

      assert.strictEqual(
        safeBinarySearch<{ id: number; code?: string }>(sample, { id: 11 }, (a, b) => a.id - b.id)?.value.code,
        'Guru'
      );
    });

    it('No comparator with object', () => {
      try {
        safeBinarySearch<{ id: number; code?: string }>([], { id: 111 });
        throw new Error('Must failed.');
      } catch (error) {
        assert.equal(
          (error as Error).message,
          'Invalid usage: you must specify a comparator if your searchValue is an object.'
        );
      }
    });
  });
});
