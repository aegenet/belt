import { RaceResult, Racetrack, ILapContext } from '../../src/common';
import { NodeRacetrack } from '../../src/node';

export async function setVSInVSRegex(laps: number): Promise<RaceResult[]> {
  const set: Set<string> = new Set(['mul', 'div', 'sum', 'sub']);
  const regex = /^(mul|div|sum|sub)$/;
  const obj: Record<string, unknown> = {
    mul: 1,
    div: 1,
    sum: 1,
    sub: 1,
  };

  let res: string;
  const racetrack: Racetrack = new NodeRacetrack({
    name: 'Set VS Regex VS In Object VS Object property',
    laps,
  });
  const stats = await racetrack.race(
    {
      name: 'Set',
      explain: `const set = new Set([/* ... */]);
set.has('key')
`,
      spec: (ctx: ILapContext<number>) => {
        ctx.begin();
        for (let i = 0; i < 100; i++) {
          res += (set.has('dontexist') ? 'dontexist' : '') + (set.has('sum') ? 'sum' : '') + (set.has('mul') ? 'mul' : '') + (set.has('div') ? 'div' : '') + (set.has('sub') ? 'sub' : '');
        }
        ctx.end();
        return res;
      },
    },
    {
      name: 'RegExp',
      explain: `const regex = /^(mul|div|sum|sub)$/;
regex.test('key')
`,
      spec: (ctx: ILapContext<number>) => {
        ctx.begin();
        for (let i = 0; i < 100; i++) {
          res += (regex.test('dontexist') ? 'dontexist' : '') + (regex.test('sum') ? 'sum' : '') + (regex.test('mul') ? 'mul' : '') + (regex.test('div') ? 'div' : '') + (regex.test('sub') ? 'sub' : '');
        }
        ctx.end();
        return res;
      },
    },
    {
      name: 'Object in',
      explain: `if ('key' in obj) { /* ... */ }`,
      spec: (ctx: ILapContext<number>) => {
        ctx.begin();
        for (let i = 0; i < 100; i++) {
          res += ('dontexist' in obj ? 'dontexist' : '') + ('sum' in obj ? 'sum' : '') + ('mul' in obj ? 'mul' : '') + ('div' in obj ? 'div' : '') + ('sub' in obj ? 'sub' : '');
        }
        ctx.end();
        return res;
      },
    },
    {
      name: 'Object property',
      explain: `if (obj['key']) { /* ... */ }`,
      spec: (ctx: ILapContext<number>) => {
        ctx.begin();
        for (let i = 0; i < 100; i++) {
          res += (obj['dontexist'] ? 'dontexist' : '') + (obj['sum'] ? 'sum' : '') + (obj['mul'] ? 'mul' : '') + (obj['div'] ? 'div' : '') + (obj['sub'] ? 'sub' : '');
        }
        ctx.end();
        return res;
      },
    }
  );
  return stats;
}
