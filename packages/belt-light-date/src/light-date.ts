export type LightDateOptions = Date | string | number;

/**
 * Very light Date library
 */
export class LightDate {
  private constructor() {
    //
  }

  /** Today */
  public static today(dateFrom?: LightDateOptions): Date {
    return dateFrom ? new Date(dateFrom) : new Date();
  }

  /** Tomorrow */
  public static tomorrow(dateFrom?: LightDateOptions): Date {
    return LightDate._todayPlus(1, dateFrom);
  }

  /** Yesterday */
  public static yesterday(dateFrom?: LightDateOptions): Date {
    return LightDate._todayPlus(-1, dateFrom);
  }

  /**
   * Today at 00:00:00 (current locale)
   * @remark It's not a UTC midight
   */
  public static todayStart(dateFrom?: LightDateOptions): Date {
    const now = LightDate._dateOrNow(dateFrom);
    now.setHours(0, 0, 0, 0);
    return now;
  }

  /**
   * Today at 23:59:59 (current locale)
   * @remark It's not a UTC midight
   */
  public static todayEnd(dateFrom?: LightDateOptions): Date {
    const now = LightDate._dateOrNow(dateFrom);
    now.setHours(23, 59, 59, 999);
    return now;
  }

  /**
   * Tomorrow at 00:00:00 (current locale)
   * @remark It's not a UTC midight
   */
  public static tomorrowStart(dateFrom?: LightDateOptions): Date {
    const now = LightDate._dateOrNow(dateFrom);
    now.setDate(now.getDate() + 1);
    now.setHours(0, 0, 0, 0);
    return now;
  }

  /**
   * Tomorrow at 23:59:59 (current locale)
   * @remark It's not a UTC midight
   */
  public static tomorrowEnd(dateFrom?: LightDateOptions): Date {
    const now = LightDate._dateOrNow(dateFrom);
    now.setDate(now.getDate() + 1);
    now.setHours(23, 59, 59, 999);
    return now;
  }

  /**
   * Month start at 00:00:00 (current locale)
   * @remark It's not a UTC midight
   */
  public static monthStart(dateFrom?: LightDateOptions): Date {
    const now = LightDate._dateOrNow(dateFrom);
    return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
  }

  /**
   * Month end at 23:59:59 (current locale)
   * @remark It's not a UTC midight
   */
  public static monthEnd(dateFrom?: LightDateOptions): Date {
    const now = LightDate._dateOrNow(dateFrom);
    return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  }

