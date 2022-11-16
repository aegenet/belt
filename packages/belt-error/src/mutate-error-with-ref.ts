import { asError } from './as-error';

/** RefError */
export type RefError<T = unknown> = Error & T & { refError?: string };

/** Modifies, `mutate`, an `Error` with a `refError` reference and adds the reference to the `message`. */
export function mutateErrorWithRef<T, D extends Record<string, unknown>>(
  error: T,
  options: {
    /** Prefix `error.message` with `refError` */
    prefixWithRef?: boolean;
    /** Data that will be injected into the error object */
    data?: D;
  } = {}
): RefError<T & D> {
  const err: RefError<T & D> = asError(error) as RefError<T & D>;
  if (!err.refError) {
    err.refError = `E-${Date.now().toString(16).toUpperCase()}`;
    if (options.prefixWithRef) {
      err.message = err.refError + (err.message?.length ? ' - ' + err.message : '');
    }
  }

  if (options.data) {
    for (const key in options.data as Record<string, unknown>) {
      if (options.data[key] !== undefined) {
        (err as Record<string, unknown>)[key] = options.data[key];
      }
    }
  }

  return err;
}
