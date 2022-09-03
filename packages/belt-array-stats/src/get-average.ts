/**
 * Get average
 * https://stackoverflow.com/questions/10359907/how-to-compute-the-sum-and-average-of-elements-in-an-array
 */
export function getAverage(entries: number[]) {
  if (entries?.length) {
    return entries.reduce((a, b) => (a || 0) + (b || 0), 0) / entries.length;
  } else {
    return 0;
  }
}

/**
 * Get mean (alias of average)
 */
export const getMean = getAverage;
