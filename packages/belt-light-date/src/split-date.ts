import { type LightDateOptions, lightDate } from './light-date';

/**
 * From now or a date, compute the start & the end date with a number of days.
 */
export function splitDate(options: { days: number; dateFrom?: LightDateOptions; startEndOf?: 'respect' | 'year' | 'month' | 'week'; locale?: string }): { start: Date; end: Date } {
  const start = lightDate.today(options.dateFrom);
  const end = lightDate.today(options.dateFrom);
  const daysPart = options.days / 2;
  start.setDate(start.getDate() - daysPart);
  end.setDate(end.getDate() + daysPart);

  switch (options.startEndOf) {
    case 'month':
      return {
        start: lightDate.monthStart(start),
        end: lightDate.monthEnd(end),
      };
    case 'week':
      return {
        start: lightDate.weekStart(start, options.locale),
        end: lightDate.prevWeekEnd(end, options.locale),
      };
    case 'year':
      return {
        start: lightDate.yearStart(start),
        end: lightDate.yearEnd(end),
      };
    default:
      return {
        start: lightDate.todayStart(start),
        end: lightDate.todayEnd(end),
      };
  }
}
