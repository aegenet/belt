import type { ICarOptions } from './i-car-options';
import type { ILapContext } from './i-lap-context';
import type { IRaceOptions } from './i-race-options';
import { RaceResult } from './race-results';
import { RaceTime } from './race-time';
import { LapContext } from './lap-context';

export class Racetrack {
  private readonly _performance: Performance;

  constructor(
    private _options: IRaceOptions,
    api: {
      performance: Performance;
    } = {
      performance: globalThis.performance,
    }
  ) {
    this._performance = api.performance;

    if (!this._performance) {
      throw new Error('Performance API must be available (https://caniuse.com/?search=performance).');
    }
  }

  public async race(...cars: ICarOptions[]) {
    const { laps } = this._options;

    const results: RaceResult[] = cars.map((f, i) => {
      f.name ||= `n°${i + 1}`;
      return new RaceResult(f, this._options.name);
    });

    for (let lap = 0; lap < laps; lap++) {
      for (let y = 0; y < cars.length; y++) {
        const car = cars[y];

        const lapCtx: ILapContext = new LapContext(this._performance, lap, null);
        await car.spec(lapCtx);
        // This will have no effect if it is already called by the dev in the spec function
        lapCtx.end();

        results[y].laps.push(new RaceTime(lapCtx.lapTime, lap));
      }
    }
    this._fillStats(results);
    return results;
  }

  private _fillStats(results: RaceResult[]) {
    // Compute stats
    for (let i = 0; i < results.length; i++) {
      results[i].compute();
    }

    // Positions
    results.sort((ao, bo) => {
      const p50a = ao.p50?.ns || 0;
      const p50b = bo.p50?.ns || 0;
      if (p50a > p50b) {
        return 1;
      } else if (p50a < p50b) {
        return -1;
      } else {
        const p75a = ao.p75?.ns || 0;
        const p75b = bo.p75?.ns || 0;
        if (p75a > p75b) {
          return 1;
        } else if (p75a < p75b) {
          return -1;
        } else {
          const p90a = ao.p90?.ns || 0;
          const p90b = bo.p90?.ns || 0;
          if (p90a > p90b) {
            return 1;
          } else if (p90a < p90b) {
            return -1;
          } else {
            const avgA = ao.average?.ns || 0;
            const avgB = bo.average?.ns || 0;
            if (avgA > avgB) {
              return 1;
            } else if (avgA < avgB) {
              return -1;
            } else {
              return 0;
            }
          }
        }
      }
    });

    // Compute ratio
    for (let i = 0; i < results.length; i++) {
      results[i].computeRatio(results[0]);
    }

    results.forEach((f, i) => {
      f.position = i + 1;
    });
  }
}
