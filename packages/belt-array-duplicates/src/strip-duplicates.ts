/** Return array without duplicates elements */
export function stripDuplicates<T = unknown>(
  dupArray: T[],
  options: {
    compare?: (a: T, b: T) => boolean;
    sorted?: boolean;
  } = {}
): T[] {
  if (dupArray?.length) {
    const entries = dupArray.slice(0);
    if (options.compare && !options.sorted) {
      throw new Error('Invalid usage: compare function is only available with sorted array.');
    }

    if (options.sorted) {
      let compare = options.compare;
      if (!compare) {
        const keys = typeof entries[0] === 'number' ? [] : Object.keys((entries as any)[0]);
        if (keys.length === 0) {
          // Simple compare
          compare = (a, b) => a == b;
        } else {
          // default isSame, all elements must have the same keys
          compare = (a, b) => {
            let isOk = true;
            for (let keyI = 0; keyI < keys.length; keyI++) {
              const key = keys[keyI];
              if ((a ? JSON.stringify((a as any)[key]) : null) !== (b ? JSON.stringify((b as any)[key]) : null)) {
                isOk = false;
                break;
              }
            }

            return isOk;
          };
        }
      }

      for (let i = entries.length - 1; i > 0; i--) {
        if (compare(entries[i], entries[i - 1])) {
          // On retire le doublon
          entries.splice(i, 1);
        }
      }
      return entries;
    } else {
      return entries.filter((v, i) => entries.indexOf(v) === i);
    }
  } else {
    return [];
  }
}
