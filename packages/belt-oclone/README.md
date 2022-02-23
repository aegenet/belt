# @aegenet/belt-oclone

> Simple clone

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