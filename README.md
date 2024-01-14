[![npm version](https://img.shields.io/npm/v/@aegenet/belt.svg)](https://www.npmjs.com/package/@aegenet/belt)
[![Build Status](https://github.com/aegenet/belt/actions/workflows/ci.yml/badge.svg)](https://github.com/aegenet/belt/actions)
[![codecov](https://codecov.io/gh/aegenet/belt/branch/master/graph/badge.svg?token=XWMNA00XFY)](https://codecov.io/gh/aegenet/belt)
<br />

# Belt monorepo

> **Mission**: 0 dependency.
>
> The main goal of The Belt project is to provide utility libraries to solve more or less common needs, while respecting the 0 dependency.

### Tools kit

#### Browser & Node.js

| Name | Usage |
|--|--|
| [@aegenet/belt-anti-bounce](./packages/belt-anti-bounce/README.md) | Anti-bounce (`antiBounce` decorator, `AntiBounce` utility)  |
| [@aegenet/belt-array-async-filter](./packages/belt-array-async-filter/README.md) | Array async filter (sequentially) |
| [@aegenet/belt-array-async-foreach](./packages/belt-array-async-foreach/README.md) | Array async foreach (sequentially) |
| [@aegenet/belt-array-async-map](./packages/belt-array-async-map/README.md) | Array async map (sequentially) |
| [@aegenet/belt-array-duplicates](./packages/belt-array-duplicates/README.md) | Strip duplicates from array / get duplicates of an array |
| [@aegenet/belt-array-stats](./packages/belt-array-stats/README.md) | Get stats from array (`getPercentile`, `p10..90`, `getAverage`, `getMedian`, `getClosestNumber`, ...) |
| [@aegenet/belt-array-string-join](./packages/belt-array-string-join/README.md) | `stringJoin()` `stringConcat()` => Array.join() is slow, this tool helps you to join() your string array faster |
| [@aegenet/belt-array-to-obj](./packages/belt-array-to-obj/README.md) | Array to Object |
| [@aegenet/belt-base64](./packages/belt-base64/README.md) | Base64 (`toBase64`, `fromBase64`)  |
| [@aegenet/belt-benchmark](./packages/belt-benchmark/README.md) | Benchmark your functions |
| [@aegenet/belt-binary-search](./packages/belt-binary-search/README.md) | Binary search |
| [@aegenet/belt-crc32](./packages/belt-crc32/README.md) | CRC32 |
| [@aegenet/belt-crc8](./packages/belt-crc8/README.md) | CRC8 |
| [@aegenet/belt-duration](./packages/belt-duration/README.md) | Helps to convert or format durations |
| [@aegenet/belt-error](./packages/belt-error/README.md) | Error tools (`getErrorMessage`, `asError`, `isSyntaxError`, `mutateErrorWithRef`, `RefError`...)  |
| [@aegenet/belt-extract-domain](./packages/belt-extract-domain/README.md) | Extract domain informations from a host name (`a.b.c.d.com`, to `{ domain: 'd.com', subdomains: ['c', 'b', 'a'] }`) |
| [@aegenet/belt-fetch](./packages/belt-fetch/README.md) | **bFetch** is `fetch` with a default timeout and an asynchronous DNS resolver (**node only**). +fetch utility: `ensureFetch` response |
| [@aegenet/belt-hide-sensitive](./packages/belt-hide-sensitive/README.md) | Hide Sensititve data from string  (Example, small cli to hide passwords/secrets from environment variables in the console output) |
| [@aegenet/belt-hook](./packages/belt-hook/README.md) | Hook |
| [@aegenet/belt-interpolation](./packages/belt-interpolation/README.md) | String interpolation |
| [@aegenet/belt-json-ignore](./packages/belt-json-ignore/README.md) | JSON Ignore (`@jsonIgnore`)  |
| [@aegenet/belt-light-date](./packages/belt-light-date/README.md) | (Very) light `Date` tools |
| [@aegenet/belt-memory-rw](./packages/belt-memory-rw/README.md) | Memory RW helps to read/write a buffer sequentially |
| [@aegenet/belt-obj-first-key](./packages/belt-obj-first-key/README.md) | Object first key |
| [@aegenet/belt-obj-is-empty](./packages/belt-obj-is-empty/README.md) | Object is empty? |
| [@aegenet/belt-obj-is-equals](./packages/belt-obj-is-equals/README.md) | Object is equals `objectsIsEquals` ? |
| [@aegenet/belt-obj-monitoring](./packages/belt-obj-monitoring/README.md) | Object Monitoring - Watcher / Tracker |
| [@aegenet/belt-obj-to-array](./packages/belt-obj-to-array/README.md) | Object to Array |
| [@aegenet/belt-obj-to-map](./packages/belt-obj-to-map/README.md) | Object to Map |
| [@aegenet/belt-oclone](./packages/belt-oclone/README.md) | Object clone |
| [@aegenet/belt-odeep](./packages/belt-odeep/README.md) | Object Deep |
| [@aegenet/belt-odiff](./packages/belt-odiff/README.md) | Object Differences |
| [@aegenet/belt-ofields](./packages/belt-ofields/README.md) | Object fields with value as array |
| [@aegenet/belt-platform-detector](./packages/belt-platform-detector/README.md) | Is NodeJS? is Mobile Device?  |
| [@aegenet/belt-promise](./packages/belt-promise/README.md) | Promise |
| [@aegenet/belt-rows-inflator](./packages/belt-rows-inflator/README.md) | Rows Inflator, transforms SQL results into nested objects |
| [@aegenet/belt-str-escape-regex](./packages/belt-str-escape-regex/README.md) | String Escape Regex |
| [@aegenet/belt-string-split](./packages/belt-string-split/README.md) | String Split is an alternative to String.split, with the ability to ignore the split character inside 'tags' |
| [@aegenet/belt-symbols-is-balanced](./packages/belt-symbols-is-balanced/README.md) | Symbols is balanced (`[`, `(` `{`) ?  |


#### Node only

| Name | Usage |
|--|--|
| [@aegenet/belt-fastify-abort](./packages/belt-fastify-abort/README.md) | Node only - Add an AbortController on Fastify Request |
| [@aegenet/belt-readdir](./packages/belt-readdir/README.md) | Get all files from a root directory (recursively) |


# @aegenet/belt - All In One

| Name | Usage |
|--|--|
| [@aegenet/belt](./packages/belt/README.md) | The Belt - 0 dependency |


# Coverage
[![codecov](https://codecov.io/gh/aegenet/belt/branch/master/graph/badge.svg?token=XWMNA00XFY)](https://codecov.io/gh/aegenet/belt)

![Coverage sunburst](https://codecov.io/gh/aegenet/belt/branch/master/graphs/sunburst.svg?token=XWMNA00XFY)

![Coverage tree](https://codecov.io/gh/aegenet/belt/branch/master/graphs/tree.svg?token=XWMNA00XFY)


# License

[The MIT License](LICENSE) - Copyright © 2024 [Alexandre Genet](https://github.com/aegenet).
