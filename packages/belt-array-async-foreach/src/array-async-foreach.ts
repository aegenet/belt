/**
 * Performs the specified action for each element in an array.
 * @param callbackfn A function (void or Promise<void>) that accepts up to three arguments. asyncForEach calls the callbackfn function one time for each element in the array.
 */
export async function arrayAsyncForEach<T = unknown>(entries: T[], callbackfn: (value?: T, index?: number, array?: T[]) => void | Promise<void>): Promise<void> {
  if (entries) {
    for (let i = 0; i < entries.length; i++) {
      const voidOrPromise = callbackfn(entries[i], i, entries);
      if (voidOrPromise && voidOrPromise.then) {
        await voidOrPromise;
      }
    }
  }
}
