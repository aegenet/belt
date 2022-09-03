import { RaceResult, Racetrack, ILapContext } from '../../src/common';
import { NodeRacetrack } from '../../src/node';

export async function warOfLoop(laps: number): Promise<RaceResult[]> {
  const samples = [8, 3, 4, 1, 0, 5, 2, 6, 9, 7];
  const raceTrack: Racetrack = new NodeRacetrack({
    name: 'War of Loop',
    laps,
  });

  const stats = await raceTrack.race(
    {
      name: 'for i',
      explain: `
for (let i = 0; i < samples.length; i++) {
  // [...]
}
`,
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
      explain: `
for (const val of samples) {
  // [...]
}
`,
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
      explain: `
samples.forEach(val => {
  // [...]
});
`,
      spec: (ctx: ILapContext<number>) => {
        let count = ctx.value || 0;
        ctx.begin();
        samples.forEach(val => {
          count += val;
        });
        ctx.end();
        return count;
      },
    },
    {
      name: 'while',
      explain: `
let i = 0;
while (i < samples.length) {
  // [...]
  i++;
}
`,
      spec: (ctx: ILapContext<number>) => {
        let count = ctx.value || 0;
        ctx.begin();
        let i = 0;
        while (i < samples.length) {
          count += samples[i];
          i++;
        }
        ctx.end();
        return count;
      },
    }
  );
  return stats;
}
