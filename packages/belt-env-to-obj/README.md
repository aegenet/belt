[![npm version](https://img.shields.io/npm/v/@aegenet/belt-env-to-obj.svg)](https://www.npmjs.com/package/@aegenet/belt-env-to-obj)
<br>

# @aegenet/belt-env-to-obj

Combine multiple environment variables into one JS object.

## 💾 Installation

```shell
yarn add @aegenet/belt-env-to-obj@^2.0.0
# or
npm i @aegenet/belt-env-to-obj@^2.0.0
```

## 📝 Usage

### Common

```typescript
import { env } from 'node:process';
import { envToObject } from '@aegenet/belt-env-to-obj';

// { NAME: 'John', AGE: '25', IS_OK: 'true' }
const result = envToObject(env);
//=> { NAME: 'John', AGE: 25, IS_OK: true }
```

### Properties type

We automatically convert the value to `number` or `boolean` if possible.

| Type | Env value | Result Type | Result value |
| --- | --- | --- | --- |
| string | `true` | boolean | `true` |
| string | `false` | boolean | `false` |
| string | `25` | number | `25` |
| string | `Something` | string | `Something` |
| string | `'25'` | string | `25` |
| string | `'true'` | string | `true` |
| string | `"25"` | string | `"25"` |
| string | `"true"` | string | `"true"` |


### Nested object

```ts
// Default delimiter is '__' (double underscore)
const config = envToObject(
  {
    BELT__CONTACT__NAME: 'John',
    BELT__CONTACT__AGE: '25',
    BELT__CONTACT__IS_OK: 'true',
  },
  {
    convertKey: key => key.toLowerCase(),
  }
);
// config => { belt: { contact: { name: 'John', age: 25, is_ok: true } } }
```

```ts
// With a custom delimiter '.'
const config = envToObject(
  {
    'BELT.CONTACT.NAME': 'John',
    'BELT.CONTACT.AGE': '25',
  },
  {
    convertKey: key => key.toLowerCase(),
    nestedDelimiter: '.',
  }
);
// config => { belt: { contact: { name: 'John', age: 25 } } }
```

```ts
// With a custom delimiter RegExp
const config = envToObject(
  {
    'BELT.CONTACT_NAME': 'John',
    'BELT.CONTACT@AGE': '25',
  },
  {
    convertKey: key => key.toLowerCase(),
    // Every non-alphanumeric character
    nestedDelimiter: /[^a-zA-Z0-9]/,
  }
);
// config => { belt: { contact: { name: 'John', age: 25 } } }
```
