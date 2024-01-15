import * as assert from 'node:assert';
import { delay } from '../node';

describe('delay node', function () {
  it('delay', async function () {
    const beforeTime = Date.now();
    await delay(300);
    assert.equal(Date.now() >= beforeTime + 300, true);
  });
});
