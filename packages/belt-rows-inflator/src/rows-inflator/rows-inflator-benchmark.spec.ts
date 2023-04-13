import * as assert from 'node:assert';
import { bench100x10000PKs } from '../../bench/bench-100x10000-pks';
import { bench100x10000WoPKs } from '../../bench/bench-100x10000-wo-pks';
import { raws, rowsMergerSchemaWithPK } from '../../bench/bench-schema';
// import { RowsMergerLab } from './rows-merger-v1';
import { rowsInflator } from './../index';

describe('rows-inflator-benchmark', function () {
  it('100x10000 lines without PKs', async () => {
    await bench100x10000WoPKs();
  });

  it('100x10000 lines with PKs', async () => {
    await bench100x10000PKs();
  });

  it('100x10000 lines with PKs, assert', () => {
    for (let i = 0; i < 100; i++) {
      const results = rowsInflator(raws, rowsMergerSchemaWithPK);
      assert.strictEqual(results.length, 10000);
    }
  });
});
