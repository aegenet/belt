import { RaceResult, Racetrack, ILapContext } from '../../src/common';
import { NodeRacetrack } from '../../src/node';

export async function warOfLoop(duration: number): Promise<RaceResult[]> {
  const samples = [8, 3, 4, 1, 0, 5, 2, 6, 9, 7];
  const raceTrack: Racetrack = new NodeRacetrack({
    name: 'War of Loop',
    duration,
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
        for (let i = 0; i < samples.length; i++) {
          count += samples[i];
        }
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
        for (const val of samples) {
          count += val;
        }
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
        samples.forEach(val => {
          count += val;
        });
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
        let i = 0;
        while (i < samples.length) {
          count += samples[i];
          i++;
        }
        return count;
      },
    }
  );
  return stats;
}
