const monthsUTC0 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(month => {
  return new Date(`2017-${month.padStart(2, '0')}-01T00:00:00+00:00`);
});
const monthsMap: Map<string, string[]> = new Map();

/**
 * Get month names
 * @param format 'long' | 'numeric' | '2-digit' | 'short' | 'narrow'
 * @returns Array<string>
 */
export function getMonthNames(format: 'long' | 'numeric' | '2-digit' | 'short' | 'narrow' = 'long', locales?: string | string[]) {
  const cacheKey = `${new Intl.NumberFormat().resolvedOptions().locale}_${format}_${locales}`;
  if (monthsMap.has(cacheKey)) {
    return monthsMap.get(cacheKey);
  } else {
    const formatter = new Intl.DateTimeFormat(locales, { month: format });
    const months = monthsUTC0.map(date => formatter.format(date));
    monthsMap.set(cacheKey, months);
    return months;
  }
}
