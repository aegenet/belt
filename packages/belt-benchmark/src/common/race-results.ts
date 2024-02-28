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
  /** Custom fields min values */
  public cFieldsMin?: Record<string, number>;
  /** Custom fields max values */
  public cFieldsMax?: Record<string, number>;
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
    if (this.laps.length) {
      const lapsNs: number[] = [];
      const lapsCFields: Record<string, number[]> = {};
      const cFieldsStats: {
        avg: Record<string, number>;
        p50: Record<string, number>;
        p75: Record<string, number>;
        p90: Record<string, number>;
        min: Record<string, number>;
        max: Record<string, number>;
      } = {
        avg: {},
        p50: {},
        p75: {},
        p90: {},
        min: {},
        max: {},
      };

      // Get stats array
      this.laps.forEach(f => {
        lapsNs.push(f.ns);

        for (const field in f.cFields) {
          if (!lapsCFields[field]) {
            lapsCFields[field] = [];
          }
          lapsCFields[field].push(f.cFields[field]);
        }
      });

      // Compute cFields stats
      for (const field in lapsCFields) {
        cFieldsStats.avg[field] = getAverage(lapsCFields[field]);
        cFieldsStats.p50[field] = p50(lapsCFields[field]);
        cFieldsStats.p75[field] = p75(lapsCFields[field]);
        cFieldsStats.p90[field] = p90(lapsCFields[field]);
        cFieldsStats.min[field] = lapsCFields[field].reduce((m, e) => (e < m ? e : m)); // min
        cFieldsStats.max[field] = lapsCFields[field].reduce((m, e) => (e > m ? e : m)); // max
      }

      this.average = new RaceTime(getAverage(lapsNs), undefined, cFieldsStats.avg);
      this.p50 = new RaceTime(p50(lapsNs), undefined, cFieldsStats.p50);
      this.p75 = new RaceTime(p75(lapsNs), undefined, cFieldsStats.p75);
      this.p90 = new RaceTime(p90(lapsNs), undefined, cFieldsStats.p90);
      this.fastestLap = this.laps.reduce((m, e) => (e.ns < m.ns ? e : m)); // min
      this.slowestLap = this.laps.reduce((m, e) => (e.ns > m.ns ? e : m)); // max
      this.cFieldsMin = cFieldsStats.min;
      this.cFieldsMax = cFieldsStats.max;
      this.duration = new RaceTime(lapsNs.reduce((m, e) => e + m)); // sum
    }
  }

  public computeRatio(fastestResult?: RaceResult) {
    if (fastestResult) {
      this.ratio = fastestResult === this ? 1 : (this.p50?.ns || 0) / (fastestResult.p50?.ns || 0);
    }
  }

  public humanize(extra?: string) {
    const humanRecords: Record<string, number | string | undefined> = {
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

    for (const cField in this.cFieldsMin) {
      humanRecords[`min ${cField}`] = this.cFieldsMin[cField];
      humanRecords[`max ${cField}`] = this.cFieldsMax?.[cField];
    }

    if (extra) {
      humanRecords.extra = extra;
    }

    return humanRecords;
  }
}
