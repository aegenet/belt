import { rowsInflator } from '../src/index';
import { Racetrack } from '../../belt-benchmark/src/browser';
import { raws, rowsMergerSchema } from './bench-schema';

/** 100x10000 lines without PKs */
export async function bench100x10000WoPKs() {
  let resCount = 0;
  // let resCount2 = 0;
  const racetrack = new Racetrack({
    duration: 5000,
    name: 'RowsInflator WO PKs',
  });
  const results = await racetrack.race(
    {
      spec: ctx => {
        resCount += rowsInflator(raws, rowsMergerSchema).length;
        return resCount;
      },
      name: 'Actual',
    }
    // {
    //   spec: ctx => {
    //     resCount2 += RowsMergerLab.merge(raws, rowsMergerSchema).length;
    //     return resCount2;
    //   },
    //   name: 'v1',
    // }
  );
  console.table(results.map(f => f.humanize()));
  // assert.strictEqual(resCount, resCount2);
}
