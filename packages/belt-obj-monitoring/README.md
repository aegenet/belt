[![npm version](https://img.shields.io/npm/v/@aegenet/belt-obj-monitoring.svg)](https://www.npmjs.com/package/@aegenet/belt-obj-monitoring)
<br>

# @aegenet/belt-obj-monitoring

> Object Monitoring

## 💾 Installation

```shell
yarn add @aegenet/belt-obj-monitoring@^2.0.0
# or
npm i @aegenet/belt-obj-monitoring@^2.0.0
```

## 📝 Usage

**Two ways:**
- One that mutates your original object (and you can use it normally): `mutate`.
- One that uses a proxy to access your original object. You must use the proxy, not the original object: `asProxy`.

### With Mutation

- **Caution**: this mutates your data.
- **Limitation**: if a property is added to the original data, we cannot track it.

```typescript
import { ObjectMonitoring } from '@aegenet/belt-obj-monitoring';

const objMonitor = new ObjectMonitoring({
  callback: result => console.table(result),
});

const data = {
  title: 'Boris',
  description: 'Oromov',
};

const token = objMonitor.mutate(data);

data.title = 'Maurice';
// console.table({
//   newValue: 'Maurice',
//   oldValue: 'Boris',
//   path: 'title',
//   property: 'title',
// })

// We remove all listeners
token.dispose();

// Any next changes are not monitored
data.title = 'Maurice2';
```


### With Proxy

- **Limitation**: You must use the proxied data, not the original data.

```typescript
import { ObjectMonitoring } from '@aegenet/belt-obj-monitoring';

const objMonitor = new ObjectMonitoring({
  callback: result => console.table(result),
});

const data = {
  title: 'Boris',
  description: 'Oromov',
};

const proxyData = objMonitor.mutate(data);

proxyData.title = 'Maurice';
// console.table({
//   newValue: 'Maurice',
//   oldValue: 'Boris',
//   path: 'title',
//   property: 'title',
// })


// Changes to the original data are not monitored
data.title = 'Maurice2';
```