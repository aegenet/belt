import * as assert from 'node:assert';
import { odiff } from './index';

describe('odiff', function () {
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
