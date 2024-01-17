export type bFetchOptions = {
  /**
   * Timeout in milliseconds
   *
   * @default 10000
   *
   * @kind Browser/Node.js
   */
  timeout?: number;
  /**
   * Make the request using the IP address instead of the DNS name
   *
   * @kind Browser/Node.js
   */
  replaceDNSByIP?: boolean;
  /**
   * DNS Map { 'github.com': '127.0.0.1' }
   *
   * @kind Browser/Node.js
   */
  dnsMap?: Record<string, string>;
  /**
   * DNS Map as fallback or as a primary resolver
   *
   * @default true
   *
   * @kind Node.js
   */
  dnsMapAsFallback?: boolean;
  /**
   * DNS Cache TTL (ms)
   *
   * @default 0
   *
   * @kind Node.js
   */
  dnsCacheTTL?: number;
};
