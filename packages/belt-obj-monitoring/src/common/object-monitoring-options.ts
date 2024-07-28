import type { ObjectMonitoringResult } from './object-monitoring-result';

export type ObjectMonitoringOptions<T = unknown> = {
  /** Allowed property pattern */
  allowed?: RegExp;
  /** Callback on set */
  callback: (result: ObjectMonitoringResult<T>) => void;
};
