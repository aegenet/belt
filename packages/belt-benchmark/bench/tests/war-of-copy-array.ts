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

export async function warOfCopyArray(duration: number, arraySize: number): Promise<RaceResult[]> {
  const samples = generateTestArray(arraySize);
  const raceTrack: Racetrack = new NodeRacetrack({
    name: `War of Copy Array - ${arraySize} items`,
    duration,
  });

  const stats = await raceTrack.race(
    {
      name: 'slice',
      explain: `
samples.slice();
`,
      spec: (ctx: ILapContext<number>) => {
        return samples.slice();
      },
    },
    {
      name: '[...samples]',
      explain: `
[...samples];
`,
      spec: (ctx: ILapContext<number>) => {
        return [...samples];
      },
    },
    {
      name: 'JSON',
      explain: `
JSON.parse(JSON.stringify(samples);
`,
      spec: (ctx: ILapContext<number>) => {
        return JSON.parse(JSON.stringify(samples));
      },
    },
    {
      name: 'Array.from',
      explain: `
Array.from(samples);
`,
      spec: (ctx: ILapContext<number>) => {
        return Array.from(samples);
      },
    }
  );
  return stats;
}
