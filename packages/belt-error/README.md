# @aegenet/belt-error

> Error tools

## asError

```typescript
import { asError, isSyntaxError } from '@aegenet/belt-error';

asError({ message: 'Toto', statusText: 'Yolo' }); // instanceof Error
```

## isSyntaxError

```typescript
import { isSyntaxError } from '@aegenet/belt-error';

isSyntaxError(new SyntaxError('Toto'))); // true

isSyntaxError(new Error('Toto'))); // false
```

## mutateErrorWithRef, RefError

```typescript
import { mutateErrorWithRef, RefError } from '@aegenet/belt-error';
const error = new Error('An error!');
/* const mutateError: RefError = */ mutateErrorWithRef(error);
// mutateError === error

(error as RefError).refError; // E-XXXXXXX
(error as RefError).message;  // E-XXXXXXX - [message]
```

## getErrorMessage

```typescript
import { getErrorMessage } from '@aegenet/belt-error';

getErrorMessage(new Error('An error!')); // 'An error!'
getErrorMessage('An error!'); // 'An error!'
getErrorMessage({ message: 'An error!' }); // 'An error!'
getErrorMessage({ error: 'An error!' }, 'error'); // 'An error!'
getErrorMessage({ error: { message: 'An error!' } }, 'error'); // 'An error!'
```
