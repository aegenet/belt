import { roundStep } from '../common/duration-utils';
import { EDurationFormat } from '../common/e-duration-format';
import { EDurationFormatMask } from '../common/e-duration-format-mask';
import type { IDurationOptions } from '../common/i-duration-options';
import { SUPPORTED_DURATIONS } from '../common/supported-durations';
import { createDurationTable } from '../table/create-duration-table';
import type { IDuration } from './i-duration';

/**
 * Convert IDuration object into duration
 * @param { IDuration } value IDurationFormat object
 * @param { EDurationFormat } to Duration time type. Default milliseconds
 * @returns { number }
 */
export function fromDuration(
  value: IDuration | undefined,
  to: EDurationFormat = EDurationFormat.MILLISECONDS,
  options?: IDurationOptions
): number {
  options ||= {};
  options.mask ||= EDurationFormatMask.Y_M_W_D_H_M_S;
  options.precision ||= 0.5;

  if (!value) {
    return 0;
  } else {
    const duration = createDurationTable(to, {
      hoursPerDay: value.hoursPerDay || options?.hoursPerDay || 24,
      daysPerWeek: value.daysPerWeek || options?.daysPerWeek || 7,
    });

    let result: number = 0;
    for (const durFormat of SUPPORTED_DURATIONS) {
      if (options.mask & durFormat.key) {
        if (duration[durFormat.key].div) {
          result += (value as unknown as Record<string, number>)[durFormat.field] * duration[durFormat.key].ratio;
        } else {
          result += (value as unknown as Record<string, number>)[durFormat.field] / duration[durFormat.key].ratio;
        }
      }
    }

    return roundStep(result, options.precision);
  }
}
