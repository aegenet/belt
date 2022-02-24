import * as assert from 'assert';
import { objectToArray } from './index';

describe('objectToArray', function () {
  it('Indice', () => {
    assert.deepStrictEqual(
      objectToArray({
        1: 'Bo',
        2: 'Jack',
      }),
      ['Bo', 'Jack']
    );
  });

  it('Property name', () => {
    assert.deepStrictEqual(
      objectToArray({
        a: 'Bo',
        b: 'Jack',
      }),
      ['Bo', 'Jack']
    );
  });

  it('Ignore function', () => {
    assert.deepStrictEqual(
      objectToArray({
        a: 'Bo',
        b: 'Jack',
        c: () => 'Yo',
      }),
      ['Bo', 'Jack']
    );
  });

  it('Specify keys', () => {
    assert.deepStrictEqual(
      objectToArray(
        {
          a: 'Bo',
          b: 'Jack',
          c: () => 'Yo',
        },
        { fields: ['a'] }
      ),
      ['Bo']
    );
  });

  it('Ignore keys', () => {
    assert.deepStrictEqual(
      objectToArray(
        {
          1: 'Bo',
          2: 'Jack',
          3: () => 'Yo',
          4: 'Boris',
          5: 'Maurice',
          6: 'Something',
        },
        { control: /[0-3]/ }
      ),
      ['Bo', 'Jack']
    );
  });
});
