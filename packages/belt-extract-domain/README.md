[![npm version](https://img.shields.io/npm/v/@aegenet/belt-extract-domain.svg)](https://www.npmjs.com/package/@aegenet/belt-extract-domain)
<br>

# @aegenet/belt-extract-domain

> Extract domain informations

## 💾 Installation

```shell
yarn add @aegenet/belt-extract-domain@^1.4.0
# or
npm i @aegenet/belt-extract-domain@^1.4.0
```

## 📝 Usage

```typescript
import { extractDomain } from '@aegenet/belt-extract-domain';

extractDomain(undefined)
// null

extractDomain(undefined)
// null

extractDomain('aaa.ooo.com')
// {
//   domain: 'ooo.com',
//   subdomains: [],
// }

extractDomain('aaa.ooo.com')
// {
//   domain: 'ooo.com',
//   subdomains: ['aaa'],
// }

extractDomain('deeper.aaa.ooo.com')
// {
//   domain: 'ooo.com',
//   subdomains: ['aaa', 'deeper'],
// }
```
