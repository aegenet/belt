/** Transform an object to an array */
export function objectToArray<I = Record<string, unknown>, O = unknown>(
  record: I,
  options?: {
    /** Whitelist fields, all fields if not provided */
    fields?: string[];
    /** Control property names */
    control?: RegExp;
  }
): O[] {
  const array: O[] = [];
  options = options || {};

  if (record) {
    const keys = options.fields?.length ? options.fields : Object.keys(record);
    const getValue = options.control ? (key: string) => (options.control.test(key) ? record[key] : null) : key => record[key];

    for (let i = 0; i < keys.length; i++) {
      const value = getValue(keys[i]);
      if (value != null && typeof value !== 'function') {
        array.push(value);
      }
    }
  }

  return array;
}
