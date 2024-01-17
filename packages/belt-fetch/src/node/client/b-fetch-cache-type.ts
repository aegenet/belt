export type bFetchCacheType = Map<
  string,
  {
    ips: string[];
    ttl: number;
  }
>;
