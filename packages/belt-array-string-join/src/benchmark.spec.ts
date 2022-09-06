import { stringConcat2Bench } from './bench/string-concat-2-bench';
import { stringConcatBench } from './bench/string-concat-bench';
import { stringJoin2Bench } from './bench/string-join-2-bench';
import { stringJoin3Bench } from './bench/string-join-3-bench';
import { stringJoinBench } from './bench/string-join-bench';

describe('benchmark', () => {
  it('all of benchmark', async () => {
    const laps = 1000;
    await stringJoinBench(laps);
    await stringJoin2Bench(laps);
    await stringJoin3Bench(laps);
    await stringConcatBench(laps);
    await stringConcat2Bench(laps);
  });
});
