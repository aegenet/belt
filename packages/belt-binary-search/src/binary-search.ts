/** Binary search */
export function binarySearch<EntityType = unknown>(
  entries: EntityType[],
  searchValue: EntityType,
  comparator: (a: EntityType, b: EntityType) => number,
  min: number = 0,
  max: number = entries.length
): {
  value: EntityType;
  index: number;
} | null {
  const index = Math.floor(min + (max - min) / 2);
  const cmp = comparator(entries[index], searchValue);
  if (cmp !== 0 && (index === 0 || index === entries.length - 1)) {
    return null;
  }

  if (cmp > 0) {
    if (index === max) {
      return null;
    }
    return binarySearch<EntityType>(entries, searchValue, comparator, min, index);
  } else if (cmp < 0) {
    if (index === min) {
      return null;
    }
    return binarySearch<EntityType>(entries, searchValue, comparator, index, max);
  } else {
    return {
      value: entries[index],
      index,
    };
  }
}

/** Sort and binary search */
export function safeBinarySearch<EntityType = unknown>(
  entries: EntityType[],
  searchValue: EntityType,
  comparator?: (a: EntityType, b: EntityType) => number
): {
  value: EntityType;
  index: number;
} | null {
  if (!comparator) {
    if (typeof searchValue === 'string') {
      comparator = ((a: string, b: string) => a.localeCompare(b)) as unknown as (a: EntityType, b: EntityType) => number;
    } else if (typeof searchValue === 'number' || typeof searchValue === 'bigint') {
      comparator = ((a: number, b: number) => a - b) as unknown as (a: EntityType, b: EntityType) => number;
    } else {
      throw new Error('Invalid usage: you must specify a comparator if your searchValue is an object.');
    }
  }

  // Clone, sort (without touch the original array)
  const sorted = entries.slice(0).sort(comparator);

  return binarySearch<EntityType>(sorted, searchValue, comparator);
}
