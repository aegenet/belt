/** Map an array */
export async function arrayAsyncMap<I, O>(entries: I[], callbackfn: (value: I, index: number, array: I[]) => Promise<O> | O): Promise<O[]> {
  const mappedArray: O[] = [];
  if (entries) {
    for (let i = 0; i < entries.length; i++) {
      mappedArray.push(await Promise.resolve(callbackfn(entries[i], i, entries)));
    }
  }

  return mappedArray;
}
