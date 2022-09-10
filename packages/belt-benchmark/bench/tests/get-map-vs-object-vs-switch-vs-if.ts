import { RaceResult, Racetrack, ILapContext } from '../../src/common';
import { NodeRacetrack } from '../../src/node';

export async function getMapVSObjectVSSwitchVSIf(duration: number): Promise<RaceResult[]> {
  const map: Map<string, () => number> = new Map([
    ['mul', () => Math.PI * Date.now()],
    ['div', () => Math.PI / Date.now()],
    ['sum', () => Math.PI + Date.now()],
    ['sub', () => Math.PI - Date.now()],
  ]);
  const objMap: Record<string, () => number> = {
    mul: () => Math.PI * Date.now(),
    div: () => Math.PI / Date.now(),
    sum: () => Math.PI + Date.now(),
    sub: () => Math.PI - Date.now(),
  };

  const fromMap = (key: string) => (map.has(key) ? map.get(key)!() : 0);
  const fromObject = (key: string) => (objMap[key] ? objMap[key]() : 0);
  const fromSwitch = (key: string) => {
    switch (key) {
      case 'mul':
        return Math.PI * Date.now();
      case 'div':
        return Math.PI / Date.now();
      case 'sum':
        return Math.PI + Date.now();
      case 'sub':
        return Math.PI - Date.now();
      default:
        return 0;
    }
  };
  const fromIf = (key: string) => {
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

  let res: number;
  const racetrack: Racetrack = new NodeRacetrack({
    name: '(Get only, no set) Map VS Object VS switch VS if',
    duration,
  });
  const stats = await racetrack.race(
    {
      name: 'Map',
      explain: `map.get(key)`,
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        res = fromMap('sum') + fromMap('mul') + fromMap('div') + fromMap('sub');
        // ctx.end();
        return res;
      },
    },
    {
      name: 'Object',
      explain: `obj[key]`,
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        res = fromObject('sum') + fromObject('mul') + fromObject('div') + fromObject('sub');
        // ctx.end();
        return res;
      },
    },
    {
      name: 'Switch',
      explain: `switch (key)`,
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        res = fromSwitch('sum') + fromSwitch('mul') + fromSwitch('div') + fromSwitch('sub');
        // ctx.end();
        return res;
      },
    },
    {
      name: 'If',
      explain: `if (key === 'a') { return something }`,
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        res = fromIf('sum') + fromIf('mul') + fromIf('div') + fromIf('sub');
        // ctx.end();
        return res;
      },
    }
  );
  return stats;
}
