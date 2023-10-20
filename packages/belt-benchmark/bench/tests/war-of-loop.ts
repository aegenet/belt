import { RaceResult, Racetrack, ILapContext } from '../../src/common';
import { NodeRacetrack } from '../../src/node';

function generateTestArray(arraySize: number) {
  const result = [];
  for (let i = 0; i < arraySize; ++i) {
    result.push({
      a: i,
      b: i / 2,
      r: 0,
    });
  }
  return result;
}

export async function warOfLoop(duration: number, arraySize: number): Promise<RaceResult[]> {
  const samples = generateTestArray(arraySize);
  const raceTrack: Racetrack = new NodeRacetrack({
    name: `War of Loop - ${arraySize} items`,
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
      name: 'for i (len outside)',
      explain: `
const len = samples.length;
for (let i = 0; i < len; i++) {
  // [...]
}
`,
      spec: (ctx: ILapContext<number>) => {
        let count = ctx.value || 0;
        const len = samples.length;
        for (let i = 0; i < len; i++) {
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
