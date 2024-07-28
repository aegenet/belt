/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { RaceResult, RaceTime } from '../browser';

describe('RaceResult', () => {
  it('Two lap', async () => {
    const result = new RaceResult({
      name: 'n°1',
      spec: () => {
        /* */
      },
    });
    result.laps = [new RaceTime(1000000000000, 1), new RaceTime(1000000000, 2)];
    result.compute();

    assert.deepStrictEqual(result.humanize(), {
      duration: '16.68 min.',
      fastest: '1.00 sec.',
      laps: 2,
      average: '8.34 min.',
      name: 'n°1',
      'p50 <': '16.67 min.',
      p75: '16.67 min.',
      p90: '16.67 min.',
      slowdown: '1.00x',
      samplesPerLap: 1,
      slowest: '16.67 min.',
    });
  });

  it('Custom fields', async () => {
    const result = new RaceResult({
      name: 'n°1',
      spec: () => {
        /* */
      },
    });
    result.laps = [new RaceTime(1000000000000, 1, { a: 1 }), new RaceTime(1000000000, 2, { a: 2 })];
    result.compute();

    assert.deepStrictEqual(result.humanize(), {
      duration: '16.68 min.',
      fastest: '1.00 sec.',
      laps: 2,
      'max a': 2,
      'min a': 1,
      average: '8.34 min.',
      name: 'n°1',
      'p50 <': '16.67 min.',
      p75: '16.67 min.',
      p90: '16.67 min.',
      slowdown: '1.00x',
      samplesPerLap: 1,
      slowest: '16.67 min.',
    });
  });
});
