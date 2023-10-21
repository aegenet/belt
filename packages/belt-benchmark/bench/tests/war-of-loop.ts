import { type RaceResult, type Racetrack, type ILapContext } from '../../src/common';
import { NodeRacetrack } from '../../src/node';
import { type BenchItemType, generateTestArray } from './common';

export async function warOfLoop(duration: number, arraySize: number, itemType: BenchItemType): Promise<RaceResult[]> {
  const samples = generateTestArray(arraySize, itemType);
  const raceTrack: Racetrack = new NodeRacetrack({
    name: `War of Loop (${itemType}) - ${arraySize} items`,
    duration,
  });

  const stats = await raceTrack.race(
    {
      name: 'for i',
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
