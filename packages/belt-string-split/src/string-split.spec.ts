import * as assert from 'node:assert';
import { stringSplit, type IStringSplitOptions } from './index';

describe('string-split', () => {
  it('Null or undefined', () => {
    assert.deepStrictEqual(
      stringSplit(
        null as any,
        {
          separator: ' ',
        } as IStringSplitOptions
      ),
      []
    );
    assert.deepStrictEqual(
      stringSplit(undefined as any, {
        separator: ' ',
      }),
      []
    );
  });

  it('Simple', () => {
    assert.deepStrictEqual(
      stringSplit('Hello Maurice', {
        separator: ' ',
      }),
      ['Hello', 'Maurice']
    );
  });

  it('Empty', () => {
    assert.deepStrictEqual(''.split(' '), ['']);
    assert.deepStrictEqual(
      stringSplit('', {
        separator: ' ',
      }),
      ['']
    );
  });

  it('Without space', () => {
    assert.deepStrictEqual('nospace'.split(' '), ['nospace']);
    assert.deepStrictEqual(
      stringSplit('nospace', {
        separator: ' ',
      }),
      ['nospace']
    );
  });

  it('Multiple words', () => {
    assert.deepStrictEqual('Hello Brian and Maurice'.split(' '), ['Hello', 'Brian', 'and', 'Maurice']);
    assert.deepStrictEqual(
      stringSplit('Hello Brian and Maurice', {
        separator: ' ',
      }),
      ['Hello', 'Brian', 'and', 'Maurice']
    );
  });

  it('Multiple words with extra spaces', () => {
    assert.deepStrictEqual('Hello Brian  and Maurice'.split(' '), ['Hello', 'Brian', '', 'and', 'Maurice']);
    assert.deepStrictEqual(
      stringSplit('Hello Brian  and Maurice', {
        separator: ' ',
      }),
      ['Hello', 'Brian', '', 'and', 'Maurice']
    );
  });

  it('Multiple words with extra spaces -> IgnoreEmpty', () => {
    assert.deepStrictEqual('Hello Brian  and Maurice'.split(' '), ['Hello', 'Brian', '', 'and', 'Maurice']);
    assert.deepStrictEqual(
      stringSplit('Hello Brian  and Maurice', {
        separator: ' ',
        ignoreEmpty: true,
      }),
      ['Hello', 'Brian', 'and', 'Maurice']
    );
  });

  it('Space in string and between quotes without ignoreTags', () => {
    assert.deepStrictEqual('Hello Brian "Something Else"'.split(' '), ['Hello', 'Brian', '"Something', 'Else"']);
    assert.deepStrictEqual(
      stringSplit('Hello Brian "Something Else"', {
        separator: ' ',
      }),
      ['Hello', 'Brian', '"Something', 'Else"']
    );
  });

  it('Space in string and between quotes with ignoreTags "', () => {
    assert.deepStrictEqual('Hello Brian "Something Else"'.split(' '), ['Hello', 'Brian', '"Something', 'Else"']);
    assert.deepStrictEqual(
      stringSplit('Hello Brian "Something Else"', {
        separator: ' ',
        ignoreTags: {
          '"': '"',
        },
      }),
      ['Hello', 'Brian', '"Something Else"']
    );
  });

  it('Space in string and between quotes with ignoreTags', () => {
    assert.deepStrictEqual(
      stringSplit('Hello Brian (Something Else (or something))', {
        separator: ' ',
        ignoreTags: {
          '(': ')',
        },
      }),
      ['Hello', 'Brian', '(Something Else (or something))']
    );
  });

  it('Unbalanced', () => {
    try {
      stringSplit('Hello Brian (Something Else or something))', {
        separator: ' ',
        ignoreTags: {
          '(': ')',
        },
      });
    } catch (error: any) {
      assert.strictEqual(error.message, 'StringSplit cannot ignores tags with unbalanced symbols');
    }
  });
});
