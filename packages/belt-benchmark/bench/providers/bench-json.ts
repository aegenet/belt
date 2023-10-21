import * as fs from 'node:fs';
import type { RaceResult } from '../../src/common/race-results';

export async function createJSON(fileName: string, ...races: (() => Promise<RaceResult[]>)[]): Promise<void> {
  await fs.promises.writeFile(fileName, `{ "name": "Benchmark Node.js v${process.versions.node}", "races": [`, {
    encoding: 'utf-8',
  });

  for (let i = 0; i < races.length; i++) {
    const race = await races[i]();
    console.log(`Race: ${race[0].raceName}...`);
    await fs.promises.appendFile(fileName, (i > 0 ? ',' : '') + JSON.stringify(race), {
      encoding: 'utf-8',
    });
  }

  await fs.promises.appendFile(fileName, `] }`, {
    encoding: 'utf-8',
  });
}
