import { getCurrentTimezone } from './get-current-timezone';
import { lightDate, LightDateOptions } from './light-date';

/**
 * Convert a date (iso string, number, Date...) to Input Date format (YYYY-MM-dd)
 * @param dateFrom (iso string, Date...)
 * @returns string
 */
export function dateToInputDate(dateFrom?: LightDateOptions): string {
  const dte = lightDate.dateOrNow(dateFrom);
  return _dateToString(dte);
}

/**
 * Convert an input date (YYYY-MM-dd) to Date
 *
 * @param inputDate string YYYY-MM-dd
 * @returns Date
 */
export function inputDateToDate(inputDate: string): Date {
  return inputDateTimeToDate(inputDate);
}

/**
 * Convert a date (iso string, number, Date...) to Input Date format (YYYY-MM-ddTmm:ss)
 *
 * @param dateFrom (iso string, Date...)
 * @returns string
 */
export function dateToInputDateTime(dateFrom?: LightDateOptions): string {
  const dte = lightDate.dateOrNow(dateFrom);
  return _dateToString(dte) + 'T' + `${dte.getHours().toString().padStart(2, '0')}:${dte.getMinutes().toString().padStart(2, '0')}`;
}

/**
 * Convert an input date (YYYY-MM-dd) to Date
 *
 * @param inputDate string YYYY-MM-dd
 * @returns Date
 */
export function inputDateTimeToDate(inputDate: string): Date {
  if (!inputDate) {
    return new Date();
  } else {
    if (inputDate.length > 10) {
      return lightDate.dateOrNow(inputDate.replace(/\//g, '-') + ':00.000' + getCurrentTimezone());
    } else {
      return lightDate.dateOrNow(inputDate.replace(/\-/g, '/'));
    }
  }
}

/**
 * Date to YYYY-MM-dd
 */
function _dateToString(dte: Date) {
  return `${dte.getFullYear()}-${(dte.getMonth() + 1).toString().padStart(2, '0')}-${dte.getDate().toString().padStart(2, '0')}`;
}
