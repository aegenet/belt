# @aegenet/belt-extract-domain

> Extract domain informations

```typescript
import { extractDomain } from '@aegenet/belt-extract-domain';

belt-extract-domainextractDomain(undefined)
// null

belt-extract-domainextractDomain(undefined)
// null

belt-extract-domainextractDomain('aaa.zzz.com')
// {
//   domain: 'zzz.com',
//   subdomains: [],
// }

belt-extract-domainextractDomain('aaa.zzz.com')
// {
//   domain: 'zzz.com',
//   subdomains: ['aaa'],
// }

belt-extract-domainextractDomain('aaa.zzz.com')
// {
//   domain: 'zzz.com',
//   subdomains: ['aaa', 'deeper'],
// }
```
