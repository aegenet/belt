/** Is Promise ? */
export function isPromise(something: unknown) {
  return !!(something && typeof something !== 'number' && typeof (something as Promise<unknown>).then === 'function');
}
