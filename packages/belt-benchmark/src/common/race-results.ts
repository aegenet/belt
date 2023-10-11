import { getAverage } from '../../../belt-array-stats/src/get-average';
import { p50, p75, p90 } from '../../../belt-array-stats/src/get-percentile';
import { ICarOptions } from './i-car-options';
import { RaceTime } from './race-time';

export class RaceResult {
  /** Laps details */
  public laps: RaceTime[] = [];
  /** Samples per lap */
  public samplesPerLap: number = 1;
  /** Fastest lap time */
  public fastestLap?: RaceTime;
  /** Slowest lap time */
  public slowestLap?: RaceTime;
  /** Mean / Average */
  public average?: RaceTime;
  /** Median (percentil 0.50) */
  public p50?: RaceTime;
  /** Percentil 0.75 */
  public p75?: RaceTime;
  /** Percentil 0.90 */
  public p90?: RaceTime;
  /** Final position */
  public position?: number;
  /** Total duration */
  public duration?: RaceTime;
  /** Result */
  public result?: unknown;
  /** Ratio */
  public ratio?: number;
  /** Aborted before the end */
  public aborted: boolean = false;

  constructor(
    public readonly car: ICarOptions,
    public raceName?: string
  ) {
    //
  }

  public compute() {
    const lapsNs = this.laps.map(f => f.ns);
    if (this.laps.length) {
      this.average = new RaceTime(getAverage(lapsNs));
      this.p50 = new RaceTime(p50(lapsNs));
      this.p75 = new RaceTime(p75(lapsNs));
      this.p90 = new RaceTime(p90(lapsNs));
      this.fastestLap = this.laps.reduce((m, e) => (e.ns < m.ns ? e : m)); // min
      this.slowestLap = this.laps.reduce((m, e) => (e.ns > m.ns ? e : m)); // max
      this.duration = new RaceTime(lapsNs.reduce((m, e) => e + m)); // sum
    }
  }

  public computeRatio(fastestResult?: RaceResult) {
    if (fastestResult) {
      this.ratio = fastestResult === this ? 1 : ((this.p50?.ns || 0) + (this.p75?.ns || 0) + (this.p90?.ns || 0)) / ((fastestResult.p50?.ns || 0) + (fastestResult.p75?.ns || 0) + (fastestResult.p90?.ns || 0));
    }
  }

  public humanize() {
    return {
      name: this.car.name,
      laps: this.laps.length,
      samplesPerLap: this.samplesPerLap,
      fastest: this.fastestLap?.toString(),
      slowest: this.slowestLap?.toString(),
      average: this.average?.toString(),
      'p50 <': this.p50?.toString(),
      p75: this.p75?.toString(),
      p90: this.p90?.toString(),
      slowdown: `${(this.ratio || 1).toFixed(2)}x`,
      duration: this.duration?.toString(),
    };
  }
}
