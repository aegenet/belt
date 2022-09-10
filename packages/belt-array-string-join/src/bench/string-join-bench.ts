import { Racetrack, ILapContext } from '../../../belt-benchmark/src/common';
import { NodeRacetrack } from '../../../belt-benchmark/src/node';
import { stringJoin } from '../string-join';

export async function stringJoinBench(laps: number) {
  const samples = ['ab--cde', 'kdkd-kd-ekdlked', 'kdkdk-dekdlked', 'EZOEZdkd-kjhDd', 'ââmmS-okjc-enkIEn', 'AJdskj-kdkdj-qzm zzoE', 'jLALM-Dmd-dd'];
  let str1;
  let str2;
  const racetrack: Racetrack = new NodeRacetrack({
    name: 'stringJoin bench',
    duration: 5000,
  });
  const stats = await racetrack.race(
    {
      name: 'samples.join()',
      explain: `
  str = samples.join();
  `,
      spec: (ctx: ILapContext<number>) => {
        str1 = samples.join();
        return str1;
      },
    },
    {
      name: 'stringJoin()',
      explain: `str2 = stringJoin(samples);
  `,
      spec: (ctx: ILapContext<number>) => {
        str2 = stringJoin(samples);
        return str2;
      },
    }
  );
  console.table(stats.map(f => f.humanize()));
}
