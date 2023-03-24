# @aegenet/belt-fastify-abort

Auto add an AbortController on all Fastify Request

> Node only!

### Node.js

```typescript
import { fastifyAbortRegister, type FastifyRequestAbortCtrl } from '@aegenet/belt-fastify-abort';
import fastify from 'fastify';

const app = fastify();
// register the fastify abort
fastifyAbortRegister(app);

fastify.post('/api/random', async (request: FastifyRequestAbortCtrl, reply) => {
  // AbortController is available in abortCtrl
  assert.ok(request.abortCtrl);

  /** your code */
  reply.code(200).send({});
});
```
