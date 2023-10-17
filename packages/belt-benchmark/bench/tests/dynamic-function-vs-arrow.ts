import { RaceResult, Racetrack, ILapContext } from '../../src/common';
import { NodeRacetrack } from '../../src/node';

export async function dynamicFunctionVSArrow(duration: number): Promise<RaceResult[]> {
  const samples = [8, 3, 4, 1, 0, 5, 2, 6, 9, 7];
  let res: string;
  const racetrack: Racetrack = new NodeRacetrack({
    name: 'Dynamic Function VS Arrow Function',
    duration,
  });
  const stats = await racetrack.race(
    {
      name: 'Function',
      explain: `
samples.filter(function (f) {
  return f > 3 && f < 9;
});
`,
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        res = '';
        for (let i = 0; i < 100; i++) {
          res += samples.filter(function (f) {
            return f > 3 && f < 9;
          });
        }
        // ctx.end();
        return res;
      },
    },
    {
      name: 'Anonymous',
      explain: `
samples.filter(f => {
  return f > 3 && f < 9;
});
`,
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        res = '';
        for (let i = 0; i < 100; i++) {
          res += samples.filter(f => {
            return f > 3 && f < 9;
          });
        }
        // ctx.end();
        return res;
      },
    }
  );
  return stats;
}
