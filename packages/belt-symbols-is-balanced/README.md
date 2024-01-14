[![npm version](https://img.shields.io/npm/v/@aegenet/belt-symbols-is-balanced.svg)](https://www.npmjs.com/package/@aegenet/belt-symbols-is-balanced)
<br>

# @aegenet/belt-symbols-is-balanced

> Symbols is balanced (`[`, `(` `{`) ?

## 💾 Installation

```shell
yarn add @aegenet/belt-symbols-is-balanced@^1.2.0
# or
npm i @aegenet/belt-symbols-is-balanced@^1.2.0
```

## 📝 Usage

```typescript
import { symbolsIsBalanced } from '@aegenet/belt-symbols-is-balanced';

symbolsIsBalanced('( { [ () [] ] } )') // true
symbolsIsBalanced('( { [ ') // false

symbolsIsBalanced('( 1 === 1 )') // true
symbolsIsBalanced('( (1 === 1) )') // true
symbolsIsBalanced('( ([1] === [1]) )') // true
symbolsIsBalanced('( ([1] {===} [1]) )') // true

symbolsIsBalanced('( /* (( */ )') // true
```
