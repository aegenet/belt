/**
 * Clone an object
 * Can keep the class type if needed
 */
export function oclone<T extends object>(
  source: T,
  options?: {
    /** If true, we try to recreate the same object type */
    keepType?: boolean;
  }
): T {
  if (source) {
    // We don't want any references
    const clone = JSON.parse(JSON.stringify(source));
    if (options?.keepType && source.constructor.name !== 'Object') {
      return Object.assign(new (source as any).constructor(), clone);
    } else {
      return clone;
    }
  } else {
    return null;
  }
}
