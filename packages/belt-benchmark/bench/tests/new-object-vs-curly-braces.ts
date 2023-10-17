import * as assert from 'node:assert';
import { RaceResult, Racetrack, ILapContext } from '../../src/common';
import { NodeRacetrack } from '../../src/node';

export async function newObjectVSCurlyBraces(duration: number): Promise<RaceResult[]> {
  const racetrack: Racetrack = new NodeRacetrack({
    name: 'new Object() vs Curly braces ({})',
    duration,
  });
  const stats = await racetrack.race(
    {
      name: 'new object()',
      explain: `
const map = new Map<number, unknown>();
for (let i = 0; i < 10000; i++) {
  map.set(i, new object());
}
`,
      spec: (ctx: ILapContext<number>) => {
        const map = new Map<number, unknown>();
        for (let i = 0; i < 10000; i++) {
          map.set(i, new Object());
        }
        return map;
      },
    },
    {
      name: 'Object.create({})',
      explain: `
const map = new Map<number, unknown>();
for (let i = 0; i < 10000; i++) {
  map.set(i, Object.create());
}
`,
      spec: (ctx: ILapContext<number>) => {
        const map = new Map<number, unknown>();
        for (let i = 0; i < 10000; i++) {
          map.set(i, Object.create({}));
        }
        return map;
      },
    },
    {
      name: 'Curly braces {}',
      explain: `
const map = new Map<number, unknown>();
for (let i = 0; i < 10000; i++) {
  map.set(i, {});
}
`,
      spec: (ctx: ILapContext<number>) => {
        const map = new Map<number, unknown>();
        for (let i = 0; i < 10000; i++) {
          map.set(i, {});
        }
        return map;
      },
    }
  );
  assert.ok(stats);
  return stats;
}
