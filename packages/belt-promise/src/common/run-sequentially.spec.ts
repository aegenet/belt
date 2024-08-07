/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { runSequentially } from '../browser';

describe('runSequentially', () => {
  it(`Promises`, async () => {
    let res = 0;
    await runSequentially(
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
  });

  it(`Promises or not promises`, async () => {
    let res = 0;
    await runSequentially(
      () => {
        res = 1;
        return Promise.resolve(true);
      },
      () => {
        res = 2;
      }
    );

    assert.equal(res, 2);
  });
});
