/**
 * String Concat is an alternative to String.concat with the ability to specifiy the begin and the end of the array
 */
export function stringConcat(
  array: string[],
  /** start, include */ begin: number = 0,
  /** Len, exclude */ end: number = array.length
): string {
  let str2 = '';
  for (let i = begin; i < end; i++) {
    str2 += array[i];
  }
  return str2;
}
