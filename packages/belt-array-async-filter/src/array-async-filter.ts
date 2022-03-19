/** Filter an array */
export async function arrayAsyncFilter<T = unknown>(entries: T[], predicate: (value?: T, index?: number, array?: T[]) => boolean | Promise<boolean>): Promise<T[]> {
  const filtered: T[] = [];
  if (entries) {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const isOk = predicate(entry, i, entries);
      if (isOk) {
        if (typeof isOk === 'boolean') {
          filtered.push(entry);
        } else {
          if (await Promise.resolve(isOk)) {
            filtered.push(await Promise.resolve(entry));
          }
        }
      }
    }
  }

  return filtered;
}
