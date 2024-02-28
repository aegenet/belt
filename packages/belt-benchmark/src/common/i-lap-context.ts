export interface ILapContext<T = any> {
  value: T | null;
  get lap(): number;
  lapTime: number;
  setLapTime(lapTime: number): void;
  readonly shared: Map<string, unknown>;
  /** Custom fields/stats) */
  readonly cFields: Record<string, number>;
}
