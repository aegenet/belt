# @aegenet/belt-interpolation

> Simple ECMAScript Interpolation

```typescript
import { Interpolation, transform } from '@aegenet/belt-interpolation';

const interpolation = new Interpolation();
transform('Hello ${name}', {
  name: 'David',
});
// 'Hello David'
```

```typescript
transform('Hello ${firstName} ${lastName}', {
  firstName: 'David',
  lastName: 'Goodenough',
});
// 'Hello David Goodenough'
```

```typescript
interpolation.transform('Hello ${firstName} ${lastName}', {
  firstName: 'David',
  lastName: null,
});
'Hello David '
```

```typescript
transform('Hello ${firstName} ${lastName}', {
  firstName: 'David',
});
// 'Hello David '
```

```typescript
const interpolation = new Interpolation({
  customDialects: {
    spider: /(\\{0,1})¤¤([a-zA-Z0-9_\-]{1,})¤¤/,
  },
});
interpolation.transform(
  'Hello ¤¤firstName¤¤ ¤¤lastName¤¤',
  {
    firstName: 'David',
    lastName: 'Goodenough',
  },
  { dialect: 'spider' }
);
// 'Hello David Goodenough'
```
