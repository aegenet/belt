[![npm version](https://img.shields.io/npm/v/@aegenet/belt-array-duplicates.svg)](https://www.npmjs.com/package/@aegenet/belt-array-duplicates)
<br>

# @aegenet/belt-array-duplicates

> Strip duplicates from array / get duplicates of an array.

## 💾 Installation

```shell
yarn add @aegenet/belt-array-duplicates@^2.0.0
# or
npm i @aegenet/belt-array-duplicates@^2.0.0
```

## 📝 Usage

### getDuplicates

```typescript
import { getDuplicates } from '@aegenet/belt-array-duplicates';

const results = getDuplicates([1, 1, 2]);
// results = [1]
```

```typescript
const results = getDuplicates([1, 1, 2, 3, 4, 4]);
// results = [1, 4]
```

### stripDuplicates

```typescript
import { stripDuplicates } from '@aegenet/belt-array-duplicates';

const results = stripDuplicates([{ id: 1 }, { id: 1 }, { id: 2 }], {
  compare: (a, b) => a.id === b.id,
  sorted: true,
}),
// results = [{ id: 1 }, { id: 2 }]
```

```typescript
const a = { id: 1 };
const b = { id: 2 };
const results = stripDuplicates([a, a, b]),
// results = [{ id: 1 }, { id: 2 }]
```
