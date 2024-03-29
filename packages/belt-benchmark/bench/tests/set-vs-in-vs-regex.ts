import { RaceResult, Racetrack, ILapContext } from '../../src/common';
import { NodeRacetrack } from '../../src/node';

export async function setVSInVSRegex(duration: number): Promise<RaceResult[]> {
  const set: Set<string> = new Set(['mul', 'div', 'sum', 'sub']);
  const regex = /^(mul|div|sum|sub)$/;
  const obj: Record<string, unknown> = {
    mul: 1,
    div: 1,
    sum: 1,
    sub: 1,
  };

  let res: number = 0;
  const racetrack: Racetrack = new NodeRacetrack({
    name: 'Set VS Regex VS In Object VS Object property',
    duration,
  });
  const stats = await racetrack.race(
    {
      name: 'Set',
      explain: `const set = new Set([/* ... */]);
set.has('key')
`,
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        for (let i = 0; i < 100; i++) {
          res += ((set.has('dontexist') ? 'dontexist' : '') + (set.has('sum') ? 'sum' : '') + (set.has('mul') ? 'mul' : '') + (set.has('div') ? 'div' : '') + (set.has('sub') ? 'sub' : '')).length;
        }
        // ctx.end();
        return res;
      },
    },
    {
      name: 'RegExp',
      explain: `const regex = /^(mul|div|sum|sub)$/;
regex.test('key')
`,
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        for (let i = 0; i < 100; i++) {
          res += ((regex.test('dontexist') ? 'dontexist' : '') + (regex.test('sum') ? 'sum' : '') + (regex.test('mul') ? 'mul' : '') + (regex.test('div') ? 'div' : '') + (regex.test('sub') ? 'sub' : '')).length;
        }
        // ctx.end();
        return res;
      },
    },
    {
      name: 'Object in',
      explain: `if ('key' in obj) { /* ... */ }`,
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        for (let i = 0; i < 100; i++) {
          res += (('dontexist' in obj ? 'dontexist' : '') + ('sum' in obj ? 'sum' : '') + ('mul' in obj ? 'mul' : '') + ('div' in obj ? 'div' : '') + ('sub' in obj ? 'sub' : '')).length;
        }
        // ctx.end();
        return res;
      },
    },
    {
      name: 'Object property',
      explain: `if (obj['key']) { /* ... */ }`,
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        for (let i = 0; i < 100; i++) {
          res += ((obj['dontexist'] ? 'dontexist' : '') + (obj['sum'] ? 'sum' : '') + (obj['mul'] ? 'mul' : '') + (obj['div'] ? 'div' : '') + (obj['sub'] ? 'sub' : '')).length;
        }
        // ctx.end();
        return res;
      },
    },
    {
      name: 'Object hasOwnProperty',
      explain: `if (obj.hasOwnProperty('key')) { /* ... */ }`,
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        for (let i = 0; i < 100; i++) {
          res += (
            (obj.hasOwnProperty('dontexist') ? 'dontexist' : '') +
            (obj.hasOwnProperty('sum') ? 'sum' : '') +
            (obj.hasOwnProperty('mul') ? 'mul' : '') +
            (obj.hasOwnProperty('div') ? 'div' : '') +
            (obj.hasOwnProperty('sub') ? 'sub' : '')
          ).length;
        }
        // ctx.end();
        return res;
      },
    },
    {
      name: 'Object.hasOwn',
      explain: `if (Object.hasOwn(obj, 'key')) { /* ... */ }`,
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        for (let i = 0; i < 100; i++) {
          res += (
            ((Object as any).hasOwn(obj, 'dontexist') ? 'dontexist' : '') +
            ((Object as any).hasOwn(obj, 'sum') ? 'sum' : '') +
            ((Object as any).hasOwn(obj, 'mul') ? 'mul' : '') +
            ((Object as any).hasOwn(obj, 'div') ? 'div' : '') +
            ((Object as any).hasOwn(obj, 'sub') ? 'sub' : '')
          ).length;
        }
        // ctx.end();
        return res;
      },
    }
  );
  return stats;
}
