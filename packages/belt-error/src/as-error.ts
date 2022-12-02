/** Object as Error instance */
export function asError<T>(error: T): Error & T {
  return error instanceof Error ? error : Object.assign(new Error(typeof error === 'string' ? error : (error as { message?: string }).message), error);
}
