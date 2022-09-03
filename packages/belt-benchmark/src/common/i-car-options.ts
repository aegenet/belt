import type { ILapContext } from './i-lap-context';

export interface ICarOptions {
  /** Name */
  name?: string;
  /** Explain your test */
  explain?: string;
  /** Function to try */
  spec: (ctx: ILapContext) => Promise<unknown> | unknown;
}
