import { stringSplitBench } from '../bench/bench/string-split-bench';

describe('benchmark', () => {
  it('all of benchmark', async () => {
    const laps = 1000;
    await stringSplitBench(laps);
  });
});
