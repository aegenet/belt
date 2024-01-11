import { p50 } from '../../../belt-array-stats/src/get-percentile';

/** Chartjs can't digest too much samples */
export function reSamplesData(data: number[], count: number): number[] {
  if (data.length < count) {
    return data;
  }

  const interval = Math.floor((data.length - 1) / count);
  const result = [data[0]];
  let subPart: number[];
  for (let i = 1; i < data.length; i += interval) {
    subPart = data.slice(i, i + interval);
    result.push(p50(subPart));
  }
  return result;
}
