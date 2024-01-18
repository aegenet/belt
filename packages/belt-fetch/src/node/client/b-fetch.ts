import { isIP } from 'node:net';

import type { bFetchOptions } from '../../common/client/b-fetch-options';
import { bFetchApplyDefaultOptions } from '../../common/client/b-fetch-default-options';
import { LOCALHOST } from '../../common/client/b-fetch-utils';
import { bFetchGetIPsFromDNS } from './b-fetch-get-ips-from-dns';
import { bFetchSharedCache } from './b-fetch-shared-cache';

/** Fetch with timeout and an async dns resolver */
export async function bFetch(input: RequestInfo | URL, init: RequestInit = {}, options: bFetchOptions = {}): Promise<Response> {
  bFetchApplyDefaultOptions(options);

  let origHostname: string;
  let urlInput: URL;
  if (typeof input === 'string' || input instanceof URL) {
    urlInput = new URL(input);
    const origHost = urlInput.host;
    origHostname = urlInput.hostname;

    // Check if it is a domain or not an ip (v4/v6)
    if (options.replaceDNSByIP && origHostname !== LOCALHOST && isIP(origHostname) === 0) {
      let ips: string[] | undefined;

      // DNS from cache?
      if (options.dnsCacheTTL && bFetchSharedCache.has(origHostname)) {
        const cache = bFetchSharedCache.get(origHostname);
        if (cache!.eAt > Date.now()) {
          ips = cache!.ips;
        } else {
          bFetchSharedCache.delete(origHostname);
        }
      }

      if (!ips) {
        if ((ips = await bFetchGetIPsFromDNS(urlInput, options))) {
          if (options.dnsCacheTTL) {
            // Cache DNS
            bFetchSharedCache.set(origHostname, {
              ips,
              eAt: Date.now() + options.dnsCacheTTL,
            });
          }
        } else {
          throw new Error(`bFetch: ENOTFOUND ${origHostname}`);
        }
      }

      urlInput.hostname = ips[0];

      init.headers ??= {};
      if (!(init.headers as Record<string, string>).host && !(init.headers as Record<string, string>).Host) {
        (init.headers as Record<string, string>).Host = origHost;
      }
    }
  } else {
    throw new Error('bFetch is not compatible atm with Request object');
  }

  return await fetch(urlInput, {
    ...init,
    signal: AbortSignal.timeout(options.timeout!),
  }).catch(error => {
    if (options.dnsCacheTTL && bFetchSharedCache.has(origHostname)) {
      // Clear DNS cache if request failed
      bFetchSharedCache.delete(origHostname);
    }
    throw error;
  });
}
