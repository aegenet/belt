import type { ICarOptions } from './i-car-options';
import type { ILapContext } from './i-lap-context';
import type { IRaceOptions } from './i-race-options';
import { RaceResult } from './race-results';
import { RaceTime } from './race-time';
import { LapContext } from './lap-context';
import { isNodeJS } from '../../../belt-platform-detector/src/platform-detector';
import { ERacetrackPhase } from './e-racetrack-phase';

const AsyncFunction = Object.getPrototypeOf(async function () {
  /** */
}).constructor;

export class Racetrack {
  private readonly _performance: Performance;
  private readonly _accuracyPredicat: (f: RaceResult) => boolean;
  private static readonly _DEFAULT_ACCURACY_PREDICAT = isNodeJS()
    ? (f: RaceResult) => !!(f.duration?.us && f.duration.us < 400)
    : (f: RaceResult) => !!(f.duration?.ms && f.duration.ms < 4.0);

  private readonly onProgress: (data: {
    message: string;
    lap?: number;
    lapsCount?: number;
    phase?: ERacetrackPhase;
  }) => void;

  constructor(
    private _options: IRaceOptions,
    api: {
      performance: Performance;
    } = {
      performance: globalThis.performance,
    }
  ) {
    const { accuracy, onProgress } = this._options;
    this._performance = api.performance;
    this.onProgress =
      onProgress ||
      (() => {
        /* */
      });

    if (!this._performance) {
      throw new Error('Performance API must be available (https://caniuse.com/?search=performance).');
    }

    if (accuracy) {
      switch (accuracy.unit) {
        case 'ns':
          this._accuracyPredicat = (f: RaceResult) => (f.duration ? f.duration.ns < accuracy.value : true);
          break;
        case 'us':
          this._accuracyPredicat = (f: RaceResult) => (f.duration ? f.duration.us < accuracy.value : true);
          break;
        case 'ms':
          this._accuracyPredicat = (f: RaceResult) => (f.duration ? f.duration.ms < accuracy.value : true);
          break;
        default:
          throw new Error('Invalid accuracy provided.');
      }
    } else {
      this._accuracyPredicat = Racetrack._DEFAULT_ACCURACY_PREDICAT;
    }
  }

  public async race(...cars: ICarOptions[]): Promise<RaceResult[]> {
    this._options.duration ||= 5000;
    const { duration } = this._options;

    this.onProgress({
      message: 'Estimating laps count...',
      phase: ERacetrackPhase.ESTIMATE,
    });
    const estimation = await this._getRaceEstimations(cars);
    const lapsCount = Math.floor(duration / (estimation.lapDuration / 1e6));

    if (lapsCount < Infinity) {
      this.onProgress({
        message: `Estimation: ${lapsCount} laps (${estimation.samplesPerLap} samples per lap).`,
        lap: 0,
        lapsCount,
        phase: ERacetrackPhase.ESTIMATE,
      });

      const results = await this._race({ lapsCount, samplesPerLap: estimation.samplesPerLap, duration }, cars);
      this.onProgress({
        message: `Race completed.`,
        lap: lapsCount,
        lapsCount,
        phase: ERacetrackPhase.COMPLETED,
      });
      return results;
    } else {
      throw new Error('Laps count cannot be Infinity.');
    }
  }

