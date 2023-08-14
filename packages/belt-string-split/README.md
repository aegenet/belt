# @aegenet/belt-string-split

String Split is an alternative to String.split, with the ability to ignore the split character inside 'tags'

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
