import { Racetrack, type ILapContext } from '../../../belt-benchmark/src/common';
import { NodeRacetrack } from '../../../belt-benchmark/src/node';
import { StringSplit } from '../../src/string-split';

export async function stringSplitBench(laps: number) {
  const sample1 = 'mapped ${$this._count} [id:value]';
  const sample2 = 'mapped "$this._count} [id value]"';
  const sample3 = 'mapped (id value)';
  const sample4 = 'mapped ${$this._count aaa} [id:value]';
  const sample5 = '<div>Something ELSE</div> <div>Other Than us Follow us You Are Formidable</div>';
  const sample6 = '(<div>Something ELSE</div>) <div>Other Than "us" Follow us You Are [Formidable]</div>';

  const stringSplit1 = new StringSplit({ separator: ' ' });
  const stringSplit2 = new StringSplit({
    separator: ' ',
    ignoreTags: {
      '"': '"',
    },
  });
  const stringSplit3 = new StringSplit({
    separator: ' ',
    ignoreTags: {
      '(': ')',
    },
  });
  const stringSplit4 = new StringSplit({
    separator: ' ',
    ignoreTags: {
      '${': '}',
    },
  });
  const stringSplit5 = new StringSplit({
    separator: ' ',
    ignoreTags: {
      '<div>': '</div>',
    },
  });
  const stringSplit6 = new StringSplit({
    separator: ' ',
    ignoreTags: {
      '(': ')',
      '[': ']',
      '"': '"',
      '<div>': '</div>',
    },
  });
  let str1;
  let str2;
  const racetrack: Racetrack = new NodeRacetrack({
    name: 'stringSplit bench',
    duration: 5000,
  });
  const stats = await racetrack.race(
    {
      name: 'split()',
      spec: (ctx: ILapContext<number>) => {
        str1 = sample1.split(' ');
        return str1;
      },
    },
    {
      name: 'StringSplit.split 1',
      spec: (ctx: ILapContext<number>) => {
        str2 = stringSplit1.split(sample1);
        return str2;
      },
    },
    {
      name: 'StringSplit.split 2',
      spec: (ctx: ILapContext<number>) => {
        str2 = stringSplit2.split(sample2);
        return str2;
      },
    },
    {
      name: 'StringSplit.split 3',
      spec: (ctx: ILapContext<number>) => {
        str2 = stringSplit3.split(sample3);
        return str2;
      },
    },
    {
      name: 'StringSplit.split 4',
      spec: (ctx: ILapContext<number>) => {
        str2 = stringSplit4.split(sample4);
        return str2;
      },
    },
    {
      name: 'String.split 5',
      spec: (ctx: ILapContext<number>) => {
        str2 = sample5.split(' ');
        return str2;
      },
    },
    {
      name: 'StringSplit.split 5',
      spec: (ctx: ILapContext<number>) => {
        str2 = stringSplit5.split(sample5);
        return str2;
      },
    },
    {
      name: 'Nested 6',
      spec: (ctx: ILapContext<number>) => {
        str2 = stringSplit6.split(sample6);
        return str2;
      },
    }
  );
  console.table(stats.map(f => f.humanize()));
}
