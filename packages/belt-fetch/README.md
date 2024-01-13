# @aegenet/belt-fetch

> Belt fetch

## `bFetch`

**bFetch** is `fetch` with:
- a configurable timeout *(default 10 seconds)*
- (**node only**) an asynchronous DNS resolver: by default, native fetch uses a synchronous DNS resolver*, which can potentially block your entire Node.js process.

> *Though the call to dns.lookup() will be asynchronous from JavaScript's perspective, it is implemented as a synchronous call to getaddrinfo(3) that runs on libuv's threadpool. This can have surprising negative performance implications for some applications, see the UV_THREADPOOL_SIZE documentation for more information.*

**Important**: there is a drawback; the DNS is not resolved in the same way as `dns.lookup`. For example, the host file is not taken into account.

For more informations: https://nodejs.org/api/dns.html#implementation-considerations

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
