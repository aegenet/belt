[![npm version](https://img.shields.io/npm/v/@aegenet/belt-json-ignore.svg)](https://www.npmjs.com/package/@aegenet/belt-json-ignore)
<br>

# @aegenet/belt-json-ignore

> `@jsonIgnore` decorator for TypeScript classes to ignore fields when serializing to JSON.

**Note**: `Stage 3` decorator *(for stage 2, you can use an older version (< 2.0.0) of this package)*.

## 💾 Installation

```shell
yarn add @aegenet/belt-json-ignore@^2.0.0
# or
npm i @aegenet/belt-json-ignore@^2.0.0
```

## 📝 Usage

```typescript
import { jsonIgnore } from '@aegenet/belt-json-ignore';

class MyClass {
  @jsonIgnore
  public mySubPrivateField: string = 'abcdefg';
  public something: string = 'ok';
}

const instance = new MyClass();
JSON.stringify(instance); // '{"something":"ok"}'
```
