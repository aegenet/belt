import * as fs from 'node:fs/promises';
import type { RaceResult } from '../../src/common/race-results';
import { reSamplesData } from './bench-common';

export async function createJSON(fileName: string, ...races: (() => Promise<RaceResult[]>)[]): Promise<void> {
  await fs.writeFile(fileName, `{ "name": "Node v${process.versions.node}, v8 ${process.versions.v8}", "races": [`, {
    encoding: 'utf-8',
  });

  const samplesCount = 256;
  let raceResults: RaceResult[];
  for (let i = 0; i < races.length; i++) {
    raceResults = await races[i]();
    console.log(`Race: ${raceResults[0].raceName}...`);
    await fs.appendFile(
      fileName,
      (i > 0 ? ',' : '') +
        JSON.stringify({
          name: raceResults[0].raceName,
          cars: raceResults.map(result => {
            const remap = {
              name: result.car.name,
              code: result.car.explain,
              laps: result.laps.length,
              samplesPerLap: result.samplesPerLap,
              stats: {
                pos: result.position,
                ratio: result.ratio,
                avg: result.average,
                p50: result.p50,
                p75: result.p75,
                p90: result.p90,
                fastest: result.fastestLap,
                slowest: result.slowestLap,
                duration: result.duration,
              },
              data: reSamplesData(
                result.laps.map(f => f.us),
                samplesCount
              ),
              cData: {},
            };

            for (const cField in result.cFieldsMin) {
              remap.stats[`min ${cField}`] = result.cFieldsMin[cField];
              remap.stats[`max ${cField}`] = result.cFieldsMax?.[cField];
              remap.cData[cField] = reSamplesData(
                result.laps.map(f => f.cFields?.[cField] || 0),
                samplesCount
              );
            }

            return remap;
          }),
        }),
      {
        encoding: 'utf-8',
      }
    );
  }

  await fs.appendFile(fileName, `] }`, {
    encoding: 'utf-8',
  });
}
