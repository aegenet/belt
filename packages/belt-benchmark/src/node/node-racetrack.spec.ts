import * as assert from 'assert';
import { ILapContext, NodeRacetrack } from '../node';

describe('Node Racetrack', () => {
  it('inc me', async () => {
    const racetrack = new NodeRacetrack({
      laps: 100,
    });
    let i = 0;
    const stats = await racetrack.race({
      spec: ctx => {
        // ctx.begin();
        i++;
        // ctx.end();
      },
    });
    assert.ok(stats);
    assert.ok(i);
    console.table(stats.map(f => f.humanize()));
  });

  it('specify begin/end', async () => {
    const racetrack = new NodeRacetrack({
      laps: 100,
    });
    let i = 0;
    const stats = await racetrack.race({
      spec: ctx => {
        ctx.begin();
        i++;
        ctx.end();
      },
    });
    assert.ok(stats);
    assert.ok(i);
    console.table(stats.map(f => f.humanize()));
  });

  it('War of for', async () => {
    const samples = [8, 3, 4, 1, 0, 5, 2, 6, 9, 7];

    const racetrack = new NodeRacetrack({
      laps: 1000,
    });
    const stats = await racetrack.race(
      {
        name: 'for i',
        spec: (ctx: ILapContext<number>) => {
          let count = ctx.value || 0;
          ctx.begin();
          for (let i = 0; i < samples.length; i++) {
            count += samples[i];
          }
          ctx.end();
          return count;
        },
      },
      {
        name: 'for of',
        spec: (ctx: ILapContext<number>) => {
          let count = ctx.value || 0;
          ctx.begin();
          for (const val of samples) {
            count += val;
          }
          ctx.end();
          return count;
        },
      },
      {
        name: 'forEach',
        spec: (ctx: ILapContext<number>) => {
          let count = ctx.value || 0;
          ctx.begin();
          samples.forEach(val => {
            count += val;
          });
          ctx.end();
          return count;
        },
      }
    );
    assert.ok(stats);
    console.table(stats.map(f => f.humanize()));
  });

  it('War of Key Value', async () => {
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

    const racetrack = new NodeRacetrack({
      laps: 1000,
    });
    const stats = await racetrack.race(
      {
        name: 'Object.keys() + for i',
        spec: (ctx: ILapContext<number>) => {
          const map = new Map<string, number>();
          ctx.begin();
          const keys = Object.keys(samples);
          for (let i = 0; i < keys.length; i++) {
            map.set(keys[i], samples[keys[i]]);
          }
          ctx.end();
          assert.strictEqual(map.get('a'), 8);
          return map;
        },
      },
      {
        name: 'Object.keys().forEach',
        spec: (ctx: ILapContext<number>) => {
          const map = new Map<string, number>();
          ctx.begin();
          Object.keys(samples).forEach(key => {
            map.set(key, samples[key]);
          });
          ctx.end();
          assert.strictEqual(map.get('a'), 8);
          return map;
        },
      },
      {
        name: 'for of Object.keys()',
        spec: (ctx: ILapContext<number>) => {
          const map = new Map<string, number>();
          ctx.begin();
          for (const key of Object.keys(samples)) {
            map.set(key, samples[key]);
          }
          ctx.end();
          assert.strictEqual(map.get('a'), 8);
          return map;
        },
      },
      {
        name: 'for of Object.entries()',
        spec: (ctx: ILapContext<number>) => {
          const map = new Map<string, number>();
          ctx.begin();
          for (const [key, value] of Object.entries(samples)) {
            map.set(key, value);
          }
          ctx.end();
          assert.strictEqual(map.get('a'), 8);
          return map;
        },
      },
      {
        name: 'for in',
        spec: (ctx: ILapContext<number>) => {
          const map = new Map<string, number>();
          ctx.begin();
          for (const key in samples) {
            map.set(key, samples[key]);
          }
          ctx.end();
          return map;
        },
      }
    );
    assert.ok(stats);
    console.table(stats.map(f => f.humanize()));
  });
});
