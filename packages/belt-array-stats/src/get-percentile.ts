/**
 * Get percentile
 *
 * @see https://en.wikipedia.org/wiki/Percentile#The_Nearest_Rank_method
 *
 * @param pc Percentile specified
 * @param v number[]
 * @returns number
 */
export function getPercentile(pc: 10 | 25 | 50 | 75 | 90, v: number[]): number {
  if (!v || v.length === 0) {
    return 0;
  }
  v = v
    .map(f => f || 0)
    .sort((a, b) => {
      a ||= 0;
      b ||= 0;
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      return 0;
    });

  return v[Math.floor(v.length * (pc / 100))];
}

/**
 * Get percentile 0.10
 *
 * @param values number[] | bigint[]
 * @returns number | bigint
 */
export function p10(values: number[]): number {
  return getPercentile(10, values);
}

/**
 * Get percentile 0.25
 *
 * @param values number[] | bigint[]
 * @returns number | bigint
 */
export function p25(values: number[]): number {
  return getPercentile(25, values);
}

/**
 * Get percentile 0.50 (median)
 *
 * @param values number[] | bigint[]
 * @returns number | bigint
 */
export function p50(values: number[]): number {
  return getPercentile(50, values);
}

/**
 * Get percentile 0.25
 *
 * @param values number[] | bigint[]
 * @returns number | bigint
 */
export function p75(values: number[]): number {
  return getPercentile(75, values);
}

/**
 * Get percentile 0.90
 *
 * @param values number[] | bigint[]
 * @returns number | bigint
 */
export function p90(values: number[]): number {
  return getPercentile(90, values);
}
