export type bFetchOptions = {
  /** Timeout in milliseconds */
  timeout: number;
  /** Make the request using the IP address instead of the DNS name */
  replaceDNSByIP?: boolean;
  /** DNS Map { 'github.com': '127.0.0.1' } */
  dnsMap?: Record<string, string>;
  /**
   * DNS Map as fallback or as a primary resolver
   *
   * @default true
   */
  dnsMapAsFallback?: boolean;
};
