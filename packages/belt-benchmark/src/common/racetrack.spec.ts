import * as assert from 'assert';
import { Racetrack } from '../browser';

describe('Racetrack', () => {
  it('No Performance API', async () => {
    try {
      new Racetrack(
        {
          laps: 100,
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
