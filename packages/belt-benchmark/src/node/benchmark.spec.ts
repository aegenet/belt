import { benchmark } from './../../bench/benchmark';
import * as fs from 'fs/promises';

describe.skip('benchmark', () => {
  it('100 laps', async () => {
    if (
      !(await fs
        .access('./temp')
        .then(() => true)
        .catch(() => false))
    ) {
      await fs.mkdir('./temp');
    }
    await benchmark('./temp/bench.md', 10);
  }, 60000);
});
