import * as assert from 'node:assert';
import { RaceResult, Racetrack, ILapContext } from '../../src/common';
import { NodeRacetrack } from '../../src/node';

export async function composeString(duration: number): Promise<RaceResult[]> {
  const racetrack: Racetrack = new NodeRacetrack({
    name: 'Compose a string with `+` (plus) or with `${}` (interpolation)?',
    duration,
  });
  const stats = await racetrack.race(
    {
      name: 'Plus operator',
      explain: `'n°' + i + '\\n';
`,
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        let str = '';
        for (let i = 0; i < 100; i++) {
          str += 'n°' + i + '\n';
        }
        // ctx.end();
        return str;
      },
    },
    {
      name: 'Interpolation',
      explain: `\`n°\${i}\\n\`;
`,
      spec: (ctx: ILapContext<number>) => {
        // ctx.begin();
        let str = '';
        for (let i = 0; i < 100; i++) {
          str += `n°${i}\n`;
        }
        // ctx.end();
        return str;
      },
    }
  );
  assert.ok(stats);
  return stats;
}
