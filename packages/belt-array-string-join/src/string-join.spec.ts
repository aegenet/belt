import * as assert from 'assert';
import { stringJoin } from './index';

describe('string-join', () => {
  it('Simple', () => {
    assert.equal(stringJoin(['Hello', ' ', 'Boris']), 'Hello Boris');
  });

  it('Empty', () => {
    assert.equal(stringJoin([]), '');
  });

  it('Undefined values', () => {
    assert.equal(stringJoin(['Hello', ' ', undefined as any, 'Boris']), 'Hello undefinedBoris');
  });

  it('Null values', () => {
    assert.equal(stringJoin(['Hello', ' ', null as any, 'Boris']), 'Hello nullBoris');
  });

  it('Separator', () => {
    assert.equal(stringJoin(['Hello', 'Boris'], ' '), 'Hello Boris');
  });

  it('Offset 1', () => {
    assert.equal(stringJoin(['Hello', 'Boris'], ' ', 1), 'Boris');
  });

  it('Offset 1 end 3', () => {
    assert.equal(stringJoin(['Hello', 'Boris', 'Mikalov'], ' ', 1, 3), 'Boris Mikalov');
  });
});
