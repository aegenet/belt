/**
 * Is leap year
 *
 * @see https://stackoverflow.com/questions/3220163/how-to-find-leap-year-programmatically-in-c/11595914#11595914
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
