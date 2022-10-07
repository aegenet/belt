import type { ObjectMonitoringDispose } from '../common/object-monitoring-dispose';
import type { ObjectMonitoringResult } from '../common/object-monitoring-result';
const symMonitoring: unique symbol = Symbol('__om');

/**
 * Deep Set Mutate
 *
 * @remarks The initial data **are** mutated
 */
export function deepSetMutate(data: Record<PropertyKey, unknown>, callback: (options: ObjectMonitoringResult) => void): ObjectMonitoringDispose {
  return _deepSetMutate('', data, callback);
}

function _deepSetMutate(parentPath: string, data: Record<PropertyKey, unknown>, callback: (options: ObjectMonitoringResult) => void): ObjectMonitoringDispose {
  const deepDisposes: ObjectMonitoringDispose[] = [];

  if (data && typeof data === 'object' && !data[symMonitoring]) {
    for (const key in data) {
      // We need the following variables in the callback (set) below, so we can't put them outside the loop...
      const path = parentPath ? parentPath + '.' + key : key;
      const symKey = Symbol('_k_' + key);
      const symKeyDispose = Symbol('_d_' + key);
      data[symKey] = data[key];

      // Dispose
      data[symKeyDispose] = function () {
        // Remove the set/get
        delete data[key];
        data[key] = data[symKey];
        delete data[symKey];
        delete data[symMonitoring];
      };

      Object.defineProperty(data, key, {
        enumerable: true,
        set(newValue) {
          const oldValue = this[symKey];

          const isObject = newValue != null && typeof newValue === 'object';
          if (isObject && !newValue[symMonitoring]) {
            deepDisposes.push(_deepSetMutate(path, newValue, callback));
          }
          this[symKey] = newValue;

          callback({
            property: key,
            newValue: isObject ? JSON.parse(JSON.stringify(newValue)) : newValue,
            oldValue: oldValue != null && typeof oldValue === 'object' ? JSON.parse(JSON.stringify(oldValue)) : oldValue,
            path,
          });
        },
        get() {
          return data[symKey];
        },
      });

      // Deeper
      deepDisposes.push(_deepSetMutate(path, data[symKey] as Record<PropertyKey, unknown>, callback));
    }
    data[symMonitoring] = 1;
  }

  return {
    dispose() {
      deepDisposes.forEach(f => f.dispose());
      Object.getOwnPropertySymbols(data).forEach(sym => {
        if (sym.description?.startsWith('_d_')) {
          (data as any)[sym]();
        }
      });
    },
  };
}
