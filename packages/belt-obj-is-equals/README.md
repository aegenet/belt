[![npm version](https://img.shields.io/npm/v/@aegenet/belt-obj-is-equals.svg)](https://www.npmjs.com/package/@aegenet/belt-obj-is-equals)
<br>

# @aegenet/belt-obj-is-equals

> Objects is equals?

## 💾 Installation

```shell
yarn add @aegenet/belt-obj-is-equals@^1.6.0
# or
npm i @aegenet/belt-obj-is-equals@^1.6.0
```

## 📝 Usage

```typescript
import { objectsIsEquals } from '@aegenet/belt-obj-is-equals';

objectsIsEquals(null, null); // true
objectsIsEquals(null, {}); // false

objectsIsEquals(new Date(2022, 1, 1, 1, 1), new Date(2022, 1, 1, 1, 1)); // true
objectsIsEquals(new Date(2022, 1, 1, 1, 1), new Date(2023, 1, 1, 1, 1)); // false

objectsIsEquals({ a: 1 }, { a: 1 }); // true
objectsIsEquals({ a: 1 }, { a: 2 }); // false

objectsIsEquals(1, 1); // true
objectsIsEquals(1, 2); // false

objectsIsEquals('abcd', 'abcd'); // true
objectsIsEquals('abcd', 'abcdefg'); // false
```

> isRecord ?

```typescript
import { isRecord } from '@aegenet/belt-obj-is-equals';

isRecord(null); // false
isRecord(undefined); // false
isRecord({}); // true
isRecord({ id: 1 }); // true
isRecord({ id: 1, code: 'go' }); // true
isRecord(new Date(2015)); //  false
isRecord(2015); // false
isRecord('abcdefg'); // false
```
