import type { ILapContext } from './i-lap-context';

export class LapContext<T> implements ILapContext<T> {
  private _lapTime: number = 0;

  public get lapTime() {
    return this._lapTime;
  }

  constructor(public readonly lap: number, public readonly value: T | null, public readonly shared: Map<string, unknown> = new Map()) {
    //
  }

  public setLapTime(lapTime: number): void {
    this._lapTime = lapTime;
  }
}
