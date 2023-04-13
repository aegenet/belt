import * as assert from 'node:assert';
import { stringConcat } from './index';

describe('string-concat', () => {
  it('Simple', () => {
    assert.equal(stringConcat(['Hello', ' ', 'Boris']), 'Hello Boris');
  });

  it('Empty', () => {
    assert.equal(stringConcat([]), '');
  });

  it('Undefined values', () => {
    assert.equal(stringConcat(['Hello', ' ', undefined as any, 'Boris']), 'Hello undefinedBoris');
  });

  it('Null values', () => {
    assert.equal(stringConcat(['Hello', ' ', null as any, 'Boris']), 'Hello nullBoris');
  });

  it('Offset 1', () => {
    assert.equal(stringConcat(['Hello', ' ', 'Boris'], 1), ' Boris');
  });

  it('Offset 2', () => {
    assert.equal(stringConcat(['Hello', ' ', 'Boris'], 2), 'Boris');
  });

  it('Offset 1 end 3', () => {
    assert.equal(stringConcat(['Hello', ' ', 'Boris'], 1, 3), ' Boris');
  });
});
