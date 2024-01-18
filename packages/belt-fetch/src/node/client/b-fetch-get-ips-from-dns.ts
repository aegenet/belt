import { resolve4, resolve6 } from 'node:dns/promises';
import type { bFetchOptions } from '../../common/client/b-fetch-options';
import { getIPsFromDNSMap } from '../../common/client/b-fetch-utils';

/** Get DNS strategies */
const strategies: Array<(hostname: string, options: bFetchOptions) => Promise<string[] | undefined>> = [
  // From dns map (optional)
  (hostname, options) => {
    if (options.dnsMapAsFallback === false && options.dnsMap) {
      // DNS Map is used as the primary resolver
      return Promise.resolve(getIPsFromDNSMap(options.dnsMap, hostname));
    } else {
      return Promise.resolve(undefined);
    }
  },
  // Resolve dns to ipv6 first
  async hostname => {
    return await resolve6(hostname).catch(() => undefined);
  },
  // Resolve dns to ipv4
  async (hostname, options) => {
    return await resolve4(hostname).catch(() => undefined);
  },
  // DNS map as fallback (optional)
  (hostname, options) => {
    if (options.dnsMapAsFallback && options.dnsMap) {
      // DNS Map is used as the fallback resolver
      return Promise.resolve(getIPsFromDNSMap(options.dnsMap, hostname));
    } else {
      return Promise.resolve(undefined);
    }
  },
];

/** Get IPs from DNS */
export async function bFetchGetIPsFromDNS(urlInput: URL, options: bFetchOptions): Promise<string[] | undefined> {
  let ips: string[] | undefined;

  for (const strat of strategies) {
    if ((ips = await strat(urlInput.hostname, options)) && ips.length) {
      break;
    }
  }

  if (ips?.length) {
    return ips;
  } else {
    return undefined;
  }
}
