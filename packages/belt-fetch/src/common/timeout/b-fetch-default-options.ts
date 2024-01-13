import type { bFetchOptions } from './b-fetch-options';

/**
 * Default bFetch options
 *
 * @internal
 */
export const bFetchDefaultOptions: bFetchOptions = Object.seal({
  timeout: process.env.BELT_FETCH_TIMEOUT ? parseInt(process.env.BELT_FETCH_TIMEOUT, 10) : 10000,
  replaceDNSByIP: true,
  dnsMap: {},
  dnsMapAsFallback: true,
});
