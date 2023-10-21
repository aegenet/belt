import * as assert from 'node:assert';
import { randomUUID } from 'crypto';
import { RaceResult, Racetrack, ILapContext } from '../../src/common';
import { NodeRacetrack } from '../../src/node';

function rejoin(array: string[]) {
  let str2 = '';
  for (let i = 0; i < array.length; i++) {
    str2 += array[i];
  }
  return str2;
}
function rejoin2(array: string[]) {
  let str2 = '';
  let i = 0;
  while (i < array.length) {
    str2 += array[i++];
  }
  return str2;
}

export async function arrayJoin(duration: number): Promise<RaceResult[]> {
  const samples = [randomUUID(), randomUUID(), randomUUID(), randomUUID(), randomUUID(), randomUUID(), randomUUID(), randomUUID()];
  let str1;
  let str2;
  const racetrack: Racetrack = new NodeRacetrack({
    name: 'Join array',
    duration,
  });
  const stats = await racetrack.race(
    {
      name: 'samples.join()',
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        str1 = samples.join();
        return str1;
      },
    },
    {
      name: 'String.concat',
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        str2 = ''.concat(...samples);
        return str2;
      },
    },
    {
      name: 'for +=',
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        str2 = samples[0];
        for (let i = 1; i < samples.length; i++) {
          str2 += samples[i];
        }
        return str2;
      },
    },
    {
      name: 'rejoin()',
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        str2 = rejoin(samples);
        return str2;
      },
    },
    {
      name: 'rejoin2()',
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        str2 = rejoin2(samples);
        return str2;
      },
    }
  );
  assert.ok(stats);
  return stats;
}
