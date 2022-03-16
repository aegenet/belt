/**
 * Object is Empty ?
 */
export function objectIsEmpty(input: Record<PropertyKey, unknown>): boolean {
  if (input) {
    let isEmpty = true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const prop in input) {
      isEmpty = false;
      break;
    }
    return isEmpty;
  } else {
    return true;
  }
}
