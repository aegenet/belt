/**
 * Is Record ?
 */
export function isRecord(value: unknown): boolean {
  if (value == null) {
    return false;
  }
  const typeofVal = typeof value;
  return typeofVal === 'function' || (typeofVal === 'object' && !(value instanceof Date));
}
