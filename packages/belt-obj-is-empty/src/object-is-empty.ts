/**
 * Object is Empty ?
 */
export function objectIsEmpty(input: Record<PropertyKey, unknown>): boolean {
  if (input) {
    for (const prop in input) {
      return false;
    }
  }
  return true;
}
