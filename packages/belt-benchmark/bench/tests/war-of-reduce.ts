import type { RaceResult, Racetrack, ILapContext } from '../../src/common';
import { NodeRacetrack } from '../../src/node';
import { type BenchItemType, generateTestArray, type BenchItemObject } from './common';

export async function warOfReduce(
  duration: number,
  options: {
    itemType: BenchItemType;
    arraySize: number;
    increment?: number;
    max?: number;
  }
): Promise<RaceResult[]> {
  const itemType = options?.itemType || 'object';
  let samples: Array<BenchItemObject | number | string> = generateTestArray(options.arraySize, itemType);
  let arraySize = options.arraySize;
  const raceTrack: Racetrack = new NodeRacetrack({
    name: `War of Reduce (${itemType}) - ${options.arraySize}${options.increment ? ` - inc by ${options.increment} each lap` : ''} items`,
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
      spec:
        itemType === 'object'
          ? (ctx: ILapContext<number>) => {
              let reduce = 0;
              for (let i = 0; i < samples.length; i++) {
                reduce += (samples[i] as BenchItemObject).a + (samples[i] as BenchItemObject).b;
              }
              return reduce;
            }
          : itemType === 'number'
            ? (ctx: ILapContext<number>) => {
                let reduce = 0;
                for (let i = 0; i < samples.length; i++) {
                  reduce += samples[i] as number;
                }
                return reduce;
              }
            : (ctx: ILapContext<number>) => {
                let reduce = '';
                for (let i = 0; i < samples.length; i++) {
                  reduce += samples[i] as string;
                }
                return reduce;
              },
    },
    {
      name: 'for i (len outside)',
      spec:
        itemType === 'object'
          ? (ctx: ILapContext<number>) => {
              const len = samples.length;
              let reduce = 0;
              for (let i = 0; i < len; i++) {
                reduce += (samples[i] as BenchItemObject).a + (samples[i] as BenchItemObject).b;
              }
              return reduce;
            }
          : itemType === 'number'
            ? (ctx: ILapContext<number>) => {
                const len = samples.length;
                let reduce = 0;
                for (let i = 0; i < len; i++) {
                  reduce += samples[i] as number;
                }
                return reduce;
              }
            : (ctx: ILapContext<number>) => {
                const len = samples.length;
                let reduce = '';
                for (let i = 0; i < len; i++) {
                  reduce += samples[i] as string;
                }
                return reduce;
              },
    },
    {
      name: 'for of',
      spec:
        itemType === 'object'
          ? (ctx: ILapContext<number>) => {
              let reduce = 0;
              for (const val of samples as BenchItemObject[]) {
                reduce += val.a + val.b;
              }
              return reduce;
            }
          : itemType === 'number'
            ? (ctx: ILapContext<number>) => {
                let reduce = 0;
                for (const val of samples as number[]) {
                  reduce += val;
                }
                return reduce;
              }
            : (ctx: ILapContext<number>) => {
                let reduce = '';
                for (const val of samples as string[]) {
                  reduce += val;
                }
                return reduce;
              },
    },
    {
      name: 'forEach',
      spec:
        itemType === 'object'
          ? (ctx: ILapContext<number>) => {
              let reduce = 0;
              (samples as BenchItemObject[]).forEach(val => {
                reduce += val.a + val.b;
              });
              return reduce;
            }
          : itemType === 'number'
            ? (ctx: ILapContext<number>) => {
                let reduce = 0;
                (samples as number[]).forEach(val => {
                  reduce += val;
                });
                return reduce;
              }
            : (ctx: ILapContext<number>) => {
                let reduce = '';
                (samples as string[]).forEach(val => {
                  reduce += val;
                });
                return reduce;
              },
    },
    {
      name: 'reduce',
      spec:
        itemType === 'object'
          ? (ctx: ILapContext<number>) => {
              return (samples as BenchItemObject[]).reduce((prev, act) => {
                return prev + (act.a + act.b);
              }, 0);
            }
          : itemType === 'number'
            ? (ctx: ILapContext<number>) => {
                return (samples as number[]).reduce((prev, act) => {
                  return prev + (act + act);
                }, 0);
              }
            : (ctx: ILapContext<number>) => {
                return (samples as string[]).reduce((prev, act) => {
                  return prev + (act + act);
                }, '');
              },
    },
    {
      name: 'while',
      spec:
        itemType === 'object'
          ? (ctx: ILapContext<number>) => {
              let i = 0;
              let reduce = 0;
              while (i < samples.length) {
                reduce += (samples[i] as BenchItemObject).a + (samples[i] as BenchItemObject).b;
                i++;
              }
              return reduce;
            }
          : itemType === 'number'
            ? (ctx: ILapContext<number>) => {
                let i = 0;
                let reduce = 0;
                while (i < samples.length) {
                  reduce += samples[i] as number;
                  i++;
                }
                return reduce;
              }
            : (ctx: ILapContext<number>) => {
                let i = 0;
                let reduce = '';
                while (i < samples.length) {
                  reduce += samples[i] as string;
                  i++;
                }
                return reduce;
              },
    }
  );
  return stats;
}
