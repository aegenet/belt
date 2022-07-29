import type { IDomain } from './i-domain';

/**
 * Get the domain informations
 * @param host xxx.yyyy.com
 * @returns { domain, subdomains }
 */
export function extractDomain(host: string): IDomain | null {
  if (host) {
    const parts = host.split('.');
    return {
      domain: parts.slice(-2).join('.'),
      subdomains: parts.slice(0, -2).reverse(),
    };
  } else {
    return null;
  }
}
