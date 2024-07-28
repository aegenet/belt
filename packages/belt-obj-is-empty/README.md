[![npm version](https://img.shields.io/npm/v/@aegenet/belt-obj-is-empty.svg)](https://www.npmjs.com/package/@aegenet/belt-obj-is-empty)
<br>

# @aegenet/belt-obj-is-empty

> Object is empty?

## 💾 Installation

```shell
yarn add @aegenet/belt-obj-is-empty@^1.6.0
# or
npm i @aegenet/belt-obj-is-empty@^1.6.0
```

## 📝 Usage

```typescript
import { objectIsEmpty } from '@aegenet/belt-obj-is-empty';

objectIsEmpty(null); // true;
objectIsEmpty(undefined); // true
objectIsEmpty({}); // true
objectIsEmpty({ id: 1 }); // false
objectIsEmpty({ id: 1, code: 'go' }); // false
```
