import type { bFetchOptions } from './b-fetch-options';

export const bFetchDefaultOptions: bFetchOptions = Object.seal({
  timeout: process.env.B_FETCH_TIMEOUT ? parseInt(process.env.B_FETCH_TIMEOUT, 10) : 10000,
  replaceDNSByIP: true,
});
