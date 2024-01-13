import { bFetchDefaultOptions } from '../../common/timeout/b-fetch-default-options';
import type { bFetchOptions } from '../../common/timeout/b-fetch-options';

/** Fetch with Timeout */
export async function bFetch(
  input: RequestInfo | URL,
  init: RequestInit = {},
  options: bFetchOptions = {
    timeout: bFetchDefaultOptions.timeout,
    /** Not compatible with browser atm */
    replaceDNSByIP: false,
  }
): Promise<Response> {
  if (options.replaceDNSByIP) {
    throw new Error('bFetch is not compatible with `replaceDNSByIP` in a browser environment');
  }

  return await fetch(input, {
    ...init,
    signal: AbortSignal.timeout(options.timeout),
  });
}
