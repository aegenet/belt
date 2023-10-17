import * as assert from 'node:assert';
import { RaceResult, Racetrack, ILapContext } from '../../src/common';
import { NodeRacetrack } from '../../src/node';

export async function dateNowVSGetTime(duration: number): Promise<RaceResult[]> {
  const racetrack: Racetrack = new NodeRacetrack({
    name: 'Date.now() VS new Date().getTime()',
    duration,
  });
  const stats = await racetrack.race(
    {
      name: 'new Date().getTime()',
      explain: `
time = new Date().getTime();
`,
      spec: (ctx: ILapContext<number>) => {
        return new Date().getTime();
      },
    },
    {
      name: 'Date.now()',
      explain: `
time = Date.now();
`,
      spec: (ctx: ILapContext<number>) => {
        return Date.now();
      },
    }
  );
  assert.ok(stats);
  return stats;
}
