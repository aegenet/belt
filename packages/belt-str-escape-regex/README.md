[![npm version](https://img.shields.io/npm/v/@aegenet/belt-str-escape-regex.svg)](https://www.npmjs.com/package/@aegenet/belt-str-escape-regex)
<br>

# @aegenet/belt-str-escape-regex

> Escape String RegExp

*Fork of https://github.com/sindresorhus/escape-string-regexp/ (this project, unfortunately, does not work well with TypeScript)*

## 💾 Installation

```shell
yarn add @aegenet/belt-str-escape-regex@^2.0.0
# or
npm i @aegenet/belt-str-escape-regex@^2.0.0
```

## 📝 Usage


```typescript
import { escapeRegex } from '@aegenet/belt-str-escape-regex';

const result = escapeRegex('Hello');
// result = 'Hello'
```

```typescript
const result = escapeRegex('Hell{o} [you]');
// result = 'Hell\{o\} \[you\]'
```

```typescript
const result = escapeRegex('');
// result = ''
```

```typescript
const result = escapeRegex(null);
// throw Error 'Invalid usage: argument provided is not a string.'
```

```typescript
const result = escapeRegex(undefined);
// throw Error 'Invalid usage: argument provided is not a string.'
```
