import * as assert from 'assert';
import { RaceResult, Racetrack, ILapContext } from '../../src/common';
import { NodeRacetrack } from '../../src/node';

export async function joinStringArray(laps: number): Promise<RaceResult[]> {
  const racetrack: Racetrack = new NodeRacetrack({
    name: 'Join a string with an array or with +=?',
    laps,
  });
  const stats = await racetrack.race(
    {
      name: '+=',
      explain: `
let something = 'Hello\n';
// ...
something += ' Mister';
`,
      spec: (ctx: ILapContext<number>) => {
        ctx.begin();
        let str = '';
        for (let i = 0; i < 10000; i++) {
          str += i.toString();
        }
        ctx.end();
        return str;
      },
    },
    {
      name: 'array push join',
      explain: `
const strArray: string[] = [];
strArray.push('Hello');
strArray.push(' Mister');
const str = strArray.join();
`,
      spec: (ctx: ILapContext<number>) => {
        ctx.begin();
        const strArray: string[] = [];
        for (let i = 0; i < 10000; i++) {
          strArray.push(i.toString());
        }
        const str = strArray.join();
        ctx.end();
        return str;
      },
    }
  );
  assert.ok(stats);
  return stats;
}
