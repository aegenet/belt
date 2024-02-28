export class RaceTime {
  /** microseconds  */
  public us: number;
  /** milliseconds  */
  public ms: number;
  /** seconds  */
  public s: number;
  /** minutes */
  public m: number;

  constructor(
    /** nanoseconds */
    public ns: number,
    /** Lap of this time */
    public lap?: number,
    /** Custom fields/stats) */
    public cFields: Record<string, number> = {}
  ) {
    this.us = ns / 1000;
    this.ms = this.us / 1000;
    this.s = this.ms / 1000;
    this.m = this.s / 60;
  }

  public toString(): string {
    if (this.m >= 1) {
      return `${this.m.toFixed(2)} min.`;
    } else if (this.s >= 1) {
      return `${this.s.toFixed(2)} sec.`; // (${this.ms.toFixed(3)} ms)`;
    } else if (this.ms >= 1) {
      return `${this.ms.toFixed(2)} ms`; //  (${this.us.toFixed(3)} us)`;
    } else if (this.us >= 1) {
      return `${this.us.toFixed(2)} μs`; //  (${this.ns.toFixed(3)} ns)`;
    } else {
      return `${this.ns.toFixed(2)} ns`;
    }
  }
}
