import type { ERacetrackPhase } from './e-racetrack-phase';
import type { ILapContext } from './i-lap-context';

export interface IRaceOptions {
  /** Race name */
  name?: string;
  /** Max approximate duration (ms) */
  duration: number;
  /**
   * You can specify an accuracy (for example for Firefox).
   *
   * This options will help us to determine the samples per lap.
   *
   * @default `100us` for NodeJS; `2ms` for Browser
   * @see https://developer.mozilla.org/fr/docs/Web/API/DOMHighResTimeStamp
   *
   * @example
   * ```typescript
   * // 5us for browser
   * accuracy: { us: 5 }
   * ```
   *
   * ```typescript
   * // 100ms for firefox if resistFingerprinting
   * accuracy: { ms: 100 }
   * ```
   *
   * ```typescript
   * // 100ns for NodeJS 16
   * accuracy: { ms: 100 }
   * ```
   */
  accuracy?: {
    unit: 'ns' | 'us' | 'ms';
    value: number;
  };
  /** Common function, before lap (same context) */
  beforeLap?: (ctx: ILapContext) => Promise<unknown> | unknown;
  /** Common function, after lap */
  afterLap?: (ctx: ILapContext) => Promise<unknown> | unknown;
  /** Emit information about progression */
  onProgress?: (data: { message: string; lap?: number; lapsCount?: number; phase?: ERacetrackPhase }) => void;
}
