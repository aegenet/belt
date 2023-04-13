import { EDurationFormat } from './e-duration-format';

export enum EDurationMask {
  /** All */
  Y_M_W_D_H_M_S = 0xffff,
  /** 2 years, 3 months, 12 days */
  Y_M_D = EDurationFormat.YEARS | EDurationFormat.MONTHS | EDurationFormat.DAYS,
  /** 15 Weeks, 12 days, 5 hours */
  W_D_H = EDurationFormat.WEEKS | EDurationFormat.DAYS | EDurationFormat.HOURS,
  /** 10 days, 5 hours, 12 minutes */
  D_H_M = EDurationFormat.DAYS | EDurationFormat.HOURS | EDurationFormat.MINUTES,
  /** 150 hours, 12 minutes, 5 seconds */
  H_M_S = EDurationFormat.HOURS | EDurationFormat.MINUTES | EDurationFormat.SECONDS,
}
