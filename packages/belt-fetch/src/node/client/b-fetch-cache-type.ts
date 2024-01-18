export type bFetchCacheType = Map<
  string,
  {
    /** ips */
    ips: string[];
    /** expires at */
    eAt: number;
  }
>;
