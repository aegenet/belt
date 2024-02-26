[![npm version](https://img.shields.io/npm/v/@aegenet/belt-oclone.svg)](https://www.npmjs.com/package/@aegenet/belt-oclone)
<br>

# @aegenet/belt-oclone

> Simple clone

## 💾 Installation

```shell
yarn add @aegenet/belt-oclone@^1.4.0
# or
npm i @aegenet/belt-oclone@^1.4.0
```

## 📝 Usage

```typescript
import { oclone } from '@aegenet/belt-oclone';

const clone = oclone({
  id: 5,
}),
// clone ={
//  id: 5,
// }
```

```typescript
const myClass = class {
  id = 5;
  method() {
    return 'ha';
  }
};
const source = new myClass();

const clone = oclone(source/*, { keepType: false }*/);
// clone ={
//  id: 5,
// }

clone.method(); // throw error
```

```typescript
const myClass = class {
  id = 5;
  method() {
    return 'ha';
  }
};
const source = new myClass();

const clone = oclone(source, { keepType: true });
// clone ={
//  id: 5,
//  method: () => void
// }

clone.method(); // 'ha'
```