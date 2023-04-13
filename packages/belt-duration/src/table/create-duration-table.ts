import { MONTHS_PER_YEAR, WEEKS_PER_MONTH } from '../common/constants';
import { EDurationFormat } from '../common/e-duration-format';
import type { IDurationOptions } from '../common/i-duration-options';
import type { IDurationTable } from './i-duration-table';

const { YEARS, MONTHS, WEEKS, DAYS, HOURS, MINUTES, SECONDS, MILLISECONDS } = EDurationFormat;
const memoizeMap: Map<string, IDurationTable> = new Map();

/**
 * Return durations needed to convert value into IDurationFormat
 *
 * @param { EDurationFormat } from Duration time type. Default milliseconds
 * @returns { IDurationInterval }
 */
export function createDurationTable(from: EDurationFormat = EDurationFormat.MILLISECONDS, options: Omit<IDurationOptions, 'mask' | 'precision'> = { hoursPerDay: 24, daysPerWeek: 7, memoize: false }): IDurationTable {
  options ||= {};
  options.hoursPerDay ||= 24;
  options.daysPerWeek ||= 7;
  const memoize = (options.memoize ??= false);

  const memKey = memoize ? `${from}_${options.daysPerWeek}_${options.hoursPerDay}` : '';

  if (memoize && memoizeMap.has(memKey)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return memoizeMap.get(memKey)!;
  }

  const duration: IDurationTable = {
    [YEARS]: {
      ratio: 0,
    },
    [MONTHS]: {
      ratio: 0,
    },
    [WEEKS]: {
      ratio: 0,
    },
    [DAYS]: {
      ratio: 0,
    },
    [HOURS]: {
      ratio: 0,
    },
    [MINUTES]: {
      ratio: 0,
    },
    [SECONDS]: {
      ratio: 0,
    },
    [MILLISECONDS]: {
      ratio: 0,
    },
  };

  switch (from) {
    case EDurationFormat.YEARS:
      const hoursPerDayXdaysPerWeekXM12 = options.hoursPerDay * options.daysPerWeek * WEEKS_PER_MONTH * MONTHS_PER_YEAR;
      duration[HOURS] = {
        div: false,
        ratio: hoursPerDayXdaysPerWeekXM12,
      };
      duration[MINUTES] = {
        div: false,
        ratio: hoursPerDayXdaysPerWeekXM12 * 60,
      };
      duration[SECONDS] = {
        div: false,
        ratio: hoursPerDayXdaysPerWeekXM12 * 3600,
      };
      duration[MILLISECONDS] = {
        div: false,
        ratio: hoursPerDayXdaysPerWeekXM12 * 3600000,
      };
      break;
    case EDurationFormat.MONTHS:
      const hoursPerDayXdaysPerWeekXM = options.hoursPerDay * options.daysPerWeek * WEEKS_PER_MONTH;
      duration[HOURS] = {
        div: false,
        ratio: hoursPerDayXdaysPerWeekXM,
      };
      duration[MINUTES] = {
        div: false,
        ratio: hoursPerDayXdaysPerWeekXM * 60,
      };
      duration[SECONDS] = {
        div: false,
        ratio: hoursPerDayXdaysPerWeekXM * 3600,
      };
      duration[MILLISECONDS] = {
        div: false,
        ratio: hoursPerDayXdaysPerWeekXM * 3600000,
      };
      break;
    case EDurationFormat.WEEKS:
      const hoursPerDayXdaysPerWeek = options.hoursPerDay * options.daysPerWeek;
      duration[HOURS] = {
        div: false,
        ratio: hoursPerDayXdaysPerWeek,
      };
      duration[MINUTES] = {
        div: false,
        ratio: hoursPerDayXdaysPerWeek * 60,
      };
      duration[SECONDS] = {
        div: false,
        ratio: hoursPerDayXdaysPerWeek * 3600,
      };
      duration[MILLISECONDS] = {
        div: false,
        ratio: hoursPerDayXdaysPerWeek * 3600000,
      };
      break;
    case EDurationFormat.DAYS:
      duration[HOURS] = {
        div: false,
        ratio: options.hoursPerDay,
      };
      duration[MINUTES] = {
        div: false,
        ratio: options.hoursPerDay * 60,
      };
      duration[SECONDS] = {
        div: false,
        ratio: options.hoursPerDay * 3600,
      };
      duration[MILLISECONDS] = {
        div: false,
        ratio: options.hoursPerDay * 3600000,
      };
      break;
    case EDurationFormat.HOURS:
      duration[HOURS] = {
        div: false,
        ratio: 1,
      };
      duration[MINUTES] = {
        div: false,
        ratio: 60,
      };
      duration[SECONDS] = {
        div: false,
        ratio: 3600,
      };
      duration[MILLISECONDS] = {
        div: false,
        ratio: 3600000,
      };
      break;
    case EDurationFormat.MINUTES:
      duration[HOURS] = {
        div: true,
        ratio: 60,
      };
      duration[MINUTES] = {
        div: false,
        ratio: 1,
      };
      duration[SECONDS] = {
        div: false,
        ratio: 60,
      };
      duration[MILLISECONDS] = {
        div: false,
        ratio: 60000,
      };
      break;
    case EDurationFormat.SECONDS:
      duration[HOURS] = {
        div: true,
        ratio: 3600,
      };
      duration[MINUTES] = {
        div: true,
        ratio: 60,
      };
      duration[SECONDS] = {
        div: false,
        ratio: 1,
      };
      duration[MILLISECONDS] = {
        div: false,
        ratio: 1000,
      };
      break;
    case EDurationFormat.MILLISECONDS:
    default:
      duration[HOURS] = {
        div: true,
        ratio: 3600000,
      };
      duration[MINUTES] = {
        div: true,
        ratio: 60000,
      };
      duration[SECONDS] = {
        div: true,
        ratio: 1000,
      };
      duration[MILLISECONDS] = {
        div: false,
        ratio: 1,
      };
      break;
  }

  /** Days */
  duration[DAYS] = {
    div: from < EDurationFormat.DAYS,
    ratio: from === EDurationFormat.DAYS ? 1 : from > EDurationFormat.DAYS ? duration[HOURS].ratio / options.hoursPerDay : duration[HOURS].ratio * options.hoursPerDay,
  };

  duration[WEEKS] = {
    div: from < EDurationFormat.WEEKS,
    ratio: from === EDurationFormat.WEEKS ? 1 : from > EDurationFormat.WEEKS ? duration[DAYS].ratio / options.daysPerWeek : duration[DAYS].ratio * options.daysPerWeek,
  };
  duration[MONTHS] = {
    div: from < EDurationFormat.MONTHS,
    ratio: from === EDurationFormat.MONTHS ? 1 : from > EDurationFormat.MONTHS ? duration[WEEKS].ratio / WEEKS_PER_MONTH : duration[WEEKS].ratio * WEEKS_PER_MONTH,
  };
  duration[YEARS] = {
    div: from < EDurationFormat.YEARS,
    ratio: from === EDurationFormat.YEARS ? 1 : from > EDurationFormat.YEARS ? duration[MONTHS].ratio / MONTHS_PER_YEAR : duration[MONTHS].ratio * MONTHS_PER_YEAR,
  };

  /** Memoize */
  memoize && memoizeMap.set(memKey, duration);

  return duration;
}

/**
 * Cleanup memoize cache
 */
export function cleanupDurationCache() {
  memoizeMap.clear();
}
