[![npm version](https://img.shields.io/npm/v/@aegenet/belt-extract-domain.svg)](https://www.npmjs.com/package/@aegenet/belt-extract-domain)
<br>

# @aegenet/belt-extract-domain

> Extract domain informations

```typescript
import { extractDomain } from '@aegenet/belt-extract-domain';

extractDomain(undefined)
// null

extractDomain(undefined)
// null

extractDomain('aaa.zzz.com')
// {
//   domain: 'zzz.com',
//   subdomains: [],
// }

extractDomain('aaa.zzz.com')
// {
//   domain: 'zzz.com',
//   subdomains: ['aaa'],
// }

extractDomain('deeper.aaa.zzz.com')
// {
//   domain: 'zzz.com',
//   subdomains: ['aaa', 'deeper'],
// }
```
