import { asError } from './as-error';

/**
 * Internal usage, error counter, 1 to 4095 then loop
 * @internal
 */
let _I_E_C: number = 1;

/** RefError */
export type RefError<T = unknown> = Error & T & { refError?: string };

/** Modifies, `mutate`, an `Error` with a `refError` reference and adds the reference to the `message`. */
export function mutateErrorWithRef<T, D extends Record<string, unknown>>(
  error: T,
  options: {
    /** Optional value to identify the error code */
    identifier?: string;
    /** Prefix `error.message` with `refError` */
    prefixWithRef?: boolean;
    /** Data that will be injected into the error object */
    data?: D;
    /** Set `message` and `stack` properties to enumerable */
    setAsEnumerable?: boolean;
  } = {}
): RefError<T & D> {
  const err: RefError<T & D> = asError(error) as RefError<T & D>;
  if (!err.refError) {
    err.refError = `E-${(Date.now().toString(16) + _I_E_C.toString(16)).toUpperCase()}` + (options.identifier ? `.${options.identifier}` : '');
    _I_E_C = _I_E_C + 1 > 4095 ? 1 : _I_E_C + 1;

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

  if (options.setAsEnumerable) {
    if (err.message) {
      Object.defineProperty(err, 'message', {
        value: err.message,
        enumerable: true,
      });
    }
    if (err.stack) {
      Object.defineProperty(err, 'stack', {
        value: err.stack,
        enumerable: true,
      });
    }
  }
  return err;
}
