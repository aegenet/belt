import * as assert from 'assert';
import { arrayToObject } from './index';

describe('arrayToObject', function () {
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
    assert.deepStrictEqual(arrayToObject(null, 'id', 'value'), {});
  });

  it('Empty array', () => {
    assert.deepStrictEqual(arrayToObject([], 'id', 'value'), {});
  });
});
