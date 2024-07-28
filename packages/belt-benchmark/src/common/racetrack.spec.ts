/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { Racetrack } from '../browser';

describe('Racetrack', () => {
  it('No Performance API', async () => {
    try {
      new Racetrack(
        {
          duration: 1000,
        },
        {
          performance: null as any,
        }
      );
      throw new Error('Must failed');
    } catch (error: any) {
      assert.strictEqual(error.message, 'Performance API must be available (https://caniuse.com/?search=performance).');
    }
  });
});
