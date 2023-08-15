import * as assert from 'node:assert';
import { StringSplit, type IStringSplitOptions, type IStringSplit } from './index';

describe('string-split', () => {
  it('Null or undefined', () => {
    assert.deepStrictEqual(
      new StringSplit({
        separator: ' ',
      } as IStringSplitOptions).split(null as any),
      []
    );
    assert.deepStrictEqual(
      new StringSplit({
        separator: ' ',
      }).split(undefined as any),
      []
    );
  });

  it('Simple', () => {
    assert.deepStrictEqual(
      new StringSplit({
        separator: ' ',
      }).split('Hello Maurice'),
      ['Hello', 'Maurice']
    );
  });

  it('Empty', () => {
    assert.deepStrictEqual(''.split(' '), ['']);
    const strSplit: IStringSplit = new StringSplit({
      separator: ' ',
    });
    assert.deepStrictEqual(strSplit.split(''), ['']);
  });

  it('Without space', () => {
    assert.deepStrictEqual('nospace'.split(' '), ['nospace']);
    assert.deepStrictEqual(
      new StringSplit({
        separator: ' ',
      }).split('nospace'),
      ['nospace']
    );
  });

  it('Multiple words', () => {
    assert.deepStrictEqual('Hello Brian and Maurice'.split(' '), ['Hello', 'Brian', 'and', 'Maurice']);
    assert.deepStrictEqual(
      new StringSplit({
        separator: ' ',
      }).split('Hello Brian and Maurice'),
      ['Hello', 'Brian', 'and', 'Maurice']
    );
  });

  it('Multiple words with extra spaces', () => {
    assert.deepStrictEqual('Hello Brian  and Maurice'.split(' '), ['Hello', 'Brian', '', 'and', 'Maurice']);
    assert.deepStrictEqual(
      new StringSplit({
        separator: ' ',
      }).split('Hello Brian  and Maurice'),
      ['Hello', 'Brian', '', 'and', 'Maurice']
    );
  });

  it('Multiple words with extra spaces -> IgnoreEmpty', () => {
    assert.deepStrictEqual('Hello Brian  and Maurice'.split(' '), ['Hello', 'Brian', '', 'and', 'Maurice']);
    assert.deepStrictEqual(
      new StringSplit({
        separator: ' ',
        ignoreEmpty: true,
      }).split('Hello Brian  and Maurice'),
      ['Hello', 'Brian', 'and', 'Maurice']
    );
  });

  it('Space in string and between quotes without ignoreTags', () => {
    assert.deepStrictEqual('Hello Brian "Something Else"'.split(' '), ['Hello', 'Brian', '"Something', 'Else"']);
    assert.deepStrictEqual(
      new StringSplit({
        separator: ' ',
      }).split('Hello Brian "Something Else"'),
      ['Hello', 'Brian', '"Something', 'Else"']
    );
  });

  it('Space in string and between quotes with ignoreTags "', () => {
    assert.deepStrictEqual('Hello Brian "Something Else"'.split(' '), ['Hello', 'Brian', '"Something', 'Else"']);
    assert.deepStrictEqual(
      new StringSplit({
        separator: ' ',
        ignoreTags: {
          '"': '"',
        },
      }).split('Hello Brian "Something Else"'),
      ['Hello', 'Brian', '"Something Else"']
    );
  });

  it('Space in string and between quotes with ignoreTags', () => {
    assert.deepStrictEqual(
      new StringSplit({
        separator: ' ',
        ignoreTags: {
          '(': ')',
        },
      }).split('Hello Brian (Something Else (or something))'),
      ['Hello', 'Brian', '(Something Else (or something))']
    );
  });

  it('Unbalanced', () => {
    try {
      new StringSplit({
        separator: ' ',
        ignoreTags: {
          '(': ')',
        },
      }).split('Hello Brian (Something Else or something))');
    } catch (error: any) {
      assert.strictEqual(error.message, 'StringSplit cannot ignores tags with unbalanced symbols');
    }
  });

  it('${$this.sizes.len() > 0}', () => {
    const stringSplit = new StringSplit({
      separator: ' ',
      ignoreTags: {
        '${': '}',
      },
    });
    assert.deepStrictEqual(stringSplit.split('${$this.sizes.len() > 0}'), ['${$this.sizes.len() > 0}']);
    assert.deepStrictEqual(stringSplit.split('${$this.sizes.len() > 0} ${$this.sizes.len() < 255}'), ['${$this.sizes.len() > 0}', '${$this.sizes.len() < 255}']);
  });

  it('mapped ${$this._count} [id:value]', () => {
    const stringSplit = new StringSplit({
      separator: ' ',
      ignoreTags: {
        '"': '"',
        '${': '}',
      },
    });
    assert.deepStrictEqual(stringSplit.split('mapped ${$this._count} [id:value]'), ['mapped', '${$this._count}', '[id:value]']);
  });

  it('mapped ${$this._count} [id:value] <% Toto %>', () => {
    const stringSplit = new StringSplit({
      separator: ' ',
      ignoreTags: {
        '"': '"',
        '${': '}',
        '<%': '%>',
      },
    });
    assert.deepStrictEqual(stringSplit.split('mapped ${$this._count} [id:value] <% Toto %>'), ['mapped', '${$this._count}', '[id:value]', '<% Toto %>']);
  });

  it('Multiple separators', () => {
    const stringSplit = new StringSplit({
      separator: ['+', '*', '.', ':', ','],
      ignoreTags: {
        '"': '"',
        '${': '}',
        '<%': '%>',
        '[': ']',
      },
    });
    assert.deepStrictEqual(stringSplit.split('mapped ${$this._count}, [id:value] <% Toto %>'), ['mapped ${$this._count}', ' [id:value] <% Toto %>']);
  });

  it('Multiple separators, includeSep', () => {
    const stringSplit = new StringSplit({
      separator: ['+', '*', '.', ':', ','],
      includeSep: true,
      ignoreTags: {
        '"': '"',
        '${': '}',
        '<%': '%>',
        '[': ']',
      },
    });
    assert.deepStrictEqual(stringSplit.split('mapped ${$this._count}, [id:value] <% Toto %>'), ['mapped ${$this._count}', ',', ' [id:value] <% Toto %>']);
  });
});
