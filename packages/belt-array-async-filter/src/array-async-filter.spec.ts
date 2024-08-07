/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { arrayAsyncFilter } from './index';

describe('arrayAsyncFilter', function () {
  describe('bad way', () => {
    it('null array', async () => {
      assert.deepStrictEqual(await arrayAsyncFilter(null as any, () => true), []);
    });
    it('undefined array', async () => {
      assert.deepStrictEqual(await arrayAsyncFilter(undefined as any, () => true), []);
    });
    it('empty array', async () => {
      assert.deepStrictEqual(await arrayAsyncFilter([], () => true), []);
    });
  });

  describe('without promise', () => {
    it('boolean', async () => {
      assert.deepStrictEqual(
        await arrayAsyncFilter(
          [
            {
              id: 5,
              value: 'Yo',
            },
          ],
          f => f.id === 5
        ),
        [
          {
            id: 5,
            value: 'Yo',
          },
        ]
      );
    });

    it('number', async () => {
      assert.deepStrictEqual(
        await arrayAsyncFilter(
          [
            {
              id: 5,
              value: 'Yo',
            },
          ],
          // in js... a guy can do that, so, let's check
          f => f.id as any
        ),
        [
          {
            id: 5,
            value: 'Yo',
          },
        ]
      );
    });

    it('object', async () => {
      assert.deepStrictEqual(
        await arrayAsyncFilter(
          [
            {
              id: 5,
              value: 'Yo',
            },
          ],
          // in js... a guy can do that, so, let's check
          f => f as any
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
        await arrayAsyncFilter(
          [
            {
              id: 5,
              value: 'Yo',
            },
          ],
          // in js... a guy can do that, so, let's check
          () => null as any
        ),
        []
      );
    });

    it('by idx', async () => {
      assert.deepStrictEqual(
        await arrayAsyncFilter(
          [
            {
              id: 5,
              value: 'Yo',
            },
          ],
          // in js... a guy can do that, so, let's check
          (f, idx) => idx === 1
        ),
        []
      );
    });
  });

  describe('promise', () => {
    it('boolean', async () => {
      assert.deepStrictEqual(
        await arrayAsyncFilter(
          [
            {
              id: 5,
              value: 'Yo',
            },
          ],
          f => Promise.resolve(f.id === 5)
        ),
        [
          {
            id: 5,
            value: 'Yo',
          },
        ]
      );
    });

    it('number', async () => {
      assert.deepStrictEqual(
        await arrayAsyncFilter(
          [
            {
              id: 5,
              value: 'Yo',
            },
          ],
          // in js... a guy can do that, so, let's check
          f => Promise.resolve(f.id as any)
        ),
        [
          {
            id: 5,
            value: 'Yo',
          },
        ]
      );
    });

    it('object', async () => {
      assert.deepStrictEqual(
        await arrayAsyncFilter(
          [
            {
              id: 5,
              value: 'Yo',
            },
          ],
          // in js... a guy can do that, so, let's check
          f => Promise.resolve(f as any)
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
        await arrayAsyncFilter(
          [
            {
              id: 5,
              value: 'Yo',
            },
            null,
          ],
          // in js... a guy can do that, so, let's check
          f => Promise.resolve(f as any)
        ),
        [
          {
            id: 5,
            value: 'Yo',
          },
        ]
      );
    });
  });
});
