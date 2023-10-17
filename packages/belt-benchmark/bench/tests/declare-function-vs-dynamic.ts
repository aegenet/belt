import { RaceResult, Racetrack, ILapContext } from '../../src/common';
import { NodeRacetrack } from '../../src/node';

export async function declareFunctionVSDynamic(duration: number): Promise<RaceResult[]> {
  const samples = [8, 3, 4, 1, 0, 5, 2, 6, 9, 7];
  const declareFilter = (f: number) => {
    return f > 3 && f < 9;
  };

  function declareFunctionFilter(f: number) {
    return f > 3 && f < 9;
  }

  let res: string;
  const racetrack: Racetrack = new NodeRacetrack({
    name: 'Declared Function VS Dynamic',
    duration,
  });
  const stats = await racetrack.race(
    {
      name: 'Dynamic function',
      explain: `samples.filter(function (f) {
        return f > 3 && f < 9;
      })`,
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
      name: 'Declared function',
      explain: `const declareFilter = (f: number) => {
        return f > 3 && f < 9;
      };
      // [...]
      samples.filter(declareFunctionFilter)`,
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        res = '';
        for (let i = 0; i < 100; i++) {
          res += samples.filter(declareFunctionFilter);
        }
        // ctx.end();
        return res;
      },
    },
    {
      name: 'Declared arrow function',
      explain: `function declareFunctionFilter(f: number) {
        return f > 3 && f < 9;
      }
      // [...]
      samples.filter(declareFunctionFilter)`,
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        res = '';
        for (let i = 0; i < 100; i++) {
          res += samples.filter(declareFilter);
        }
        // ctx.end();
        return res;
      },
    }
  );
  return stats;
}
