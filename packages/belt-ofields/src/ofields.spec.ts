import * as assert from 'assert';
import { ofields } from './index';

describe('ofields', function () {
  it('Invalid mandatory fields, null', () => {
    try {
      ofields(
        {
          id: 5,
        },
        {
          fields: null as any,
        }
      );
      throw new Error('Must failed.');
    } catch (error) {
      assert.strictEqual((error as Error).message, 'Invalid usage of ofields: fields property is mandatory.');
    }
  });

  it('Invalid mandatory fields, empty', () => {
    try {
      ofields(
        {
          id: 5,
        },
        {
          fields: [],
        }
      );
      throw new Error('Must failed.');
    } catch (error) {
      assert.strictEqual((error as Error).message, 'Invalid usage of ofields: fields property is mandatory.');
    }
  });

  it('Simple', () => {
    assert.deepStrictEqual(
      ofields(
        {
          id: 5,
        },
        {
          fields: ['id'],
        }
      ),
      [['id', 5]]
    );
  });

  it('Multiple', () => {
    assert.deepStrictEqual(
      ofields(
        {
          id: 5,
          code: 'Trotro',
          another: 1,
        },
        {
          fields: ['id', 'code'],
        }
      ),
      [
        ['id', 5],
        ['code', 'Trotro'],
      ]
    );
  });

  it('Null', () => {
    assert.deepStrictEqual(
      ofields(null, {
        fields: ['id'],
      }),
      [['id', undefined]]
    );
  });
});
