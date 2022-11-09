/**
 * Get closest number
 * https://www.gavsblog.com/blog/find-closest-number-in-array-javascript
 */
export function getClosestNumber(value: number, collection: number[]): number | null {
  let aDiff: number;
  let bDiff: number;
  return getClosestValue<number>(value, collection, (value: number, a: number, b: number) => {
    aDiff = Math.abs(a - value);
    bDiff = Math.abs(b - value);

    if (aDiff === bDiff) {
      return a > b ? a : b;
    } else {
      return bDiff < aDiff ? b : a;
    }
  });
}

/**
 * Get closest value
 */
export function getClosestValue<T = number>(value: T, collection: T[], reducer: (value: T, a: T, b: T, collection: T[]) => T): T | null {
  return collection?.length
    ? collection.reduce((a, b) => {
        return reducer(value, a, b, collection);
      })
    : null;
}
