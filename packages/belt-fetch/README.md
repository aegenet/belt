[![npm version](https://img.shields.io/npm/v/@aegenet/belt-fetch.svg)](https://www.npmjs.com/package/@aegenet/belt-fetch)
<br>

# @aegenet/belt-fetch

> Belt fetch

## 💾 Installation

```shell
yarn add @aegenet/belt-fetch@^2.0.0
# or
npm i @aegenet/belt-fetch@^2.0.0
```

## `bFetch`

### Why?

**bFetch** is `fetch` with:
- a configurable timeout *(default 10 seconds)*
- (**node only**) an asynchronous DNS resolver: by default, native fetch uses a synchronous DNS resolver*, which can potentially block your entire Node.js process.

> *Though the call to dns.lookup() will be asynchronous from JavaScript's perspective, it is implemented as a synchronous call to getaddrinfo(3) that runs on libuv's threadpool. This can have surprising negative performance implications for some applications, see the UV_THREADPOOL_SIZE documentation for more information.*

**Important**: there is a drawback; the DNS is not resolved in the same way as `dns.lookup`. For example, the host file is not taken into account.

For more informations: https://nodejs.org/api/dns.html#implementation-considerations

### Basic usage

```typescript
import { bFetch, fetchEnsure } from '@aegenet/belt-fetch';

const response = await bFetch('https://jsonplaceholder.typicode.com/todos/1');
const results = await fetchEnsure(response);
// ->
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
```

### DNS Cache

```typescript
import { bFetch, fetchEnsure } from '@aegenet/belt-fetch';

const response = await bFetch('https://jsonplaceholder.typicode.com/todos/1', {
  dnsCacheTTL: 10000
});
const results = await fetchEnsure(response);
// ->
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
```

### Custom DNS resolution

```typescript
import { bFetch, fetchEnsure } from '@aegenet/belt-fetch';

const resp = await bFetch(
  'http://dontexistbutmapped:3030/text',
  {},
  {
    timeout: 200,
    replaceDNSByIP: true,
    dnsMapAsFallback: true,
    dnsMap: {
      dontexistbutmapped: '127.0.0.1',
    },
  }
);
// resp.status 200 (Hello World!)
```

```typescript
import { bFetch, fetchEnsure } from '@aegenet/belt-fetch';

const resp = await bFetch(
  'http://github.com:3030/text',
  {},
  {
    timeout: 200,
    replaceDNSByIP: true,
    /** Not as a fallback, but as a primary resolver */
    dnsMapAsFallback: false,
    dnsMap: {
      'github.com': '127.0.0.1',
    },
  }
);
// resp.status 200 (Hello World!)
```

### API

```typescript
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
```

## `fetchEnsure`

The purpose of this function is simply to ensure that the fetch response is OK and then format the response according to the content-type.

```typescript
import { fetchEnsure } from '@aegenet/belt-fetch';

const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
const results = await fetchEnsure(response);
// ->
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
```
