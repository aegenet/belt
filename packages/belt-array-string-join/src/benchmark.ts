import { stringConcat2Bench } from './bench/string-concat-2-bench';
import { stringConcatBench } from './bench/string-concat-bench';
import { stringJoin2Bench } from './bench/string-join-2-bench';
import { stringJoin3Bench } from './bench/string-join-3-bench';
import { stringJoinBench } from './bench/string-join-bench';

const laps = 100000;
stringJoinBench(laps).then(async () => {
  await stringJoin2Bench(laps);
  await stringJoin3Bench(laps);
  await stringConcatBench(laps);
  await stringConcat2Bench(laps);
});
