/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { arrayAsyncMap } from './index';

describe('arrayAsyncMap', function () {
  describe('bad way', () => {
    it('null array', async () => {
      assert.deepStrictEqual(await arrayAsyncMap(null as any, () => true), []);
    });
    it('undefined array', async () => {
      assert.deepStrictEqual(await arrayAsyncMap(undefined as any, () => true), []);
    });
    it('empty array', async () => {
      assert.deepStrictEqual(await arrayAsyncMap([], () => true), []);
    });
  });

  describe('without promise', () => {
    it('boolean', async () => {
      assert.deepStrictEqual(
        await arrayAsyncMap(
          [
            {
              id: 5,
              value: 'Yo',
            },
            {
              id: 7,
              value: 'Ho',
            },
          ],
          f => f.id === 5
        ),
        [true, false]
      );
    });

    it('number', async () => {
      assert.deepStrictEqual(
        await arrayAsyncMap(
          [
            {
              id: 5,
              value: 'Yo',
            },
            {
              id: 7,
              value: 'Ho',
            },
          ],
          f => f.id
        ),
        [5, 7]
      );
    });

    it('object', async () => {
      assert.deepStrictEqual(
        await arrayAsyncMap(
          [
            {
              id: 5,
              value: 'Yo',
            },
          ],
          f => f
        ),
        [
          {
            id: 5,
            value: 'Yo',
          },
        ]
      );
    });

    it('object null', async () => {
      assert.deepStrictEqual(
        await arrayAsyncMap(
          [
            {
              id: 5,
              value: 'Yo',
            },
          ],
          () => null
        ),
        [null]
      );
    });

    it('by idx', async () => {
      assert.deepStrictEqual(
        await arrayAsyncMap(
          [
            {
              id: 5,
              value: 'Yo',
            },
            {
              id: 7,
              value: 'Ho',
            },
          ],
          // in js... a guy can do that, so, let's check
          (f, idx) => idx
        ),
        [0, 1]
      );
    });
  });

  describe('promise', () => {
    it('boolean', async () => {
      assert.deepStrictEqual(
        await arrayAsyncMap(
          [
            {
              id: 5,
              value: 'Yo',
            },
            {
              id: 7,
              value: 'Ho',
            },
          ],
          f => Promise.resolve(f.id === 5)
        ),
        [true, false]
      );
    });

    it('number', async () => {
      assert.deepStrictEqual(
        await arrayAsyncMap(
          [
            {
              id: 5,
              value: 'Yo',
            },
            {
              id: 7,
              value: 'Ho',
            },
          ],
          f => Promise.resolve(f.id)
        ),
        [5, 7]
      );
    });

    it('object', async () => {
      assert.deepStrictEqual(
        await arrayAsyncMap(
          [
            {
              id: 5,
              value: 'Yo',
            },
            {
              id: 7,
              value: 'Ho',
            },
          ],
          f => Promise.resolve(f)
        ),
        [
          {
            id: 5,
            value: 'Yo',
          },
          {
            id: 7,
            value: 'Ho',
          },
        ]
      );
    });

    it('object null', async () => {
      assert.deepStrictEqual(
        await arrayAsyncMap(
          [
            {
              id: 5,
              value: 'Yo',
            },
            null,
          ],
          // in js... a guy can do that, so, let's check
          () => null
        ),
        [null, null]
      );
    });
  });
});
