[![npm version](https://img.shields.io/npm/v/@aegenet/belt-obj-first-key.svg)](https://www.npmjs.com/package/@aegenet/belt-obj-first-key)
<br>

# @aegenet/belt-obj-first-key

> Object first key

## 💾 Installation

```shell
yarn add @aegenet/belt-obj-first-key@^1.6.0
# or
npm i @aegenet/belt-obj-first-key@^1.6.0
```

## 📝 Usage

```typescript
import { objectFirstKey } from '@aegenet/belt-obj-first-key';

objectFirstKey(null); // null;
objectFirstKey(undefined); // null
objectFirstKey({}); // null
objectFirstKey({ id: 1 }); // 'id'
objectFirstKey({ id: 1, code: 'go' }); // 'id'

objectFirstKey({ _privateStuff: true, id: 1, code: 'go' }, key => !key.startsWith('_')); // 'id'
```
