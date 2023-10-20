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

export async function warOfReduce(
  duration: number,
  options: {
    arraySize: number;
    increment?: number;
    max?: number;
  }
): Promise<RaceResult[]> {
  let samples: Array<{ a: number; b: number; r: 0 }> = generateTestArray(options.arraySize);
  let arraySize = options.arraySize;
  const raceTrack: Racetrack = new NodeRacetrack({
    name: `War of Reduce - ${options.arraySize}${options.increment ? ` - inc by ${options.increment} each lap` : ''} items`,
    duration,
    afterLap(ctx) {
      if (options.increment) {
        arraySize += options.increment;
        if (options.max && arraySize > options.max) {
          arraySize = options.max;
        }
        samples = generateTestArray(arraySize);
      }
    },
  });

  const stats = await raceTrack.race(
    {
      name: 'for i',
      explain: `
let reduce = 0;
for (let i = 0; i < samples.length; i++) {
  reduce += samples[i].a + samples[i].b;
}
return reduce;
`,
      spec: (ctx: ILapContext<number>) => {
        let reduce = 0;
        for (let i = 0; i < samples.length; i++) {
          reduce += samples[i].a + samples[i].b;
        }
        return reduce;
      },
    },
    {
      name: 'for i (len outside)',
      explain: `
const len = samples.length;
let reduce = 0;
for (let i = 0; i < len; i++) {
  reduce += samples[i].a + samples[i].b;
}
return reduce;
`,
      spec: (ctx: ILapContext<number>) => {
        const len = samples.length;
        let reduce = 0;
        for (let i = 0; i < len; i++) {
          reduce += samples[i].a + samples[i].b;
        }
        return reduce;
      },
    },
    {
      name: 'for of',
      explain: `
let reduce = 0;
for (const val of samples) {
  reduce += val.a + val.b;
}
return reduce;
`,
      spec: (ctx: ILapContext<number>) => {
        let reduce = 0;
        for (const val of samples) {
          reduce += val.a + val.b;
        }
        return reduce;
      },
    },
    {
      name: 'forEach',
      explain: `
let reduce = 0;
samples.forEach(val => {
  reduce += val.a + val.b;
});
return reduce;
`,
      spec: (ctx: ILapContext<number>) => {
        let reduce = 0;
        samples.forEach(val => {
          reduce += val.a + val.b;
        });
        return reduce;
      },
    },
    {
      name: 'reduce',
      explain: `
return samples.reduce((prev, act) => {
  return prev + (act.a + act.b);
}, 0);
`,
      spec: (ctx: ILapContext<number>) => {
        return samples.reduce((prev, act) => {
          return prev + (act.a + act.b);
        }, 0);
      },
    },
    {
      name: 'while',
      explain: `
let reduce = 0;
let i = 0;
while (i < samples.length) {
  reduce += samples[i].a + samples[i].b;
  i++;
}
return reduce;
`,
      spec: (ctx: ILapContext<number>) => {
        let i = 0;
        let reduce = 0;
        while (i < samples.length) {
          reduce += samples[i].a + samples[i].b;
          i++;
        }
        return reduce;
      },
    }
  );
  return stats;
}
