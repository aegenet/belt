[![npm version](https://img.shields.io/npm/v/@aegenet/belt-ofields.svg)](https://www.npmjs.com/package/@aegenet/belt-ofields)
<br>

# @aegenet/belt-ofields

> Object fields, retrieve fields (and values) of an object

## 💾 Installation

```shell
yarn add @aegenet/belt-ofields@^1.6.0
# or
npm i @aegenet/belt-ofields@^1.6.0
```

## 📝 Usage

```typescript
import { ofields } from '@aegenet/belt-ofields';

const result = ofields({ id: 5 }, { fields: ['id'] });
// result = [['id', 5]]
```

```typescript
const result = odiff({
  id: 5,
  code: 'Trotro',
  another: 1,
}, { fields: ['id', 'code'] });
// result = [
//   ['id', 5],
//   ['code', 'Trotro'],
// ]
```
