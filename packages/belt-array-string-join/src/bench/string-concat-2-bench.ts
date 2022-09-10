import { Racetrack, ILapContext } from '../../../belt-benchmark/src/common';
import { NodeRacetrack } from '../../../belt-benchmark/src/node';
import { stringConcat } from '../string-concat';

export async function stringConcat2Bench(laps: number) {
  const samples = ['ab--cde', 'kdkd-kd-ekdlked', 'kdkdk-dekdlked', 'EZOEZdkd-kjhDd', 'ââmmS-okjc-enkIEn', 'AJdskj-kdkdj-qzm zzoE', 'jLALM-Dmd-dd'];
  let str1;
  let str2;
  const racetrack: Racetrack = new NodeRacetrack({
    name: 'stringConcat with offset bench',
    duration: 5000,
  });
  const stats = await racetrack.race(
    {
      name: 'String.concat(...samples.slice(1, 5))',
      explain: `
  str = ''.concat(...samples.slice(1, 5));
  `,
      spec: (ctx: ILapContext<number>) => {
        str1 = ''.concat(...samples.slice(1, 5));
        return str1;
      },
    },
    {
      name: 'stringConcat(samples, 1, 5)',
      explain: `str2 = stringConcat(samples, 1, 5);
  `,
      spec: (ctx: ILapContext<number>) => {
        str2 = stringConcat(samples, 1, 5);
        return str2;
      },
    }
  );
  console.table(stats.map(f => f.humanize()));
}
