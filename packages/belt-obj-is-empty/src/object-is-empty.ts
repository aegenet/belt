/**
 * Object is Empty ?
 */
export function objectIsEmpty(input: Record<PropertyKey, unknown>): boolean {
  if (input) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const prop in input) {
      return false;
    }
  }
  return true;
}
