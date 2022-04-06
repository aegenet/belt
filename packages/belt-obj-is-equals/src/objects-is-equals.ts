import { isRecord } from './is-record';

/**
 * Objects is equals ?
 * @param newValue
 * @param oldValue
 */
export function objectsIsEquals<T = unknown>(newValue: T, oldValue: T): boolean {
  if (newValue === oldValue) {
    return true;
  } else if ((newValue == null && oldValue != null) || (newValue != null && oldValue == null)) {
    return false;
  } else {
    if (isRecord(newValue)) {
      return JSON.stringify(newValue) === JSON.stringify(oldValue);
    } else {
      const a = newValue instanceof Date ? newValue.toISOString() : newValue;
      const b = oldValue instanceof Date ? oldValue.toISOString() : oldValue;
      return a === b;
    }
  }
}

/**
 * Is not equals ?
 * @param newValue
 * @param oldValue
 * @returns
 */
export function objectsIsNotEquals<T = unknown>(newValue: T, oldValue: T): boolean {
  return !objectsIsEquals(newValue, oldValue);
}
