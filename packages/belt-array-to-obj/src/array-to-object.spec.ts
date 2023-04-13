import * as assert from 'node:assert';
import { arrayToObject } from './index';

describe('arrayToObject', function () {
  it('number[]', () => {
    assert.deepStrictEqual(arrayToObject([5, 6]), {
      5: 5,
      6: 6,
    });
  });

  it('string[]', () => {
    assert.deepStrictEqual(arrayToObject(['a', 'b']), {
      a: 'a',
      b: 'b',
    });
  });

  it('Simple', () => {
    assert.deepStrictEqual(
      arrayToObject(
        [
          {
            id: 5,
            value: 'Yo',
          },
        ],
        'id'
      ),
      {
        5: {
          id: 5,
          value: 'Yo',
        },
      }
    );
  });

  it('Key Value', () => {
    assert.deepStrictEqual(
      arrayToObject(
        [
          {
            id: 5,
            value: 'Yo',
          },
        ],
        'id',
        'value'
      ),
      {
        5: 'Yo',
      }
    );
  });

  it('Computed Key Value', () => {
    assert.deepStrictEqual(
      arrayToObject(
        [
          {
            id: 5,
            value: 'Yo',
          },
        ],
        value => value.id,
        'value'
      ),
      {
        5: 'Yo',
      }
    );
  });

  it('Null array', () => {
    assert.deepStrictEqual(arrayToObject(null as any, 'id', 'value'), {});
  });

  it('Empty array', () => {
    assert.deepStrictEqual(arrayToObject([], 'id', 'value'), {});
  });
});
