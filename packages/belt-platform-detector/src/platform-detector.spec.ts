import * as assert from 'assert';
import { isNodeJS } from './index';

describe('platform-detector', () => {
  it('isNodeJS', () => {
    assert.strictEqual(isNodeJS(), true);
    assert.strictEqual(isNodeJS(), true);
  });
});
