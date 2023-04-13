import { EDurationFormat } from '../common/e-duration-format';

export interface IDurationTable {
  [EDurationFormat.YEARS]: {
    div?: boolean;
    ratio: number;
  };
  [EDurationFormat.MONTHS]: {
    div?: boolean;
    ratio: number;
  };
  [EDurationFormat.WEEKS]: {
    div?: boolean;
    ratio: number;
  };
  [EDurationFormat.DAYS]: {
    div?: boolean;
    ratio: number;
  };
  [EDurationFormat.HOURS]: {
    div?: boolean;
    ratio: number;
  };
  [EDurationFormat.MINUTES]: {
    div?: boolean;
    ratio: number;
  };
  [EDurationFormat.SECONDS]: {
    div?: boolean;
    ratio: number;
  };
  [EDurationFormat.MILLISECONDS]: {
    div?: boolean;
    ratio: number;
  };
}
