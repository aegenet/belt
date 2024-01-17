import { bFetchApplyDefaultOptions, bFetchDefaultOptions } from '../../common/client/b-fetch-default-options';
import type { bFetchOptions } from '../../common/client/b-fetch-options';
import { LOCALHOST, getIPsFromDNSMap, isIP } from '../../common/client/b-fetch-utils';

/** Fetch with Timeout */
export async function bFetch(input: RequestInfo | URL, init: RequestInit = {}, options: bFetchOptions = {}): Promise<Response> {
  bFetchApplyDefaultOptions(options, {
    ...bFetchDefaultOptions,
    /** Not compatible with browser atm */
    replaceDNSByIP: false,
    dnsMapAsFallback: false,
  });

  let urlInput: URL | undefined;
  let origHost: string;
  if (typeof input === 'string' || input instanceof URL) {
    urlInput = new URL(input);

    if (options.replaceDNSByIP) {
      if (options.dnsMap == null) {
        throw new Error('bFetch is not compatible with `replaceDNSByIP` and an empty `dnsMap` in a browser environment');
      }

      origHost = urlInput.host;

      // Check if it is a domain or not an ip (v4/v6)
      if (urlInput.hostname !== LOCALHOST && !isIP(urlInput.hostname)) {
        const ips = getIPsFromDNSMap(options.dnsMap, urlInput.hostname);

        if (ips && ips.length) {
          urlInput.hostname = ips[0];
          init.headers ??= {};
          if (!(init.headers as Record<string, string>).host && !(init.headers as Record<string, string>).Host) {
            (init.headers as Record<string, string>).Host = origHost;
          }
        } else {
          throw new Error(`bFetch: ENOTFOUND ${urlInput.hostname}`);
        }
      }
    }
  } else {
    throw new Error('bFetch is not compatible atm with Request object');
  }

  return await fetch(urlInput, {
    ...init,
    signal: AbortSignal.timeout(options.timeout!),
  });
}
