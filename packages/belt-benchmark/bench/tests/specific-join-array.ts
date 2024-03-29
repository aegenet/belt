import * as assert from 'node:assert';
import { randomUUID } from 'crypto';
import { RaceResult, Racetrack, ILapContext } from '../../src/common';
import { NodeRacetrack } from '../../src/node';

export async function specificJoinArray(duration: number): Promise<RaceResult[]> {
  const rowPathUUID = [randomUUID(), randomUUID(), randomUUID(), randomUUID(), randomUUID(), randomUUID()];
  const racetrack: Racetrack = new NodeRacetrack({
    name: 'Specific Join string array',
    duration,
  });
  let res: string;
  // let res2: string;
  // let res3: string;
  // let res4: string;
  let depth: number;

  function assertResult(depth: number, lap: number, result: string) {
    switch (depth) {
      case 0:
        assert.strictEqual(result, `_${lap}`);
        break;
      case 1:
        assert.strictEqual(result, `${rowPathUUID[0]}_${lap}`);
        break;
      case 2:
        assert.strictEqual(result, `${rowPathUUID[0]}${rowPathUUID[1]}_${lap}`);
        break;
      case 3:
        assert.strictEqual(result, `${rowPathUUID[0]}${rowPathUUID[1]}${rowPathUUID[2]}_${lap}`);
        break;
      case 4:
        assert.strictEqual(result, `${rowPathUUID[0]}${rowPathUUID[1]}${rowPathUUID[2]}${rowPathUUID[3]}_${lap}`);
        break;
      case 5:
        assert.strictEqual(result, `${rowPathUUID[0]}${rowPathUUID[1]}${rowPathUUID[2]}${rowPathUUID[3]}${rowPathUUID[4]}_${lap}`);
        break;
      case 6:
        assert.strictEqual(result, `${rowPathUUID[0]}${rowPathUUID[1]}${rowPathUUID[2]}${rowPathUUID[3]}${rowPathUUID[4]}${rowPathUUID[5]}_${lap}`);
        break;
      default:
        throw new Error('Invalid size');
    }
  }
  // const strOutside = '';
  const predicatReduce = (prev: string, cur: string, i: number) => {
    if (i < depth) {
      return prev + cur;
    }
    return prev;
  };
  const stats = await racetrack.race(
    {
      name: 'Slice Join',
      spec: (ctx: ILapContext<number>) => {
        depth = ctx.lap % rowPathUUID.length;
        res = `${
          // Le slice est très punitif, si nous pouvons éviter de le faire, tant mieux
          (depth === rowPathUUID.length ? rowPathUUID : rowPathUUID.slice(0, depth)).join('')
        }_${ctx.lap}`;
        assertResult(depth, ctx.lap, res);
        return res;
      },
    },
    {
      name: 'for let str+=',
      spec: (ctx: ILapContext<number>) => {
        depth = ctx.lap % rowPathUUID.length;
        if (depth === rowPathUUID.length) {
          res = rowPathUUID + '_' + ctx.lap;
        } else {
          let str = '';
          let i = 0;
          for (i = 0; i < depth; i++) {
            str += rowPathUUID[i];
          }
          res = str + '_' + ctx.lap;
        }
        assertResult(depth, ctx.lap, res);
        return res;
      },
    },
    {
      name: 'reduce',
      spec: (ctx: ILapContext<number>) => {
        depth = ctx.lap % rowPathUUID.length;
        if (depth === rowPathUUID.length) {
          res = rowPathUUID + '_' + ctx.lap;
        }
        res = rowPathUUID.reduce(predicatReduce, '') + '_' + ctx.lap;
        assertResult(depth, ctx.lap, res);
        return res;
      },
    },
    {
      name: 'iterator keys()',
      spec: (ctx: ILapContext<number>) => {
        depth = ctx.lap % rowPathUUID.length;
        if (depth === rowPathUUID.length) {
          res = rowPathUUID + '_' + ctx.lap;
        } else {
          let str = '';
          for (const [i, val] of rowPathUUID.entries()) {
            if (i < depth) {
              str += val;
            } else break;
          }
          res = str + '_' + ctx.lap;
        }
        assertResult(depth, ctx.lap, res);
        return res;
      },
    }
  );
  assert.ok(stats);
  return stats;
}
