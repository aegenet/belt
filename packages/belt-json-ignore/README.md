[![npm version](https://img.shields.io/npm/v/@aegenet/belt-json-ignore.svg)](https://www.npmjs.com/package/@aegenet/belt-json-ignore)
<br>

# @aegenet/belt-json-ignore

> `@jsonIgnore` decorator

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
