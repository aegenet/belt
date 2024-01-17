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
  cacheTTL: 0,
});

/**
 * Apply Default bFetch options
 *
 * @internal
 */
export function bFetchApplyDefaultOptions(options: bFetchOptions, defaultOptions: bFetchOptions = bFetchDefaultOptions) {
  options.timeout ??= defaultOptions.timeout;
  options.replaceDNSByIP ??= defaultOptions.replaceDNSByIP;
  options.dnsMapAsFallback ??= defaultOptions.dnsMapAsFallback;
  options.dnsCacheTTL ??= defaultOptions.dnsCacheTTL;
}
