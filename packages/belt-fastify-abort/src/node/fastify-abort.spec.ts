/**
 * @vitest-environment node
 */
import { describe, it, assert } from 'vitest';
import { setTimeout } from 'node:timers/promises';
import fastify from 'fastify';
import { fastifyAbortRegister, type FastifyRequestAbortCtrl } from '../node';
import { connect } from 'net';

describe('fastify-abort/node', () => {
  it('get', async () => {
    const app = fastify();
    try {
      fastifyAbortRegister(app);

      app.get('/api/random', (req: FastifyRequestAbortCtrl) => {
        assert.ok(req.abortCtrl);
        assert.ok(req.abortCtrl!.signal);
        assert.ok(!req.abortCtrl!.signal.aborted);
        return { ok: true };
      });

      const response = await app.inject({
        method: 'GET',
        url: '/api/random',
      });
      assert.strictEqual(response.statusCode, 200);
      assert.deepStrictEqual(response.json(), { ok: true });
    } finally {
      await app.close();
    }
  });

  it('get abort (fake)', async () => {
    const app = fastify();
    try {
      fastifyAbortRegister(app);

      app.addHook('onRequest', (req: FastifyRequestAbortCtrl, reply, done) => {
        assert.ok(req.abortCtrl);
        // Abort!
        req.abortCtrl!.abort();
        done();
      });

      app.get('/api/random', (req: FastifyRequestAbortCtrl) => {
        assert.ok(req.abortCtrl);
        assert.ok(req.abortCtrl!.signal);
        assert.ok(req.abortCtrl!.signal.aborted);
        return { ok: req.abortCtrl!.signal.aborted };
      });

      const response = await app.inject({
        method: 'GET',
        url: '/api/random',
      });
      assert.strictEqual(response.statusCode, 200);
      assert.deepStrictEqual(response.json(), { ok: true });
    } finally {
      await app.close();
    }
  });

  it('get abort real', async () => {
    const app = fastify();
    try {
      fastifyAbortRegister(app);

      app.get('/', async (req: FastifyRequestAbortCtrl) => {
        await setTimeout(1000);
        assert.ok(req.abortCtrl);
        assert.ok(req.abortCtrl!.signal);
        assert.ok(req.abortCtrl!.signal.aborted);
        return { ok: req.abortCtrl!.signal.aborted };
      });

      await app.listen({ host: '::', port: 0 });

      const socket = connect((app.server.address()! as unknown as { port: string }).port);
      socket.write('GET / HTTP/1.1\r\nHost: example.com\r\n\r\n');

      await setTimeout(500);
      socket.destroy();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.dir(error);
    } finally {
      await app.close();
    }
  });

  it('post', async () => {
    const app = fastify();
    try {
      fastifyAbortRegister(app);

      app.post('/api/random', (req: FastifyRequestAbortCtrl) => {
        assert.ok(req.abortCtrl);
        assert.ok(req.abortCtrl!.signal);
        assert.ok(!req.abortCtrl!.signal.aborted);
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
      await app.close();
    }
  });
});
