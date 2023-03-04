# @aegenet/belt-odeep

> odeep brings tools to set and get values with a string path.

### Get

```typescript
import { ODeepGet } from '@aegenet/belt-odeep';

const oDeepGet = new ODeepGet();
const result = oDeepGet.getValue({
  a: 1
}, ['a']);  // 1

const result = oDeepGet.getValue({
  a: {
    b: 1
  }
}, ['a', 'b']);  // 1

const result = oDeepGet.getValue({
  a: {
    b: {
      c: [1, 2, 3]
    }
  }
}, ['a', 'b', 'c']);  // [1, 2, 3]


const result = oDeepGet.getValue({
  a: {
    b: {
      c: [1, 2, 3]
    }
  }
}, ['a', 'b', 'c', 0]);  // 1

///////W
// !!! Warning, getValue is not safe by default (performance)
///////W
const result = oDeepGet.getValue({
  a: 1
}, ['a', 'toString']);  // Function toString

const result = oDeepGet.getValue({
  a: 1
}, ['a', 'toString'], {
  safer: true
});  // throw an Error

const result = oDeepGet.getValue({
  a: 1
}, ['a', 'toString'], {
  safer: true,
  shallowError: true,
});  // undefined
```

### Set

```typescript
import { ODeepSet } from '@aegenet/belt-odeep';
const oDeepSet = new ODeepSet();
```

```typescript
const ctx: {
  a?: number;
} = {};

oDeepSet.setValue(ctx, ['a'], 1);
// ctx.a = 1
```


```typescript
const context = [/** a lot of things */];

const setPath = ['a', 'b', 'c'];
const importantStuff = { e: 'z' };

for (let i = 0; i < context.length; i++) {
  // memoize is important for performance: same path a lot of times
  oDeepSet.setValue(context[i], setPath, importantStuff, { memoize: true, autoCreate: true });
}

// You can clear the cache
oDeepSet.clear();
```