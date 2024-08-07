import type { ObjectMonitoringDispose } from './common/object-monitoring-dispose';
import type { ObjectMonitoringOptions } from './common/object-monitoring-options';
import { deepSetMutate } from './mutate/deep-set-mutate';
import { deepSetProxy } from './proxy/deep-set-proxy';

/**
 * Object Monitoring
 */
export class ObjectMonitoring {
  constructor(private readonly _options: ObjectMonitoringOptions) {
    //
  }

  /**
   * Monitor via Proxy (no mutation of initial object)
   *
   * You must use the proxy data
   */
  public asProxy<T>(data: T): T {
    return deepSetProxy(data, this._options);
  }

  /**
   * Monitor via Mutation (original data **are** mutated).
   *
   * You can use the initial data.
   *
   * @remarks Limitation: if a property is added to the original data, we cannot track it.
   */
  public mutate(data: Record<PropertyKey, unknown>): ObjectMonitoringDispose {
    return deepSetMutate(data, this._options);
  }
}
