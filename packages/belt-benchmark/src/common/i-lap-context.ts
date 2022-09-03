export interface ILapContext<T = any> {
  value: T | null;
  lapTime: number;
  begin: () => void;
  end: () => void;
}
