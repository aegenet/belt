[![npm version](https://img.shields.io/npm/v/@aegenet/belt-binary-search.svg)](https://www.npmjs.com/package/@aegenet/belt-binary-search)
<br>

# @aegenet/belt-binary-search

> Binary search

```typescript
import { binarySearch } from '@aegenet/belt-binary-search';

binarySearch(
  [1, 2, 3],
  2,
  (a, b) => a - b)
)
```
```javascript
// Result
{ index: 1, value: 2 }
```


```typescript
const sample = ['Arti', 'Morti', 'Lorti', 'Yolo', 'Yalo', 'Yago', 'Iago', 'Zorro', 'Nor', 'Aru', 'Guru'].sort();

binarySearch<string>(sample, 'Arti', (a, b) => a.localeCompare(b));
```
```javascript
// Result
{ index: 0, value: 'Arti' }
```


```typescript
const sample = [
  {
    id: 1,
    code: 'Arti',
  },
  /** ... */
  {
    id: 11,
    code: 'Guru',
  },
].sort();

binarySearch<{ id: number; code?: string }>(
  sample,
  { id: 1 },
  (a, b) => a.id - b.id
);
```
```javascript
// Result
{ index: 0, value: { id: 1, code: 'Arti' } }
```
