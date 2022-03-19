/**
 * Object first key
 */
export function objectFirstKey(input: Record<PropertyKey, unknown>): string | null {
  if (input) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const prop in input) {
      return prop;
    }
  }
  return null;
}
