import { RaceResult, Racetrack, ILapContext } from '../../src/common';
import { NodeRacetrack } from '../../src/node';

export async function ifElseOrNot(laps: number): Promise<RaceResult[]> {
  const ifReturn = (key: string) => {
    if (key === 'mul') {
      return Math.PI * Date.now();
    }
    if (key === 'div') {
      return Math.PI / Date.now();
    }
    if (key === 'sum') {
      return Math.PI + Date.now();
    }
    if (key === 'sub') {
      return Math.PI - Date.now();
    }
    return 0;
  };

  const ifElseReturn = (key: string) => {
    if (key === 'mul') {
      return Math.PI * Date.now();
    } else if (key === 'div') {
      return Math.PI / Date.now();
    } else if (key === 'sum') {
      return Math.PI + Date.now();
    } else if (key === 'sub') {
      return Math.PI - Date.now();
    } else {
      return 0;
    }
  };

  const ifElseOneReturn = (key: string) => {
    let val: number = 0;
    if (key === 'mul') {
      val = Math.PI * Date.now();
    } else if (key === 'div') {
      val = Math.PI / Date.now();
    } else if (key === 'sum') {
      val = Math.PI + Date.now();
    } else if (key === 'sub') {
      val = Math.PI - Date.now();
    }
    return val;
  };

  let res: number;
  const racetrack: Racetrack = new NodeRacetrack({
    name: 'If Else Return?',
    laps,
  });
  const stats = await racetrack.race(
    {
      name: 'If Multi return',
      explain: `
if (xxx)
  return a;
if (yyyy)
  return b;
`,
      spec: (ctx: ILapContext<number>) => {
        ctx.begin();
        res = ifReturn('sum') + ifReturn('mul') + ifReturn('div') + ifReturn('sub');
        ctx.end();
        return res;
      },
    },
    {
      name: 'If Else Multi return',
      explain: `
if (xxx)
  return a;
else if (yyyy)
  return b;
`,
      spec: (ctx: ILapContext<number>) => {
        ctx.begin();
        res = ifElseReturn('sum') + ifElseReturn('mul') + ifElseReturn('div') + ifElseReturn('sub');
        ctx.end();
        return res;
      },
    },
    {
      name: 'If Else One return',
      explain: `
let result;
if (xxx)
  result = a;
else if (yyyy)
  result = b;

return result;
`,
      spec: (ctx: ILapContext<number>) => {
        ctx.begin();
        res = ifElseOneReturn('sum') + ifElseOneReturn('mul') + ifElseOneReturn('div') + ifElseOneReturn('sub');
        ctx.end();
        return res;
      },
    }
  );
  return stats;
}
