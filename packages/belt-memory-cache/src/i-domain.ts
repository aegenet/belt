/**
 * Domain information
 */
export interface IDomain {
  /** Domain (sld + tld), [sld].[tld] */
  domain: string;
  /**
   * The sub-domains, the less deep at the beginning
   *
   * @example a.b.c.d.e.com
   * ['d', 'c', 'b', 'a']
   */
  subdomains: string[];
}
