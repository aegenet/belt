/**
 * Object first key
 */
export function objectFirstKey<I = Record<PropertyKey, unknown>>(
  input: I,
  predicate?: (key: string, index: number, input: I) => boolean
): string | null {
  if (input) {
    if (predicate) {
      let i = 0;
      for (const prop in input) {
        if (predicate(prop, i, input)) {
          return prop;
        }
        i++;
      }
    } else {
      for (const prop in input) {
        return prop;
      }
    }
  }
  return null;
}
