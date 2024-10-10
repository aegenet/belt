import { type ObjectMonitoringOptions } from '../common/object-monitoring-options';
const symIsProxy: unique symbol = Symbol('__isp');

/**
 * Deep set Proxy
 *
 * @remarks The initial data are not mutated, you must use the proxied data.
 */
export function deepSetProxy<T>(data: T, options: ObjectMonitoringOptions<T>): T {
  return _deepSetProxy('', data, options);
}

function _deepSetProxy<T>(parentPath: string, data: T, options: ObjectMonitoringOptions<T>): T {
  const proxied: any = {};

  if (data && typeof data === 'object') {
    for (const key in data) {
      proxied[key] = _deepSetProxy<any>(parentPath ? parentPath + '.' + key : key, data[key], options);
    }

    const proxy = new Proxy(proxied, {
      set: (target: any, p: string | symbol, newValue: any) => {
        const oldValue = target[p];

        const isObject = newValue != null && typeof newValue === 'object';
        if (isObject && !newValue[symIsProxy]) {
          target[p] = _deepSetProxy(parentPath ? `${parentPath}.${String(p)}` : String(p), newValue, options);
        } else {
          target[p] = newValue;
        }

        // Callback after actually set the var
        options.callback({
          newValue: isObject ? JSON.parse(JSON.stringify(newValue)) : newValue,
          oldValue: oldValue != null && typeof oldValue === 'object' ? JSON.parse(JSON.stringify(oldValue)) : oldValue,
          property: p,
          path: parentPath ? parentPath + '.' + String(p) : String(p),
        });

        return true;
      },
      get(target, key) {
        if (key === symIsProxy) {
          return true;
        }
        return target[key];
      },
    });

    return proxy;
  } else {
    return data;
  }
}
