export interface IRowsInflatorMapper {
  /**
   * Cache
   *
   * A Map has better performance **if** the key changes a lot (than an object).
   */
  cache: Map<string, any>;
  /** Current depth */
  depth: number;
  /** This parses the data, returns the value and the uuid used for the cache */
  map: <I>(row: I) => { value: any; uuid: string };
  /**
   * Resolved from `IRowsInflatorOptions.emptyWhenAbsent` (false on the root level): when true and `map`
   * returns nothing for a row, `setValue` is called with the internal "absent" marker so the parent still
   * gets the key.
   */
  emptyWhenAbsent: boolean;
  /** Set value (and call hydration if available) */
  setValue: (mainCollection: any[], rowPathValues: any[], value: any) => void;
}
