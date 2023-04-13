import type { EDurationFormatMask } from './e-duration-format-mask';

export interface IDurationOptions {
  /** Duration Mask */
  mask?: EDurationFormatMask;
  /** Round precision, default 0.5 */
  precision?: number;
  /** Working hours per day */
  hoursPerDay?: number;
  /** Working days per week */
  daysPerWeek?: number;
  /** Cache some informations */
  memoize?: boolean;
}
