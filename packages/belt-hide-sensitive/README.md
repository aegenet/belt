[![npm version](https://img.shields.io/npm/v/@aegenet/belt-hide-sensitive.svg)](https://www.npmjs.com/package/@aegenet/belt-hide-sensitive)
<br>

# @aegenet/belt-hide-sensitive

> Hide Sensititve data from string

## 💾 Installation

```shell
yarn add @aegenet/belt-hide-sensitive@^1.6.0
# or
npm i @aegenet/belt-hide-sensitive@^1.6.0
```

## 📝 Usage

Example, small cli to hide passwords/secrets from environment variables in the console output.

```typescript
// ./hide-out-cli.js

import { createHideSensitiveFunction } from '@aegenet/belt-hide-sensitive';

const hideFunction = createHideSensitiveFunction(process.env);

process.stdin.on('data', data => process.stdout.write(hideFunction(data.toString())));
```

Usage: ./somethingWithSensitive.sh 2>&1 /dev/null | node ./hide-out-cli
