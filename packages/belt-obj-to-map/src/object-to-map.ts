/** Transform an object to a Map */
export function objectToMap<I = Record<string, unknown> | object>(record: I): Map<PropertyKey, unknown> {
  const map: Map<PropertyKey, unknown> = new Map();

  if (record) {
    for (const key in record) {
      map.set(key, record[key]);
    }
  }

  return map;
}
