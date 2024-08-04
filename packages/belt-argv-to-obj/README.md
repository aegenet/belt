[![npm version](https://img.shields.io/npm/v/@aegenet/belt-argv-to-obj.svg)](https://www.npmjs.com/package/@aegenet/belt-argv-to-obj)
<br>

# @aegenet/belt-argv-to-obj

Convert an array of command line arguments (argv) to an object.

## 💾 Installation

```shell
yarn add @aegenet/belt-argv-to-obj@^2.0.0
# or
npm i @aegenet/belt-argv-to-obj@^2.0.0
```

## 📝 Usage

### Common

```typescript
import { argvToObject } from '@aegenet/belt-argv-to-obj';

const argv = ['--name', 'John', '--age', '25', '--include', 'hello', '--include', 'world'];
// OR ['--name=John', '--age=25', '--include=hello', '--include=world'];
const result = argvToObject(argv);
//=> { name: 'John', age: 25, include: ['hello', 'world'] }
```

### Node.js

```typescript
import { argv } from 'node:process';
import { argvToObject } from '@aegenet/belt-argv-to-obj';

// --name John --age 25
const result = argvToObject(argv.slice(2));
//=> { name: 'John', age: 25 }
```

## Syntax

### Empty

- `` -> `{}` (empty object)

### String

- `--key value` -> `{ key: value }`
- `--key=value` -> `{ key: value }`
- `--key='value'` -> `{ key: 'value' }`
- `--key="value"` -> `{ key: 'value' }`

- `--key='25'` -> `{ key: '25' }`
- `--key="25"` -> `{ key: "25" }`

- `--keyOne="value"` -> `{ keyOne: 'value' }`
- `--key-one="value"` -> `{ 'key-one': 'value' }`

### Number

- `--key=25` -> `{ key: 25 }` (number)

### Boolean

- `--key=true` -> `{ key: true }`
- `--key` -> `{ key: true }`

### Array

- `--key="abc" --key="def"` -> `{ key: ['abc', 'def'] }`