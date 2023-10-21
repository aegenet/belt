import { RaceResult, Racetrack, ILapContext } from '../../src/common';
import { NodeRacetrack } from '../../src/node';
import { type BenchItemType, generateTestArray } from './common';

export async function warOfCopyArray(duration: number, arraySize: number, itemType: BenchItemType): Promise<RaceResult[]> {
  const samples = generateTestArray(arraySize, itemType);
  const raceTrack: Racetrack = new NodeRacetrack({
    name: `War of Copy Array (${itemType}) - ${arraySize} items`,
    duration,
  });

  const stats = await raceTrack.race(
    {
      name: 'slice',
      spec: (ctx: ILapContext<number>) => {
        return samples.slice();
      },
    },
    {
      name: '[...samples]',
      spec: (ctx: ILapContext<number>) => {
        return [...samples];
      },
    },
    {
      name: 'JSON',
      spec: (ctx: ILapContext<number>) => {
        return JSON.parse(JSON.stringify(samples));
      },
    },
    {
      name: 'Array.from',
      spec: (ctx: ILapContext<number>) => {
        return Array.from(samples);
      },
    }
  );
  return stats;
}
