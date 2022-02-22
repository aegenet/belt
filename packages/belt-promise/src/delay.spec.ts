import * as assert from 'assert';
import { delay } from './index';

describe('delay', function () {
  it('delay', async function () {
    const beforeTime = Date.now();
    await delay(300);
    assert.equal(Date.now() >= beforeTime + 300, true);
  });
});
