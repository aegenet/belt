import { RaceResult, Racetrack, ILapContext } from '../../src/common';
import { NodeRacetrack } from '../../src/node';

export async function costOfTryCatch(duration: number): Promise<RaceResult[]> {
  const samples = [8, 3, 4, 1, 0, 5, 2, 6, 9, 7];
  const raceTrack: Racetrack = new NodeRacetrack({
    name: 'Cost of try catch',
    duration,
  });

  const stats = await raceTrack.race(
    {
      name: 'Without try/catch',
      spec: (ctx: ILapContext<number>) => {
        let count = ctx.value || 0;
        for (let i = 0; i < samples.length; i++) {
          count += samples[i];
        }
        return count;
      },
    },
    {
      name: 'With try/catch',
      spec: (ctx: ILapContext<number>) => {
        let count = ctx.value || 0;
        for (let i = 0; i < samples.length; i++) {
          try {
            count += samples[i];
          } catch {
            count--;
          }
        }
        return count;
      },
    },
    {
      name: 'With try/catch/finally',
      spec: (ctx: ILapContext<number>) => {
        let count = ctx.value || 0;
        for (let i = 0; i < samples.length; i++) {
          try {
            count += samples[i];
          } catch {
            count--;
          } finally {
            count++;
          }
        }
        return count;
      },
    },
    {
      name: 'With try/catch and throw error',
      spec: (ctx: ILapContext<number>) => {
        let count = ctx.value || 0;
        for (let i = 0; i < samples.length; i++) {
          try {
            count += samples[i];
            if (count % 2) {
              throw new Error('Arf');
            }
          } catch (error) {
            count--;
          }
        }
        return count;
      },
    },
    {
      name: 'With try/catch/finally and throw error',
      spec: (ctx: ILapContext<number>) => {
        let count = ctx.value || 0;
        for (let i = 0; i < samples.length; i++) {
          try {
            count += samples[i];
            if (count % 2) {
              throw new Error('Arf');
            }
          } catch (error) {
            count--;
          } finally {
            count++;
          }
        }
        return count;
      },
    }
  );
  return stats;
}
