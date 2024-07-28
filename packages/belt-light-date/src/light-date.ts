export type LightDateOptions = Date | string | number;

/**
 * Very light Date library
 */
export class LightDate {
  /** Today */
  public today(dateFrom?: LightDateOptions): Date {
    return this.dateOrNow(dateFrom);
  }

  /** Tomorrow */
  public tomorrow(dateFrom?: LightDateOptions): Date {
    return this._todayPlus(1, dateFrom);
  }

  /** Yesterday */
  public yesterday(dateFrom?: LightDateOptions): Date {
    return this._todayPlus(-1, dateFrom);
  }

  /**
   * Today at 00:00:00 (current locale)
   * @remark It's not a UTC midight
   */
  public todayStart(dateFrom?: LightDateOptions): Date {
    const now = this.dateOrNow(dateFrom);
    now.setHours(0, 0, 0, 0);
    return now;
  }

  /**
   * Today at 23:59:59 (current locale)
   * @remark It's not a UTC midight
   */
  public todayEnd(dateFrom?: LightDateOptions): Date {
    const now = this.dateOrNow(dateFrom);
    now.setHours(23, 59, 59, 999);
    return now;
  }

  /**
   * Tomorrow at 00:00:00 (current locale)
   * @remark It's not a UTC midight
   */
  public tomorrowStart(dateFrom?: LightDateOptions): Date {
    const now = this.dateOrNow(dateFrom);
    now.setDate(now.getDate() + 1);
    now.setHours(0, 0, 0, 0);
    return now;
  }

  /**
   * Tomorrow at 23:59:59 (current locale)
   * @remark It's not a UTC midight
   */
  public tomorrowEnd(dateFrom?: LightDateOptions): Date {
    const now = this.dateOrNow(dateFrom);
    now.setDate(now.getDate() + 1);
    now.setHours(23, 59, 59, 999);
    return now;
  }

  /**
   * Month start at 00:00:00 (current locale)
   * @remark It's not a UTC midight
   */
  public monthStart(dateFrom?: LightDateOptions): Date {
    const now = this.dateOrNow(dateFrom);
    return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
  }

  /**
   * Month end at 23:59:59 (current locale)
   * @remark It's not a UTC midight
   */
  public monthEnd(dateFrom?: LightDateOptions): Date {
    const now = this.dateOrNow(dateFrom);
    return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  }

