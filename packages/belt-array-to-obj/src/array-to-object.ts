/** Transform an array to an object */
export function arrayToObject<T = unknown>(
  entries: T[],
  key?: string | ((item: T, idx: number) => string | number)
): Record<string | number, T>;
export function arrayToObject<T = unknown>(
  entries: T[],
  key?: string | ((item: T, idx: number) => string | number),
  valueField?: keyof T
): Record<string | number, T[keyof T]>;
export function arrayToObject<T = unknown>(
  entries: T[],
  key?: string | ((item: T, idx: number) => string | number),
  valueField?: keyof T
): Record<string | number, T | T[keyof T]> {
  const remaped: Record<string | number, T | T[keyof T]> = {};
  if (entries?.length) {
    const getKey = key != null ? (key instanceof Function ? key : (elem: T) => (elem as any)[key]) : (elem: T) => elem;
    let entry: T;
    for (let i = 0; i < entries.length; i++) {
      entry = entries[i];
      remaped[getKey(entry, i)] = valueField !== undefined ? (entry as any)[valueField] : entry;
    }
  }

  return remaped;
}
