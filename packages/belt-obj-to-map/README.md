[![npm version](https://img.shields.io/npm/v/@aegenet/belt-obj-to-map.svg)](https://www.npmjs.com/package/@aegenet/belt-obj-to-map)
<br>

# @aegenet/belt-obj-to-map

> Object to Map

## 💾 Installation

```shell
yarn add @aegenet/belt-obj-to-map@^1.4.0
# or
npm i @aegenet/belt-obj-to-map@^1.4.0
```

## 📝 Usage

```typescript
import { objectToMap } from '@aegenet/belt-obj-to-map';

objectToMap(null).size // 0

objectToMap(undefined).size // 0

objectToMap({}).size // 0

const map = objectToMap({ id: 1 });
// map.size => 1
// map.has('id') => true
// map.get('id') => 1

const instance = new (class {
  id = 1;
})();
const map = objectToMap(instance);
// map.size => 1
// map.has('id') => true
// map.get('id') => 1
```
