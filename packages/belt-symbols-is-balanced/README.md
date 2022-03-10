# @aegenet/belt-symbols-is-balanced

> Symbols is balanced (`[`, `(` `{`) ?

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
