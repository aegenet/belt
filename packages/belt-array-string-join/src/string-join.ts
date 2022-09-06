/**
 * String Join is an alternative to Array.join with the ability to specify the begin and the end for the array
 */
export function stringJoin(array: string[], separator = '', begin: number = 0, end: number = array.length): string {
  let str2 = '';
  const endSep = end - 1;

  for (let i = begin; i < end; i++) {
    str2 += array[i];
    if (i < endSep) {
      str2 += separator;
    }
  }
  return str2;
}
