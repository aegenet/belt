[![npm version](https://img.shields.io/npm/v/@aegenet/belt-error.svg)](https://www.npmjs.com/package/@aegenet/belt-error)
<br>

# @aegenet/belt-error

> Error tools

## 💾 Installation

```shell
yarn add @aegenet/belt-error@^1.2.0
# or
npm i @aegenet/belt-error@^1.2.0
```

## 📝 Usage

### asError

```typescript
import { asError, isSyntaxError } from '@aegenet/belt-error';

asError({ message: 'Toto', statusText: 'Yolo' }); // instanceof Error
```

### isSyntaxError

```typescript
import { isSyntaxError } from '@aegenet/belt-error';

isSyntaxError(new SyntaxError('Toto')); // true

isSyntaxError(new Error('Toto')); // false
```

### mutateErrorWithRef, RefError

```typescript
import { mutateErrorWithRef, RefError } from '@aegenet/belt-error';
const error = new Error('An error!');
/* const mutateError: RefError = */ mutateErrorWithRef(error);
// mutateError === error

(error as RefError).refError; // E-XXXXXXX
(error as RefError).message;  // E-XXXXXXX - [message]
// Beware `message` and `stack` are not enumerable in Error object
Object.keys(error); // ['refError']


// You can set (danger zone) the properties as enumerable:
const error = new Error('An error!', {
  setAsEnumerable: true,
});
(error as RefError).refError; // E-XXXXXXX
(error as RefError).message;  // E-XXXXXXX - [message]

Object.keys(error); // ['stack', 'message', 'refError']
```

### getErrorMessage

```typescript
import { getErrorMessage } from '@aegenet/belt-error';

getErrorMessage(new Error('An error!')); // 'An error!'
getErrorMessage('An error!'); // 'An error!'
getErrorMessage({ message: 'An error!' }); // 'An error!'
getErrorMessage({ error: 'An error!' }, 'error'); // 'An error!'
getErrorMessage({ error: { message: 'An error!' } }, 'error'); // 'An error!'
```
