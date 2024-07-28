/**
 * @vitest-environment node
 */
// eslint-disable no-console
import { describe, it, assert } from 'vitest';
import { setTimeout } from 'node:timers/promises';
import { randomUUID } from 'node:crypto';
import { type ILapContext, NodeRacetrack } from '../node';

describe('Node Racetrack', () => {
  it('inc me', async () => {
    let i = 0;
    let j = 0;
    const func = () => i++;
    const a = {
      b: 0,
    };
    const begin = process.hrtime.bigint();
    for (; j < 65536; j++) {
      a.b = func();
    }
    const duration = process.hrtime.bigint() - begin;
    console.log(duration);
    console.log(Number(duration) / 65536);

    const racetrack = new NodeRacetrack({
      duration: 1000,
      accuracy: {
        unit: 'us',
        value: 200,
      },
      onProgress: console.log,
    });
    i = 0;
    const stats = await racetrack.race({
      spec: () => {
        return i++;
      },
    });
    assert.ok(stats);
    assert.ok(i);
    console.table(stats.map(f => f.humanize()));
  });

  it('custom accuracy ns', async () => {
    const racetrack = new NodeRacetrack({
      duration: 1000,
      accuracy: {
        unit: 'ns',
        value: 500,
      },
    });
    let i = 0;
    const stats = await racetrack.race({
      spec: () => {
        i++;
      },
    });
    assert.ok(stats);
    assert.ok(i);
    console.table(stats.map(f => f.humanize()));
  });

  it('custom accuracy us', async () => {
    const racetrack = new NodeRacetrack({
      duration: 1000,
      accuracy: {
        unit: 'us',
        value: 100,
      },
    });
    let i = 0;
    const stats = await racetrack.race({
      spec: () => {
        i++;
      },
    });
    assert.ok(stats);
    assert.ok(i);
    console.table(stats.map(f => f.humanize()));
  });

  it('custom accuracy ms', async () => {
    const racetrack = new NodeRacetrack({
      duration: 1000,
      accuracy: {
        unit: 'ms',
        value: 100,
      },
    });
    let i = 0;
    const stats = await racetrack.race({
      spec: () => {
        i++;
      },
    });
    assert.ok(stats);
    assert.ok(i);
    console.table(stats.map(f => f.humanize()));
  });

  it('Auto abort', async () => {
    const racetrack = new NodeRacetrack({
      duration: 1000,
      accuracy: {
        unit: 'ms',
        value: 400,
      },
    });
    try {
      await racetrack.race({
        async: true,
        spec: async () => {
          await setTimeout(5000);
        },
      });
      throw new Error('Must failed.');
    } catch (error: any) {
      assert.strictEqual(error.message, 'Race has been aborted.');
    }
  }, 15000);

  it('War of for', async () => {
    const samples = [8, 3, 4, 1, 0, 5, 2, 6, 9, 7];

    const racetrack = new NodeRacetrack({
      duration: 1000,
    });
    const stats = await racetrack.race(
      {
        name: 'for i',
        spec: (ctx: ILapContext<number>) => {
          let count = ctx.value || 0;
          // ctx.begin();
          for (let i = 0; i < samples.length; i++) {
            count += samples[i];
          }
          // ctx.end();
          return count;
        },
      },
      {
        name: 'for of',
        spec: (ctx: ILapContext<number>) => {
          let count = ctx.value || 0;
          // ctx.begin();
          for (const val of samples) {
            count += val;
          }
          // ctx.end();
          return count;
        },
      },
      {
        name: 'forEach',
        spec: (ctx: ILapContext<number>) => {
          let count = ctx.value || 0;
          // ctx.begin();
          samples.forEach(val => {
            count += val;
          });
          // ctx.end();
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
      duration: 1000,
    });
    const stats = await racetrack.race(
      {
        name: 'Object.keys() + for i',
        spec: () => {
          const map = new Map<string, number>();
          // // ctx.begin();
          const keys = Object.keys(samples);
          for (let i = 0; i < keys.length; i++) {
            map.set(keys[i], samples[keys[i]]);
          }
          // // ctx.end();
          assert.strictEqual(map.get('a'), 8);
          return map;
        },
      },
      {
        name: 'Object.keys().forEach',
        spec: () => {
          const map = new Map<string, number>();
          // // ctx.begin();
          Object.keys(samples).forEach(key => {
            map.set(key, samples[key]);
          });
          // // ctx.end();
          assert.strictEqual(map.get('a'), 8);
          return map;
        },
      },
      {
        name: 'for of Object.keys()',
        spec: () => {
          const map = new Map<string, number>();
          // // ctx.begin();
          for (const key of Object.keys(samples)) {
            map.set(key, samples[key]);
          }
          // // ctx.end();
          assert.strictEqual(map.get('a'), 8);
          return map;
        },
      },
      {
        name: 'for of Object.entries()',
        spec: () => {
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
        spec: () => {
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
    console.table(stats.map(f => f.humanize()));
  });

  it('Before / After hooks', async () => {
    const racetrack = new NodeRacetrack({
      duration: 1000,
      beforeLap: ctx => {
        ctx.shared.set('samples', {
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
        });
      },
      afterLap: ctx => {
        assert.ok(ctx.shared.has('samples'));
      },
    });
    const stats = await racetrack.race(
      {
        name: 'Object.keys() + for i',
        spec: (ctx: ILapContext<number>) => {
          const samples = ctx.shared.get('samples') as any;
          const map = new Map<string, number>();
          // // ctx.begin();
          const keys = Object.keys(samples);
          for (let i = 0; i < keys.length; i++) {
            map.set(keys[i], samples[keys[i]]);
          }
          // // ctx.end();
          assert.strictEqual(map.get('a'), 8);
          return map;
        },
      },
      {
        name: 'Object.keys().forEach',
        spec: (ctx: ILapContext<number>) => {
          const samples = ctx.shared.get('samples') as any;
          const map = new Map<string, number>();
          // // ctx.begin();
          Object.keys(samples).forEach(key => {
            map.set(key, samples[key]);
          });
          // // ctx.end();
          assert.strictEqual(map.get('a'), 8);
          return map;
        },
      },
      {
        name: 'for of Object.keys()',
        spec: (ctx: ILapContext<number>) => {
          const samples = ctx.shared.get('samples') as any;
          const map = new Map<string, number>();
          // // ctx.begin();
          for (const key of Object.keys(samples)) {
            map.set(key, samples[key]);
          }
          // // ctx.end();
          assert.strictEqual(map.get('a'), 8);
          return map;
        },
      },
      {
        name: 'for of Object.entries()',
        spec: (ctx: ILapContext<number>) => {
          const samples = ctx.shared.get('samples') as object;
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
        spec: (ctx: ILapContext<number>) => {
          const samples = ctx.shared.get('samples') as any;
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
    console.table(stats.map(f => f.humanize()));
  });

  it('beforeAll', async () => {
    const racetrack = new NodeRacetrack({
      duration: 1000,
      beforeLap: ctx => ctx.shared.set('key', randomUUID()),
    });
    let i = 0;
    const stats = await racetrack.race({
      spec: ctx => {
        return (ctx.shared.get('key') as string).length + i++;
      },
    });
    assert.ok(stats);
    assert.ok(i);
    console.table(stats.map(f => f.humanize()));
  });
});