  private async _race(
    opts: {
      lapsCount: number;
      samplesPerLap: number;
      /** max duration (ms) */
      duration: number;
      /** Throw on abort */
      throwOnAbort?: boolean;
      simulation?: boolean;
    },
    cars: ICarOptions[]
  ): Promise<RaceResult[]> {
    const { lapsCount, samplesPerLap, duration, throwOnAbort } = opts;
    const abortCtrl = new AbortController();
    const token = setTimeout(() => {
      abortCtrl.abort();
    }, duration);

    cars.forEach(car => {
      if (!car.explain) {
        car.explain = car.spec.toString().trim();
      }

      let funcBody = `const begin = perf.now();\n`;
      //       if (car.async) {
      //         funcBody += `
      // for (let sample = 0; sample < samplesPerLap - 1; sample++) {
      //   await spec(lapCtx);
      // }
      // lapCtx.value = await spec(lapCtx);
      // return perf.now() - begin;
      // `;
      //       } else {
      for (let sample = 0; sample < samplesPerLap - 1; sample++) {
        funcBody += `${car.async ? 'await ' : ''}spec(lapCtx);\n`;
      }
      funcBody += `lapCtx.value = ${car.async ? 'await ' : ''}spec(lapCtx);\n`;
      funcBody += 'return perf.now() - begin;\n';
      // }
      if (car.async) {
        car.bench = new AsyncFunction('perf', 'samplesPerLap', 'spec', 'lapCtx', funcBody);
      } else {
        car.bench = new Function('perf', 'samplesPerLap', 'spec', 'lapCtx', funcBody) as any;
      }
    });

    let isAborted = false;

    const results: RaceResult[] = cars.map((f, i) => {
      f.name ||= `n°${i + 1}`;
      const rr: RaceResult = new RaceResult(f, this._options.name);
      rr.samplesPerLap = samplesPerLap;
      return rr;
    });

    for (let lap = 0; lap < lapsCount && !isAborted; lap++) {
      this.onProgress({
        message: `Lap: ${lap + 1}/${lapsCount}...`,
        lap,
        lapsCount,
        phase: ERacetrackPhase.RACING,
      });
      for (let y = 0; y < cars.length; y++) {
        if (abortCtrl.signal?.aborted) {
          isAborted = true;
          results[y].aborted = true;
        } else {
          results[y].laps.push(
            await this._benchCarLap(cars[y], {
              currentLap: lap,
              samplesPerLap,
            })
          );
        }
      }
    }
    clearTimeout(token);
    if (abortCtrl.signal?.aborted && throwOnAbort) {
      throw new Error('Race has been aborted.');
    }

    this._fillStats(results);

    return results;
  }

  private async _benchCarLap(
    car: ICarOptions,
    opts: {
      currentLap: number;
      samplesPerLap: number;
    }
  ): Promise<RaceTime> {
    const { currentLap, samplesPerLap } = opts;
    const lapCtx: ILapContext = new LapContext(currentLap, null);
    if (this._options.beforeLap) {
      await this._options.beforeLap(lapCtx);
    }

    const duration: number = car.bench ? await car.bench(this._performance, samplesPerLap, car.spec, lapCtx) : 0;

    lapCtx.setLapTime((duration / samplesPerLap) * 1e6);

    if (this._options.afterLap) {
      await this._options.afterLap(lapCtx);
    }

    return new RaceTime(lapCtx.lapTime, currentLap, lapCtx.cFields);
  }

  /**
   * The goal of this function is to retrieve the samplesPerLap
   *
   * Node.js is pretty acurate (100ns?)
   * Firefox 2ms to 100ms (!)
   *
   * API Performance 5 µs (...)
   */
  private async _getRaceEstimations(cars: ICarOptions[]): Promise<{
    samplesPerLap: number;
    /** lap duration with all cars (ns) */
    lapDuration: number;
  }> {
    const { duration } = this._options;
    let results: RaceResult[] = [];
    let samplesPerLap = 1;

    for (; samplesPerLap < 65536; samplesPerLap *= 2) {
      results = await this._race({ lapsCount: samplesPerLap, samplesPerLap: 1, duration, throwOnAbort: true }, cars);

      if (!results.find(this._accuracyPredicat)) {
        break;
      }
    }

    return {
      samplesPerLap,
      lapDuration: results.reduce((prev, cur) => prev + (cur.duration?.ns || 0), 0),
    };
  }

  private _fillStats(results: RaceResult[]) {
    // Compute stats
    for (let i = 0; i < results.length; i++) {
      results[i].compute();
    }

    // Positions
    results.sort((ao, bo) => {
      return (
        this._sortPredicat(ao.p50, bo.p50) ||
        this._sortPredicat(ao.p75, bo.p75) ||
        this._sortPredicat(ao.p90, bo.p90) ||
        this._sortPredicat(ao.average, bo.average) ||
        0
      );
    });

    // Compute ratio
    for (let i = 0; i < results.length; i++) {
      results[i].computeRatio(results[0]);
    }

    results.forEach((f, i) => {
      f.position = i + 1;
    });
  }

  private _sortPredicat(a?: RaceTime, b?: RaceTime): number {
    return (a?.ns || 0) - (b?.ns || 0);
  }
}
