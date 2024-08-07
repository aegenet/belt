/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
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

  it('Preserve space', () => {
    assert.deepStrictEqual(
      new StringSplit({
        separator: ' ',
        ignoreEmpty: true,
        ignoreTags: {
          '"': '"',
          '${': '}',
        },
      }).split('Hello Brian "Mitch "'),
      ['Hello', 'Brian', '"Mitch "']
    );

    assert.deepStrictEqual(
      new StringSplit({
        separator: ' ',
        ignoreEmpty: true,
        ignoreTags: {
          '"': '"',
          '[': ']',
          '${': '}',
          '##': '##',
        },
      }).split('Hello '),
      ['Hello']
    );
  });

  it('string "Else" 0xff', () => {
    assert.deepStrictEqual(
      new StringSplit({
        separator: ' ',
        ignoreEmpty: true,
        ignoreTags: {
          '"': '"',
        },
      }).split('string "Else" 0xff'),
      ['string', '"Else"', '0xff']
    );
  });

  it('string $$Someting$$ 0xff', () => {
    assert.deepStrictEqual(
      new StringSplit({
        separator: ' ',
        ignoreEmpty: true,
        ignoreTags: {
          $$: '$$',
        },
      }).split('string $$Someting$$ 0xff'),
      ['string', '$$Someting$$', '0xff']
    );
  });

  it('Unbalanced same character', () => {
    try {
      new StringSplit({
        separator: ' ',
        ignoreTags: {
          '"': '"',
        },
      }).split('Hello Brian "Something Else or something""');
      throw new Error('Must failed');
    } catch (error: any) {
      assert.strictEqual(error.message, 'StringSplit, unclosed tags are found: "');
    }
  });

  it('Unbalanced simple', () => {
    const stringSplit = new StringSplit({
      separator: ' ',
      ignoreTags: {
        '(': ')',
      },
    });

    assert.deepStrictEqual(stringSplit.split('Hello Brian (Something Else or something))'), [
      'Hello',
      'Brian',
      '(Something Else or something))',
    ]);
  });

  it('Unbalanced complex', () => {
    const stringSplit = new StringSplit({
      separator: ' ',
      ignoreTags: {
        '$(': ')',
      },
    });

    assert.deepStrictEqual(stringSplit.split('Hello Brian $(Something Else or something))'), [
      'Hello',
      'Brian',
      '$(Something Else or something))',
    ]);
  });

  it('${$this.sizes.len() > 0}', () => {
    const stringSplit = new StringSplit({
      separator: ' ',
      ignoreTags: {
        '${': '}',
      },
    });
    assert.deepStrictEqual(stringSplit.split('${$this.sizes.len() > 0}'), ['${$this.sizes.len() > 0}']);
    assert.deepStrictEqual(stringSplit.split('${$this.sizes.len() > 0} ${$this.sizes.len() < 255}'), [
      '${$this.sizes.len() > 0}',
      '${$this.sizes.len() < 255}',
    ]);
  });

  it('mapped ${$this._count} [id:value]', () => {
    const stringSplit = new StringSplit({
      separator: ' ',
      ignoreTags: {
        '"': '"',
        '${': '}',
      },
    });
    assert.deepStrictEqual(stringSplit.split('mapped ${$this._count} [id:value]'), [
      'mapped',
      '${$this._count}',
      '[id:value]',
    ]);
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
    assert.deepStrictEqual(stringSplit.split('mapped ${$this._count} [id:value] <% Toto %>'), [
      'mapped',
      '${$this._count}',
      '[id:value]',
      '<% Toto %>',
    ]);
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
    assert.deepStrictEqual(stringSplit.split('mapped ${$this._count}, [id:value] <% Toto %>'), [
      'mapped ${$this._count}',
      ' [id:value] <% Toto %>',
    ]);
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
    assert.deepStrictEqual(stringSplit.split('mapped ${$this._count}, [id:value] <% Toto %>'), [
      'mapped ${$this._count}',
      ',',
      ' [id:value] <% Toto %>',
    ]);
  });

  it('Ignore unopened tags', () => {
    const stringSplit = new StringSplit({
      separator: ' ',
      ignoreTags: {
        '"': '"',
        '${': '}',
        '$(': ')',
      },
    });

    assert.deepStrictEqual(stringSplit.split('ABC "DEF" "{G H I}"'), ['ABC', '"DEF"', '"{G H I}"']);
    assert.deepStrictEqual(stringSplit.split('ABC "DEF" {G H I}'), ['ABC', '"DEF"', '{G', 'H', 'I}']);
    assert.deepStrictEqual(stringSplit.split('ABC "DEF" "${G H I}"'), ['ABC', '"DEF"', '"${G H I}"']);
  });
});
