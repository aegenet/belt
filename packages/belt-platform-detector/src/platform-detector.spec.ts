import * as assert from 'assert';
import { isMobileDevice, isNodeJS } from './index';

describe('platform-detector', () => {
  it('isNodeJS', () => {
    assert.strictEqual(isNodeJS(), true);
    assert.strictEqual(isNodeJS(), true);
  });

  it('isMobileDevice', () => {
    assert.strictEqual(isMobileDevice(), false);
    assert.strictEqual(isMobileDevice(), false);
  });
});
