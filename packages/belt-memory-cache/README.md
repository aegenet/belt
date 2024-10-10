[![npm version](https://img.shields.io/npm/v/@aegenet/belt-memory-cache.svg)](https://www.npmjs.com/package/@aegenet/belt-memory-cache)
<br>

# @aegenet/belt-memory-cache

> Basic memory cache with TTL

## 💾 Installation

```shell
yarn add @aegenet/belt-memory-cache@^2.0.0
# or
npm i @aegenet/belt-memory-cache@^2.0.0
```

## 📝 Usage

```typescript
import { MemoryCache } from '@aegenet/belt-memory-cache';

const cache = new MemoryCache({
  // The interval in minutes at which the cache will be cleaned up. -> default: 5
  cleanupIntervalMinutes: 5,
  // If true, values will be cloned before being stored in the cache. -> default: true
  cloneValues: true,
});
// The cache will remove all expired items every 5 minutes
cache.start();

cache.set('key', 'value', 1); // 1000ms
cache.get('key'); // 'value'

await setTimeout(1000);

cache.get('key'); // undefined

// Stop the cache cleanup
cache.stop();
```
