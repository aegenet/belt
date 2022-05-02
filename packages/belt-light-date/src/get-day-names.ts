const daysUTC0 = [1, 2, 3, 4, 5, 6, 7].map(day => {
  return new Date(`2017-05-0${day}T00:00:00+00:00`);
});
const daysMap: Map<string, string[]> = new Map();

/**
 * Get day names (monday first)
 * @param format 'short' | 'long'
 * @returns Array<string>
 */
export function getDayNames(format: 'short' | 'long' = 'long', locales?: string | string[]): string[] {
  const cacheKey = `${new Intl.NumberFormat().resolvedOptions().locale}_${format}_${locales}`;

  if (daysMap.has(cacheKey)) {
    return daysMap.get(cacheKey);
  } else {
    const formatter = new Intl.DateTimeFormat(locales, { weekday: format });
    const days = daysUTC0.map(day => formatter.format(day));
    daysMap.set(cacheKey, days);
    return days;
  }
}
