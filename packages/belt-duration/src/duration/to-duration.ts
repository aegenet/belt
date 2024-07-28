import { roundStep } from '../common/duration-utils';
import { EDurationFormat } from '../common/e-duration-format';
import { EDurationFormatMask } from '../common/e-duration-format-mask';
import type { IDurationOptions } from '../common/i-duration-options';
import { SUPPORTED_DURATIONS } from '../common/supported-durations';
import { createDurationTable } from '../table/create-duration-table';
import type { IDuration } from './i-duration';

/**
 * Convert your duration into IDuration object
 * @param { number | string } value Duration value
 * @param { DurationSourceType } from Duration time type. Default milliseconds
 * @returns IDuration | undefined
 */
export function toDuration(
  value: string | number,
  from: EDurationFormat = EDurationFormat.MILLISECONDS,
  options?: IDurationOptions
): IDuration | undefined {
  options ||= {};
  options.mask ||= EDurationFormatMask.Y_M_W_D_H_M_S;
  options.precision ||= 0.5;

  if (value === undefined || isNaN(parseInt(value as string, 10))) {
    return undefined;
  } else {
    value = +value;
    if (value > Number.MAX_SAFE_INTEGER) {
      throw new Error('The input value must be less than or equal to MAX_SAFE_INTEGER.');
    }
    const duration = createDurationTable(from, options);
    const response: IDuration = {
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      hoursPerDay: options?.hoursPerDay || 24,
      daysPerWeek: options?.daysPerWeek || 7,
    };

    let lastDurFormat: { key: EDurationFormat; field: string } | undefined;
    for (let i = 0; i < SUPPORTED_DURATIONS.length; i++) {
      if (options.mask! & SUPPORTED_DURATIONS[i].key) {
        lastDurFormat = SUPPORTED_DURATIONS[i];

        if (duration[lastDurFormat.key].div) {
          (response as unknown as Record<string, number>)[lastDurFormat.field] = Math.trunc(
            value / duration[lastDurFormat.key].ratio
          );
          if ((response as unknown as Record<string, number>)[lastDurFormat.field]) {
            value = value % duration[lastDurFormat.key].ratio || 0;
          }
        } else {
          (response as unknown as Record<string, number>)[lastDurFormat.field] = Math.trunc(
            value * duration[lastDurFormat.key].ratio
          );
          if ((response as unknown as Record<string, number>)[lastDurFormat.field]) {
            value = value % (1 / duration[lastDurFormat.key].ratio) || 0;
          }
        }
      }
      if (!value) {
        // if the rest of div is 0, it's over
        break;
      }
    }

    if (value && lastDurFormat) {
      // A rest of division & it was the last... we recompute the last part
      if (duration[lastDurFormat.key].div) {
        (response as unknown as Record<string, number>)[lastDurFormat.field] +=
          value / duration[lastDurFormat.key].ratio;
      } else {
        (response as unknown as Record<string, number>)[lastDurFormat.field] +=
          value * duration[lastDurFormat.key].ratio;
      }
      (response as unknown as Record<string, number>)[lastDurFormat.field] = roundStep(
        (response as unknown as Record<string, number>)[lastDurFormat.field],
        options.precision
      );
    }

    return response;
  }
}
