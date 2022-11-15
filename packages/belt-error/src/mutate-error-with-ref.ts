import { asError } from './as-error';

/** RefError */
export type RefError<T = unknown> = Error & T & { refError?: string };

/** Modifies, `mutate`, an `Error` with a `refError` reference and adds the reference to the `message`. */
export function mutateErrorWithRef<T>(error: T): RefError<T> {
  const err: RefError<T> = asError(error);
  if (!err.refError) {
    err.refError = `E-${Date.now().toString(16).toUpperCase()}`;
    err.message = err.refError + (err.message?.length ? ' - ' + err.message : '');
  }

  return err;
}
