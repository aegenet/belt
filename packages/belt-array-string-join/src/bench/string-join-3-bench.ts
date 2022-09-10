import { Racetrack, ILapContext } from '../../../belt-benchmark/src/common';
import { NodeRacetrack } from '../../../belt-benchmark/src/node';
import { stringJoin } from '../string-join';

export async function stringJoin3Bench(laps: number) {
  const samples = ['ab--cde', 'kdkd-kd-ekdlked', 'kdkdk-dekdlked', 'EZOEZdkd-kjhDd', 'ââmmS-okjc-enkIEn', 'AJdskj-kdkdj-qzm zzoE', 'jLALM-Dmd-dd'];
  let str1;
  let str2;
  const racetrack: Racetrack = new NodeRacetrack({
    name: 'stringJoin with offset bench',
    duration: 5000,
  });
  const stats = await racetrack.race(
    {
      name: 'samples.slice(1, 5).join(" - ")',
      explain: `
  str = samples.slice(1, 5).join(' - ');
  `,
      spec: (ctx: ILapContext<number>) => {
        str1 = samples.slice(1, 5).join(' - ');
        return str1;
      },
    },
    {
      name: "stringJoin(samples, ' - ', 1, 5)",
      explain: `str2 = stringJoin(samples, " - ", 1, 5);
  `,
      spec: (ctx: ILapContext<number>) => {
        str2 = stringJoin(samples, ' - ', 1, 5);
        return str2;
      },
    }
  );
  console.table(stats.map(f => f.humanize()));
}
