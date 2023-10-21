import * as assert from 'node:assert';
import { RaceResult, Racetrack, ILapContext } from '../../src/common';
import { NodeRacetrack } from '../../src/node';

export async function declareInLoop(duration: number): Promise<RaceResult[]> {
  const racetrack: Racetrack = new NodeRacetrack({
    name: 'Declare in loop or not',
    duration,
  });
  const stats = await racetrack.race(
    {
      name: 'const in loop',
      spec: (ctx: ILapContext<number>) => {
        const map = new Map<number, number>();
        // ctx.begin();
        for (let i = 0; i < 10000; i++) {
          const myVarInLoop = i * 5;
          map.set(i, myVarInLoop);
        }
        // ctx.end();
        return map;
      },
    },
    {
      name: 'let out loop',
      spec: (ctx: ILapContext<number>) => {
        const map = new Map<number, number>();
        // ctx.begin();
        let myVarOutLoop: number;
        for (let i = 0; i < 100; i++) {
          myVarOutLoop = i * 5;
          map.set(i, myVarOutLoop);
        }
        // ctx.end();
        return map;
      },
    },
    {
      name: 'No var',
      spec: (ctx: ILapContext<number>) => {
        const map = new Map<number, number>();
        // ctx.begin();
        for (let i = 0; i < 100; i++) {
          map.set(i, i * 5);
        }
        // ctx.end();
        return map;
      },
    }
  );
  assert.ok(stats);
  return stats;
}
