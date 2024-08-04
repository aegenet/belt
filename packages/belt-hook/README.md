[![npm version](https://img.shields.io/npm/v/@aegenet/belt-hook.svg)](https://www.npmjs.com/package/@aegenet/belt-hook)
<br>

# @aegenet/belt-hook

> Hook function -> Not for production use! TESTS ONLY!

## 💾 Installation

```shell
yarn add @aegenet/belt-hook@^2.0.0
# or
npm i @aegenet/belt-hook@^2.0.0
```

## 📝 Usage

```typescript
import { hook } from '@aegenet/belt-hook';

/** context: { inc: () => void } */

const token = hook({
  context,
  name: 'inc',
  beforeCall: data => {
    /** Do something */
  },
  afterCall: data => {
    /** Do Something */
  },
});

context.inc(); /** beforeCall() -> inc() -> afterCall()  */

token.dispose();
```
