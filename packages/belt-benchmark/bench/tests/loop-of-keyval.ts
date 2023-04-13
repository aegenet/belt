import * as assert from 'node:assert';
import { RaceResult, Racetrack, ILapContext } from '../../src/common';
import { NodeRacetrack } from '../../src/node';

export async function loopOfKeyValues(duration: number): Promise<RaceResult[]> {
  const samples: Record<string, number> = {
    a: 8,
    b: 3,
    c: 4,
    d: 1,
    e: 0,
    f: 5,
    g: 2,
    h: 6,
    i: 9,
    j: 7,
  };

  const racetrack: Racetrack = new NodeRacetrack({
    name: 'Loop Key,Value from an object',
    duration,
  });
  const stats = await racetrack.race(
    {
      name: 'Object.keys() + for i',
      explain: `
const keys = Object.keys(samples);
for (let i = 0; i < keys.length; i++) {
  // ...
}
`,
      spec: (ctx: ILapContext<number>) => {
        const map = new Map<string, number>();
        // ctx.begin();
        const keys = Object.keys(samples);
        for (let i = 0; i < keys.length; i++) {
          map.set(keys[i], samples[keys[i]]);
        }
        // ctx.end();
        assert.strictEqual(map.get('a'), 8);
        return map;
      },
    },
    {
      name: 'Object.keys().forEach',
      explain: `
Object.keys(samples).forEach(key => {
  // ...
});
`,
      spec: (ctx: ILapContext<number>) => {
        const map = new Map<string, number>();
        // ctx.begin();
        Object.keys(samples).forEach(key => {
          map.set(key, samples[key]);
        });
        // ctx.end();
        assert.strictEqual(map.get('a'), 8);
        return map;
      },
    },
    {
      name: 'for of Object.keys()',
      explain: `
for (const key of Object.keys(samples)) {
  // ...
}
`,
      spec: (ctx: ILapContext<number>) => {
        const map = new Map<string, number>();
        // ctx.begin();
        for (const key of Object.keys(samples)) {
          map.set(key, samples[key]);
        }
        // ctx.end();
        assert.strictEqual(map.get('a'), 8);
        return map;
      },
    },
    {
      name: 'for of Object.entries()',
      explain: `
for (const [key, value] of Object.entries(samples)) {
  // ...
}
`,
      spec: (ctx: ILapContext<number>) => {
        const map = new Map<string, number>();
        // ctx.begin();
        for (const [key, value] of Object.entries(samples)) {
          map.set(key, value);
        }
        // ctx.end();
        assert.strictEqual(map.get('a'), 8);
        return map;
      },
    },
    {
      name: 'for in',
      explain: `
for (const key in samples) {
  // ...
}
`,
      spec: (ctx: ILapContext<number>) => {
        const map = new Map<string, number>();
        // ctx.begin();
        for (const key in samples) {
          map.set(key, samples[key]);
        }
        // ctx.end();
        return map;
      },
    }
  );
  assert.ok(stats);
  return stats;
}
