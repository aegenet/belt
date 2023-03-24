import * as assert from 'node:assert';
import fastify from 'fastify';
import { fastifyAbortRegister, type FastifyRequestAbortCtrl } from '../node';
import { connect } from 'net';
import { promisify } from 'node:util';

describe('fastify-abort/node', () => {
  it('get', async () => {
    const app = fastify();
    try {
      fastifyAbortRegister(app);

      app.get('/api/random', (req: FastifyRequestAbortCtrl, reply) => {
        assert.ok(req.abortCtrl);
        assert.ok(req.abortCtrl.signal);
        assert.ok(!req.abortCtrl.signal.aborted);
        return { ok: true };
      });

      const response = await app.inject({
        method: 'GET',
        url: '/api/random',
      });
      assert.strictEqual(response.statusCode, 200);
      assert.deepStrictEqual(response.json(), { ok: true });
    } finally {
      app.close();
    }
  });

  it('get abort (fake)', async () => {
    const app = fastify();
    try {
      fastifyAbortRegister(app);

      app.addHook('onRequest', (req: FastifyRequestAbortCtrl, reply, done) => {
        assert.ok(req.abortCtrl);
        // Abort!
        req.abortCtrl.abort();
        done();
      });

      app.get('/api/random', (req: FastifyRequestAbortCtrl, reply) => {
        assert.ok(req.abortCtrl);
        assert.ok(req.abortCtrl.signal);
        assert.ok(req.abortCtrl.signal.aborted);
        return { ok: req.abortCtrl.signal.aborted };
      });

      const response = await app.inject({
        method: 'GET',
        url: '/api/random',
      });
      assert.strictEqual(response.statusCode, 200);
      assert.deepStrictEqual(response.json(), { ok: true });
    } finally {
      app.close();
    }
  });

  it('get abort real', async () => {
    const app = fastify();
    try {
      const sleep = promisify(setTimeout);
      fastifyAbortRegister(app);

      app.get('/', async (req: FastifyRequestAbortCtrl, reply) => {
        await sleep(1000);
        assert.ok(req.abortCtrl);
        assert.ok(req.abortCtrl.signal);
        assert.ok(req.abortCtrl.signal.aborted);
        return { ok: req.abortCtrl.signal.aborted };
      });

      await app.listen({ host: '::', port: 0 });

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const socket = connect((app.server.address()! as unknown as { port: string }).port);
      socket.write('GET / HTTP/1.1\r\nHost: example.com\r\n\r\n');

      await sleep(500);
      socket.destroy();
    } catch (error) {
      console.dir(error);
    } finally {
      await app.close();
    }
  });

  it('post', async () => {
    const app = fastify();
    try {
      fastifyAbortRegister(app);

      app.post('/api/random', (req: FastifyRequestAbortCtrl, reply) => {
        assert.ok(req.abortCtrl);
        assert.ok(req.abortCtrl.signal);
        assert.ok(!req.abortCtrl.signal.aborted);
        return { ok: true };
      });

      const response = await app.inject({
        method: 'POST',
        url: '/api/random',
        payload: {},
      });
      assert.strictEqual(response.statusCode, 200);
      assert.deepStrictEqual(response.json(), { ok: true });
    } finally {
      app.close();
    }
  });
});
