[![npm version](https://img.shields.io/npm/v/@aegenet/belt-json-ignore.svg)](https://www.npmjs.com/package/@aegenet/belt-json-ignore)
<br>

# @aegenet/belt-json-ignore

> `@jsonIgnore` decorator

## 💾 Installation

```shell
yarn add @aegenet/belt-json-ignore@^1.6.0
# or
npm i @aegenet/belt-json-ignore@^1.6.0
```

## 📝 Usage

```typescript
import { jsonIgnore } from '@aegenet/belt-json-ignore';

class MyClass {
  @jsonIgnore
  public declare mySubPrivateField: string;
  public something: string = 'ok';

  constructor() {
    this.mySubPrivateField = 'abcdefg';
  }
}

const instance = new MyClass();
JSON.stringify(instance); // '{"something":"ok"}'
```
