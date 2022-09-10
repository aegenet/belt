import type { ILapContext } from './i-lap-context';

export interface ICarOptions {
  /** Name */
  name?: string;
  /** Explain your test */
  explain?: string;
  /** Function to try */
  spec: (ctx: ILapContext) => Promise<unknown> | unknown;
  /** Async spec */
  isAsync?: boolean;
  /**
   * @internal
   *
   * Generated dynamicaly
   */
  bench?: (perf: Performance, samplesPerLap: number, spec: (ctx: ILapContext) => Promise<unknown> | unknown, lapCtx: ILapContext) => number | Promise<number>;
}
