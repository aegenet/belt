export type ObjectMonitoringResult<T = unknown> = {
  property: PropertyKey;
  path: string;
  newValue: T;
  oldValue: T;
};
