import asciichart from 'asciichart';
import type { RaceResult } from '../../src/common/race-results';

const colors = [
  asciichart.blue,
  asciichart.green,
  asciichart.yellow,
  asciichart.red,
  asciichart.magenta,
  asciichart.lightgray,
  asciichart.default, // default color
];

const colorsMap = {
  [asciichart.blue]: 'blue',
  [asciichart.green]: 'green',
  [asciichart.yellow]: 'yellow',
  [asciichart.red]: 'red',
  [asciichart.magenta]: 'magenta',
  [asciichart.lightgray]: 'lightgray',
  [asciichart.default]: 'default',
};

export async function consoleOutput(...races: (() => Promise<RaceResult[]>)[]): Promise<void> {
  for (let i = 0; i < races.length; i++) {
    const race = await races[i]();
    console.log(`Race: ${race[0].raceName}...`);
    console.table(race.map((f, i) => f.humanize(`${colorsMap[colors[i]]}`)));
    const points = race.map(f => f.laps).map(f => f.map(x => x.us));
    console.log(
      asciichart.plot(points, {
        height: 20,
        colors: colors,
      })
    );
  }
}
