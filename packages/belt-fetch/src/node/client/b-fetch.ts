import { isIP } from 'node:net';

import type { bFetchOptions } from '../../common/client/b-fetch-options';
import { bFetchApplyDefaultOptions } from '../../common/client/b-fetch-default-options';
import { LOCALHOST } from '../../common/client/b-fetch-utils';
import { bFetchGetIPsFromDNS } from './b-fetch-get-ips-from-dns';

/** Fetch with timeout and an async dns resolver */
export async function bFetch(input: RequestInfo | URL, init: RequestInit = {}, options: bFetchOptions = {}): Promise<Response> {
  bFetchApplyDefaultOptions(options);

  let origHost: string;
  let urlInput: URL;
  if (typeof input === 'string' || input instanceof URL) {
    urlInput = new URL(input);
    origHost = urlInput.host;

    // Check if it is a domain or not an ip (v4/v6)
    if (options.replaceDNSByIP && urlInput.hostname !== LOCALHOST && isIP(urlInput.hostname) === 0) {
      const ips: string[] = await bFetchGetIPsFromDNS(urlInput, options);
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
  });
}
