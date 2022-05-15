import { isLeapYear } from './is-leap-year';

const leapDaysMonth = Object.freeze([31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);
const daysMonth = Object.freeze([31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);

/**
 * Get days in a month
 * @param month 0-11
 */
export function getDaysInMonth(date: Date): number {
  return getDaysArrayInMonth(date.getFullYear())[date.getMonth()];
}

/**
 * Get days in months
 */
export function getDaysArrayInMonth(year: number): readonly number[] {
  if (isLeapYear(year)) {
    return leapDaysMonth;
  }
  return daysMonth;
}
