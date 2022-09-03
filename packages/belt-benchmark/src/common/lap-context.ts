import type { ILapContext } from './i-lap-context';

export class LapContext<T> implements ILapContext<T> {
  private _lapTime: number = 0;
  public end: () => void;

  public get lapTime() {
    return this._lapTime;
  }

  constructor(private readonly _performance: Performance, public readonly lap: number, public readonly value: T | null) {
    this.begin();
    this.end = () => {
      this._performance.mark('end');
      this.end = () => {
        /* do nothing after one call */
      };
      const measureName = `${this.lap}`;
      this._performance.measure(`${this.lap}`, 'begin', 'end');
      const measures = this._performance.getEntriesByName(measureName);
      this._lapTime = (measures?.length ? measures[0].duration : 0) * 1e6;
      performance.clearMeasures(`${this.lap}`);
    };
  }

  public begin(): void {
    this._performance.clearMarks();
    this._performance.mark('begin');
  }
}
