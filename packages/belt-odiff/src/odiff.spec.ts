/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { odiff } from './index';

describe('odiff', function () {
  describe('string fields[]', () => {
    it('Invalid mandatory fields, null', () => {
      try {
        odiff(
          {
            id: 5,
          },
          {
            id: 5,
          },
          {
            fields: null as any,
          }
        );
        throw new Error('Must failed.');
      } catch (error) {
        assert.strictEqual((error as Error).message, 'Invalid usage of odiff: fields property is mandatory.');
      }
    });

    it('Invalid mandatory fields, empty', () => {
      try {
        odiff(
          {
            id: 5,
          },
          {
            id: 5,
          },
          {
            fields: [],
          }
        );
        throw new Error('Must failed.');
      } catch (error) {
        assert.strictEqual((error as Error).message, 'Invalid usage of odiff: fields property is mandatory.');
      }
    });

    it('No diff', () => {
      assert.deepStrictEqual(
        odiff(
          {
            id: 5,
          },
          {
            id: 5,
          },
          {
            fields: ['id'],
          }
        ),
        []
      );
    });

    it('Different', () => {
      assert.deepStrictEqual(
        odiff(
          {
            id: 5,
          },
          {
            id: 3,
          },
          {
            fields: ['id'],
          }
        ),
        [['id', 5, 3]]
      );
    });

    it('Multiple', () => {
      assert.deepStrictEqual(
        odiff(
          {
            id: 5,
            code: 'Trotro',
            another: 1,
          },
          {
            id: 3,
            code: 'Lyoko',
            another: 2,
          },
          {
            fields: ['id', 'code'],
          }
        ),
        [
          ['id', 5, 3],
          ['code', 'Trotro', 'Lyoko'],
        ]
      );
    });

    it('Null', () => {
      assert.deepStrictEqual(
        odiff(null, undefined, {
          fields: ['id'],
        }),
        []
      );
    });
  });

  describe('Fields with type', () => {
    it('No diff', () => {
      assert.deepStrictEqual(
        odiff(
          {
            id: 5,
          },
          {
            id: 5,
          },
          {
            fields: [{ name: 'id', type: 'number' }],
          }
        ),
        []
      );
    });

    it('Different', () => {
      assert.deepStrictEqual(
        odiff(
          {
            id: 5,
          },
          {
            id: 3,
          },
          {
            fields: [{ name: 'id', type: 'number' }],
          }
        ),
        [['id', 5, 3]]
      );
    });

    it('Different null date vs date', () => {
      assert.deepStrictEqual(
        odiff(
          {
            id: 5,
            at: new Date(2023, 3, 2, 1, 0, 0, 0),
          },
          {
            id: 3,
            at: undefined,
          },
          {
            fields: [
              { name: 'id', type: 'number' },
              { name: 'at', type: 'date' },
            ],
          }
        ),
        [
          ['id', 5, 3],
          ['at', new Date(2023, 3, 2, 1, 0, 0, 0), undefined],
        ]
      );
    });

    it('Different date vs string', () => {
      assert.deepStrictEqual(
        odiff(
          {
            id: 5,
            at: new Date(2023, 3, 2, 1, 0, 0, 0),
          },
          {
            id: 3,
            at: '2023-04-01T23:00:00.000Z',
          },
          {
            fields: [
              { name: 'id', type: 'number' },
              { name: 'at', type: 'date' },
            ],
          }
        ),
        [
          ['id', 5, 3],
          ['at', new Date(2023, 3, 2, 1, 0, 0, 0), '2023-04-01T23:00:00.000Z'],
        ]
      );
    });

    it('Multiple', () => {
      assert.deepStrictEqual(
        odiff(
          {
            id: 5,
            code: 'Trotro',
            another: 1,
            date1: new Date(2023, 7, 1, 2, 3, 0, 0),
            date2: new Date(2022, 2, 9, 7, 6, 0, 0),
            obj1: {
              a: 1,
            },
            obj2: {
              b: 5,
            },
            arr1: [1, 2, 3],
            arr2: [1, 2, 3],
          },
          {
            id: 3,
            code: 'Lyoko',
            another: 2,
            date1: new Date(2023, 7, 1, 2, 3, 0, 0),
            date2: new Date(2021, 2, 9, 7, 6, 0, 0),
            obj1: {
              a: 7,
            },
            obj2: {
              b: 5,
            },
            arr1: [1, 2, 3],
            arr2: [4, 5, 6],
          },
          {
            fields: [
              { name: 'id', type: 'number' },
              { name: 'code', type: 'string' },
              { name: 'date1', type: 'date' },
              { name: 'date2', type: 'date' },
              { name: 'obj1', type: 'object' },
              { name: 'obj2', type: 'object' },
              { name: 'arr1', type: 'array' },
              { name: 'arr2', type: 'array' },
            ],
          }
        ),
        [
          ['id', 5, 3],
          ['code', 'Trotro', 'Lyoko'],
          ['date2', new Date(2022, 2, 9, 7, 6, 0, 0), new Date(2021, 2, 9, 7, 6, 0, 0)],
          [
            'obj1',
            {
              a: 1,
            },
            {
              a: 7,
            },
          ],
          ['arr2', [1, 2, 3], [4, 5, 6]],
        ]
      );
    });

    it('Null', () => {
      assert.deepStrictEqual(
        odiff(null, undefined, {
          fields: ['id'],
        }),
        []
      );
    });

    it('Defaullt type', () => {
      assert.deepStrictEqual(
        odiff(
          {
            id: 5,
          },
          {
            id: 3,
          },
          {
            fields: [{ name: 'id', type: null as any }],
          }
        ),
        [['id', 5, 3]]
      );
    });
  });
});
