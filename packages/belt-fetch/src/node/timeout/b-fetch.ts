import { resolve6, resolve4 } from 'node:dns/promises';
import { isIP } from 'node:net';

import type { bFetchOptions } from '../../common/timeout/b-fetch-options';
import { bFetchDefaultOptions } from '../../common/timeout/b-fetch-default-options';

const LOCALHOST = 'localhost';

/** Fetch with timeout and an async dns resolver */
export async function bFetch(
  input: RequestInfo | URL,
  init: RequestInit = {},
  options: bFetchOptions = {
    timeout: bFetchDefaultOptions.timeout,
    replaceDNSByIP: bFetchDefaultOptions.replaceDNSByIP,
  }
): Promise<Response> {
  let origHost: string;
  let urlInput: URL;
  if (typeof input === 'string' || input instanceof URL) {
    urlInput = new URL(input);
    origHost = urlInput.host;

    // Check if it is a domain or not an ip (v4/v6)
    if (options.replaceDNSByIP && urlInput.hostname !== LOCALHOST && isIP(urlInput.hostname) === 0) {
      // Resolve dns to ipv6 first
      let ips = await resolve6(urlInput.hostname).catch(() => []);
      if (ips.length === 0) {
        // ipv4 fallback
        ips = await resolve4(urlInput.hostname);
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

  return await fetch(input, {
    ...init,
    signal: AbortSignal.timeout(options.timeout),
  });
}
