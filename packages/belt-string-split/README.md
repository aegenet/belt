# @aegenet/belt-string-split

String Split is an alternative to String.split, with the ability to ignore the split character inside 'tags'

```typescript
import { stringSplit } from '@aegenet/belt-string-split';

stringSplit('Hello Brian "Something Else"', {
  separator: ' ',
  ignoreTags: {
    '"': '"',
  },
});
//  ['Hello', 'Brian', '"Something Else"']

stringSplit('Hello Brian (Something Else (or something))', {
  separator: ' ',
  ignoreTags: {
    '(': ')',
  },
});
// ['Hello', 'Brian', '(Something Else (or something))']
```