  /**
   * Next month start at 00:00:00 (current locale)
   * @remark It's not a UTC midight
   */
  public nextMonthStart(dateFrom?: LightDateOptions): Date {
    const now = this.dateOrNow(dateFrom);
    return new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0);
  }

  /**
   * Next month end at 23:59:59 (current locale)
   * @remark It's not a UTC midight
   */
  public nextMonthEnd(dateFrom?: LightDateOptions): Date {
    const now = this.dateOrNow(dateFrom);
    return new Date(now.getFullYear(), now.getMonth() + 2, 0, 23, 59, 59, 999);
  }

  /**
   * Previous month start at 00:00:00 (current locale)
   * @remark It's not a UTC midight
   */
  public prevMonthStart(dateFrom?: LightDateOptions): Date {
    const now = this.dateOrNow(dateFrom);
    return new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0);
  }

  /**
   * Previous month end at 23:59:59 (current locale)
   * @remark It's not a UTC midight
   */
  public prevMonthEnd(dateFrom?: LightDateOptions): Date {
    const now = this.dateOrNow(dateFrom);
    return new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
  }

  /**
   * Year start at 00:00:00 (current locale)
   * @remark It's not a UTC midight
   */
  public yearStart(dateFrom?: LightDateOptions): Date {
    const now = this.dateOrNow(dateFrom);
    return new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
  }

  /**
   * Year end at 23:59:59 (current locale)
   * @remark It's not a UTC midight
   */
  public yearEnd(dateFrom?: LightDateOptions): Date {
    const now = this.dateOrNow(dateFrom);
    return new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
  }

  /**
   * Week start at 00:00:00 (current locale)
   * @remark It's not a UTC midight
   */
  public weekStart(dateFrom?: LightDateOptions, locale?: string) {
    const lng = this.getIntlLocale(locale);

    const now = this.dateOrNow(dateFrom);
    // getDay 0 - sunday - 6 sartuday
    const dayOfWeek = now.getDay();
    // properDayOfWeek 1 - monday - 7 sunday
    const properDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    now.setDate(now.getDate() - properDayOfWeek + (lng.weekInfo!.firstDay === 7 ? 0 : lng.weekInfo!.firstDay));
    now.setHours(0, 0, 0, 0);
    return now;
  }

  /**
   * Week end at 23:59:59 (current locale)
   * @remark It's not a UTC midight
   */
  public weekEnd(dateFrom?: LightDateOptions, locale?: string) {
    const weekStart = this.weekStart(dateFrom, locale);
    weekStart.setDate(weekStart.getDate() + 6);
    weekStart.setHours(23, 59, 59, 999);
    return weekStart;
  }

  /**
   * Previous week start at 00:00:00 (current locale)
   * @remark It's not a UTC midight
   */
  public prevWeekStart(dateFrom?: LightDateOptions, locale?: string): Date {
    const weekStart = this.weekStart(dateFrom, locale);
    weekStart.setDate(weekStart.getDate() - 7);
    return weekStart;
  }

  /**
   * Previous week end at 23:59:59 (current locale)
   * @remark It's not a UTC midight
   */
  public prevWeekEnd(dateFrom?: LightDateOptions, locale?: string): Date {
    const weekEnd = this.weekEnd(dateFrom, locale);
    weekEnd.setDate(weekEnd.getDate() - 7);
    return weekEnd;
  }

  /**
   * Next week start at 00:00:00 (current locale)
   * @remark It's not a UTC midight
   */
  public nextWeekStart(dateFrom?: LightDateOptions, locale?: string): Date {
    const weekStart = this.weekStart(dateFrom, locale);
    weekStart.setDate(weekStart.getDate() + 7);
    return weekStart;
  }

  /**
   * Next week end at 23:59:59 (current locale)
   * @remark It's not a UTC midight
   */
  public nextWeekEnd(dateFrom?: LightDateOptions, locale?: string): Date {
    const weekEnd = this.weekEnd(dateFrom, locale);
    weekEnd.setDate(weekEnd.getDate() + 7);
    return weekEnd;
  }

  public dateOrNow(dateFrom?: LightDateOptions): Date {
    return dateFrom ? new Date(dateFrom) : new Date();
  }

  private _todayPlus(diff: number, dateFrom?: LightDateOptions): Date {
    const todayPlusX = this.dateOrNow(dateFrom);
    todayPlusX.setDate(todayPlusX.getDate() + diff);
    return todayPlusX;
  }

  /**
   * Get Intl Locale informations
   */
  public getIntlLocale(locale?: string): IntlLocaleBrowser {
    // We can get the current locale by this way
    const currentLocale = locale || new Intl.NumberFormat().resolvedOptions().locale;
    const localeInfo: IntlLocaleBrowserOpt = new Intl.Locale(currentLocale);
    if (!localeInfo.weekInfo || !localeInfo.hourCycle) {
      // Minimal polyfill... (nodejs 16; weekInfo = null; node 18; weekInfo ok; but hourCycle KO)
      const defaultHourCycle = localeInfo.hourCycles?.length ? localeInfo.hourCycles[0] : null;
      switch (currentLocale) {
        case 'en-US':
          Object.defineProperty(localeInfo, 'hourCycle', {
            value: defaultHourCycle || 'h12',
          });
          localeInfo.weekInfo ||= {
            firstDay: 7,
            minimalDays: 1,
            weekend: [6, 7],
          };
          break;
        default:
          Object.defineProperty(localeInfo, 'hourCycle', {
            value: defaultHourCycle || 'h23',
          });
          localeInfo.weekInfo ||= {
            firstDay: 1,
            minimalDays: 4,
            weekend: [6, 7],
          };
          break;
      }
    }
    return localeInfo as IntlLocaleBrowser;
  }
}

export type IntlLocaleBrowserOpt = Intl.Locale & {
  hourCycles?: string[];
  weekInfo?: { firstDay: number; minimalDays: number; weekend: number[] };
};
export type IntlLocaleBrowser = Intl.Locale & {
  hourCycles: string[];
  weekInfo: { firstDay: number; minimalDays: number; weekend: number[] };
};

/**
 * Global instance of LightDate
 */
export const lightDate = new LightDate();
