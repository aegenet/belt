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
