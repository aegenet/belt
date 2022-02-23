/**
 * Get median
 * https://stackoverflow.com/questions/45309447/calculating-median-javascript
 */
export function getMedian(data: number[], options?: { sorted: boolean }) {
  if (data?.length) {
    options = options || { sorted: false };
    const v = [...data];
    if (!options.sorted) {
      v.sort((a, b) => a - b);
    }
    const mid = Math.floor(v.length / 2);
    return v.length % 2 !== 0 ? v[mid] : (v[mid - 1] + v[mid]) / 2;
  } else {
    return 0;
  }
}
