[![npm version](https://img.shields.io/npm/v/@aegenet/belt-string-split.svg)](https://www.npmjs.com/package/@aegenet/belt-string-split)
<br>

# @aegenet/belt-string-split

> String Split is an alternative to String.split, with the ability to ignore the split character inside 'tags'

## 💾 Installation

```shell
yarn add @aegenet/belt-string-split@^1.6.0
# or
npm i @aegenet/belt-string-split@^1.6.0
```

## 📝 Usage

```typescript
import { StringSplit } from '@aegenet/belt-string-split';

const stringSplit = new StringSplit({
  separator: ' ',
  ignoreTags: {
    '"': '"',
  },
});

stringSplit.split('Hello Brian "Something Else"');
//  ['Hello', 'Brian', '"Something Else"']

const stringSplit = new StringSplit({
  separator: ' ',
  ignoreTags: {
    '(': ')',
  },
});

stringSplit.split('Hello Brian (Something Else)');
// ['Hello', 'Brian', '(Something Else)']
stringSplit.split('Hello Brian (Something Else (or something))');
// ['Hello', 'Brian', '(Something Else (or something))']
```
