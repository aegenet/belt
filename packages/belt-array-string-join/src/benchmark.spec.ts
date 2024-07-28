/**
 * @vitest-environment node
 */
import { describe, it } from 'vitest';

import { stringConcat2Bench } from './bench/string-concat-2-bench';
import { stringConcatBench } from './bench/string-concat-bench';
import { stringJoin2Bench } from './bench/string-join-2-bench';
import { stringJoin3Bench } from './bench/string-join-3-bench';
import { stringJoinBench } from './bench/string-join-bench';

describe('benchmark', () => {
  it('all of benchmark', async () => {
    // const laps = 1000;
    await stringJoinBench();
    await stringJoin2Bench();
    await stringJoin3Bench();
    await stringConcatBench();
    await stringConcat2Bench();
  });
});
