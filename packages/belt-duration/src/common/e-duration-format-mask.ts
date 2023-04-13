import { EDurationFormat } from './e-duration-format';
import { EDurationMask } from './e-duration-mask';

export const EDurationFormatMask = { ...EDurationFormat, ...EDurationMask };
export type EDurationFormatMask = EDurationFormat | EDurationMask;
