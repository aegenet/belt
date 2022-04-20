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
   * Today at 00:00:00 (current language)
   * @remark It's not a UTC midight
   */
  public static todayStart(dateFrom?: LightDateOptions): Date {
    const now = LightDate._dateOrNow(dateFrom);
    now.setHours(0, 0, 0, 0);
    return now;
  }

  /**
   * Today at 23:59:59 (current language)
   * @remark It's not a UTC midight
   */
  public static todayEnd(dateFrom?: LightDateOptions): Date {
    const now = LightDate._dateOrNow(dateFrom);
    now.setHours(23, 59, 59, 999);
    return now;
  }

  /**
   * Tomorrow at 00:00:00 (current language)
   * @remark It's not a UTC midight
   */
  public static tomorrowStart(dateFrom?: LightDateOptions): Date {
    const now = LightDate._dateOrNow(dateFrom);
    now.setDate(now.getDate() + 1);
    now.setHours(0, 0, 0, 0);
    return now;
  }

  /**
   * Tomorrow at 23:59:59 (current language)
   * @remark It's not a UTC midight
   */
  public static tomorrowEnd(dateFrom?: LightDateOptions): Date {
    const now = LightDate._dateOrNow(dateFrom);
    now.setDate(now.getDate() + 1);
    now.setHours(23, 59, 59, 999);
    return now;
  }

  /**
   * Month start at 00:00:00 (current language)
   * @remark It's not a UTC midight
   */
  public static monthStart(dateFrom?: LightDateOptions): Date {
    const now = LightDate._dateOrNow(dateFrom);
    return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
  }

  /**
   * Month end at 23:59:59 (current language)
   * @remark It's not a UTC midight
   */
  public static monthEnd(dateFrom?: LightDateOptions): Date {
    const now = LightDate._dateOrNow(dateFrom);
    return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  }

  /**
   * Next month start at 00:00:00 (current language)
   * @remark It's not a UTC midight
   */
  public static nextMonthStart(dateFrom?: LightDateOptions): Date {
    const now = LightDate._dateOrNow(dateFrom);
    return new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0);
  }

  /**
   * Next month end at 23:59:59 (current language)
   * @remark It's not a UTC midight
   */
  public static nextMonthEnd(dateFrom?: LightDateOptions): Date {
    const now = LightDate._dateOrNow(dateFrom);
    return new Date(now.getFullYear(), now.getMonth() + 2, 0, 23, 59, 59, 999);
  }

  /**
   * Previous month start at 00:00:00 (current language)
   * @remark It's not a UTC midight
   */
  public static prevMonthStart(dateFrom?: LightDateOptions): Date {
    const now = LightDate._dateOrNow(dateFrom);
    return new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0);
  }

  /**
   * Previous month end at 23:59:59 (current language)
   * @remark It's not a UTC midight
   */
  public static prevMonthEnd(dateFrom?: LightDateOptions): Date {
    const now = LightDate._dateOrNow(dateFrom);
    return new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
  }

  private static _dateOrNow(dateFrom?: LightDateOptions): Date {
    return dateFrom ? new Date(dateFrom) : new Date();
  }

  private static _todayPlus(diff: number, dateFrom: LightDateOptions): Date {
    const todayPlusX = LightDate._dateOrNow(dateFrom);
    todayPlusX.setDate(todayPlusX.getDate() + diff);
    return todayPlusX;
  }
}
