import * as assert from 'node:assert';
import { collectSequentially } from './index';

describe('collectSequentially', () => {
  it(`Promises`, async () => {
    let res = 0;
    const results = await collectSequentially(
      () => {
        res = 1;
        return Promise.resolve(true);
      },
      () => {
        res = 2;
        return Promise.resolve(false);
      }
    );

    assert.equal(res, 2);
    assert.equal(JSON.stringify(results), '[true,false]');
  });

  it(`Promises or not promises`, async () => {
    let res = 0;
    const results = await collectSequentially(
      () => {
        res = 1;
        return Promise.resolve(true);
      },
      () => {
        res = 2;
      }
    );

    assert.equal(res, 2);
    assert.equal(JSON.stringify(results), '[true,null]');
  });
});
