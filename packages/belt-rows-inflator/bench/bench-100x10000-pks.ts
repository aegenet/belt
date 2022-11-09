import { rowsInflator } from '../src/index';
import { raws, rowsMergerSchemaWithPK } from './bench-schema';
import { Racetrack } from '../../belt-benchmark/src/browser';

/** 100x10000 lines with PKs */
export async function bench100x10000PKs() {
  let resCount = 0;
  // let resCount2 = 0;
  const racetrack = new Racetrack({
    duration: 5000,
    name: 'RowsInflator PKS',
  });
  const results = await racetrack.race(
    {
      spec: ctx => {
        resCount += rowsInflator(raws, rowsMergerSchemaWithPK).length;
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
