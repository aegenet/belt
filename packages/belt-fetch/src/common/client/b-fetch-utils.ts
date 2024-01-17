/**
 * Get IP From DNS Map
 *
 * @internal
 */
export function getIPsFromDNSMap(dnsMap: Record<string, string>, hostname: string): string[] | undefined {
  return dnsMap.hasOwnProperty(hostname) ? [dnsMap[hostname]] : undefined;
}

/** Kudos https://medium.com/@stheodorejohn */
const RE_IPV4 = /^(\d{1,3}\.){3}\d{1,3}$/;
const RE_IPV6 = /^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i;

/**
 * Is an IP
 *
 * @internal
 */
export function isIP(ipOrDNS: string): boolean {
  return RE_IPV4.test(ipOrDNS) || RE_IPV6.test(ipOrDNS);
}

export const LOCALHOST = 'localhost';