  /**
   * Next month start at 00:00:00 (current locale)
   * @remark It's not a UTC midight
   */
  public static nextMonthStart(dateFrom?: LightDateOptions): Date {
    const now = LightDate._dateOrNow(dateFrom);
    return new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0);
  }

  /**
   * Next month end at 23:59:59 (current locale)
   * @remark It's not a UTC midight
   */
  public static nextMonthEnd(dateFrom?: LightDateOptions): Date {
    const now = LightDate._dateOrNow(dateFrom);
    return new Date(now.getFullYear(), now.getMonth() + 2, 0, 23, 59, 59, 999);
  }

  /**
   * Previous month start at 00:00:00 (current locale)
   * @remark It's not a UTC midight
   */
  public static prevMonthStart(dateFrom?: LightDateOptions): Date {
    const now = LightDate._dateOrNow(dateFrom);
    return new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0);
  }

  /**
   * Previous month end at 23:59:59 (current locale)
   * @remark It's not a UTC midight
   */
  public static prevMonthEnd(dateFrom?: LightDateOptions): Date {
    const now = LightDate._dateOrNow(dateFrom);
    return new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
  }

  /**
   * Year start at 00:00:00 (current locale)
   * @remark It's not a UTC midight
   */
  public static yearStart(dateFrom?: LightDateOptions): Date {
    const now = LightDate._dateOrNow(dateFrom);
    return new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
  }

  /**
   * Year end at 23:59:59 (current locale)
   * @remark It's not a UTC midight
   */
  public static yearEnd(dateFrom?: LightDateOptions): Date {
    const now = LightDate._dateOrNow(dateFrom);
    return new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
  }

  /**
   * Week start at 00:00:00 (current locale)
   * @remark It's not a UTC midight
   */
  public static weekStart(dateFrom?: LightDateOptions, locale?: string) {
    const lng = LightDate.getIntlLocale(locale);

    const now = LightDate._dateOrNow(dateFrom);
    now.setDate(now.getDate() - now.getDay() + (lng.weekInfo.firstDay === 7 ? 0 : lng.weekInfo.firstDay));
    now.setHours(0, 0, 0, 0);
    return now;
  }

  /**
   * Week end at 23:59:59 (current locale)
   * @remark It's not a UTC midight
   */
  public static weekEnd(dateFrom?: LightDateOptions, locale?: string) {
    const weekStart = LightDate.weekStart(dateFrom, locale);
    weekStart.setDate(weekStart.getDate() + 6);
    weekStart.setHours(23, 59, 59, 999);
    return weekStart;
  }

  /**
   * Previous week start at 00:00:00 (current locale)
   * @remark It's not a UTC midight
   */
  public static prevWeekStart(dateFrom?: LightDateOptions, locale?: string): Date {
    const weekStart = LightDate.weekStart(dateFrom, locale);
    weekStart.setDate(weekStart.getDate() - 7);
    return weekStart;
  }

  /**
   * Previous week end at 23:59:59 (current locale)
   * @remark It's not a UTC midight
   */
  public static prevWeekEnd(dateFrom?: LightDateOptions, locale?: string): Date {
    const weekEnd = LightDate.weekEnd(dateFrom, locale);
    weekEnd.setDate(weekEnd.getDate() - 7);
    return weekEnd;
  }

  /**
   * Next week start at 00:00:00 (current locale)
   * @remark It's not a UTC midight
   */
  public static nextWeekStart(dateFrom?: LightDateOptions, locale?: string): Date {
    const weekStart = LightDate.weekStart(dateFrom, locale);
    weekStart.setDate(weekStart.getDate() + 7);
    return weekStart;
  }

  /**
   * Next week end at 23:59:59 (current locale)
   * @remark It's not a UTC midight
   */
  public static nextWeekEnd(dateFrom?: LightDateOptions, locale?: string): Date {
    const weekEnd = LightDate.weekEnd(dateFrom, locale);
    weekEnd.setDate(weekEnd.getDate() + 7);
    return weekEnd;
  }

  /**
   * From now or a date, compute the start & the end date with a number of days.
   */
  public static splitDate(options: { days: number; dateFrom?: LightDateOptions; startEndOf?: 'respect' | 'year' | 'month' | 'week'; locale?: string }): { start: Date; end: Date } {
    const start = LightDate._dateOrNow(options.dateFrom);
    const end = LightDate._dateOrNow(options.dateFrom);
    const daysPart = options.days / 2;
    start.setDate(start.getDate() - daysPart);
    end.setDate(end.getDate() + daysPart);

    switch (options.startEndOf) {
      case 'month':
        return {
          start: LightDate.monthStart(start),
          end: LightDate.monthEnd(end),
        };
      case 'week':
        return {
          start: LightDate.weekStart(start, options.locale),
          end: LightDate.prevWeekEnd(end, options.locale),
        };
      case 'year':
        return {
          start: LightDate.yearStart(start),
          end: LightDate.yearEnd(end),
        };
      default:
        return {
          start: LightDate.todayStart(start),
          end: LightDate.todayEnd(end),
        };
    }
  }

  private static _dateOrNow(dateFrom?: LightDateOptions): Date {
    return dateFrom ? new Date(dateFrom) : new Date();
  }

  private static _todayPlus(diff: number, dateFrom: LightDateOptions): Date {
    const todayPlusX = LightDate._dateOrNow(dateFrom);
    todayPlusX.setDate(todayPlusX.getDate() + diff);
    return todayPlusX;
  }

  /**
   * Get Intl Locale informations
   */
  public static getIntlLocale(locale?: string): IntlLocaleBrowser {
    // We can get the current locale by this way
    const currentLocale = locale || new Intl.NumberFormat().resolvedOptions().locale;
    const localeInfo: IntlLocaleBrowser = new Intl.Locale(currentLocale);
    if (!localeInfo.weekInfo) {
      // Minimal polyfill... (nodejs 16 tested, maybe ok with 18?)
      switch (currentLocale) {
        case 'en-US':
          Object.defineProperty(localeInfo, 'hourCycle', {
            value: 'h12',
          });
          localeInfo.weekInfo = {
            firstDay: 7,
            minimalDays: 1,
            weekend: [6, 7],
          };
          break;
        default:
          Object.defineProperty(localeInfo, 'hourCycle', {
            value: 'h23',
          });
          localeInfo.weekInfo = {
            firstDay: 1,
            minimalDays: 4,
            weekend: [6, 7],
          };
          break;
      }
    }
    return localeInfo;
  }
}

type IntlLocaleBrowser = Intl.Locale & { weekInfo?: { firstDay: number; minimalDays: number; weekend: number[] } };
