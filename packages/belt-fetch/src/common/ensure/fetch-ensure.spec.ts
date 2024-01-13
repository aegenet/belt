import * as assert from 'node:assert';
import { fetchEnsure } from '../../browser';
import * as http from 'http';

const beforeAll = global.beforeAll ?? global.before;
const afterAll = global.afterAll ?? global.after;

describe('fetchEnsure', () => {
  let server: http.Server;

  beforeAll(done => {
    server = http
      .createServer(function (req, res) {
        if (req.url) {
          if (req.url.startsWith('/text')) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write('Hello World!');
          } else if (req.url.startsWith('/json')) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ message: 'Hello World!' }));
          } else if (req.url.startsWith('/custom')) {
            res.writeHead(200, { 'Content-Type': 'application/custom' });
            res.write(JSON.stringify('a:1;c:2'));
          } else if (req.url.startsWith('/throw/text')) {
            res.writeHead(401, { 'Content-Type': 'text/plain' });
            res.write('Error!!!');
          } else if (req.url.startsWith('/throw/json')) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ message: 'Error!' }));
          } else if (req.url.startsWith('/throw/custom')) {
            res.writeHead(401, { 'Content-Type': 'application/custom' });
            res.write(JSON.stringify({ message: 'Error!' }));
          } else if (req.url.startsWith('/crash/502')) {
            res.writeHead(502);
          } else if (req.url.startsWith('/crash/533')) {
            res.writeHead(533, '');
          } else if (req.url.startsWith('/crash/boom')) {
            res.destroy();
          }
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify({ message: 'Alarma! Invalid url.' }));
        }
        res.end();
      })
      .listen(3030, () => done());
  });

  afterAll(done => {
    server.close(done);
  });

  describe('ok', () => {
    it('text', async () => {
      const resp = await fetch('http://127.0.0.1:3030/text');
      assert.strictEqual(resp.status, 200);
      assert.strictEqual(await fetchEnsure(resp), 'Hello World!');
    });

    it('json', async () => {
      const resp = await fetch('http://127.0.0.1:3030/json');
      assert.strictEqual(resp.status, 200);
      const results = await fetchEnsure<{ message: string }>(resp);
      assert.ok(results);
      assert.strictEqual(results.message, 'Hello World!');
    });

    it('custom without mapper (get a raw text)', async () => {
      const resp = await fetch('http://127.0.0.1:3030/custom');
      assert.strictEqual(resp.status, 200);
      assert.deepStrictEqual(await fetchEnsure(resp), '"a:1;c:2"');
    });

    it('custom with mapper', async () => {
      const resp = await fetch('http://127.0.0.1:3030/custom');
      assert.strictEqual(resp.status, 200);
      assert.deepStrictEqual(
        await fetchEnsure(resp, {
          'application/custom': resp => resp.json(),
        }),
        'a:1;c:2'
      );
    });
  });

  describe('ko', () => {
    it('throw text', async () => {
      const resp = await fetch('http://127.0.0.1:3030/throw/text');
      assert.strictEqual(resp.status, 401);
      try {
        await fetchEnsure(resp);
      } catch (error) {
        assert.strictEqual(error, 'Error!!!');
      }
    });

    it('throw json', async () => {
      const resp = await fetch('http://127.0.0.1:3030/throw/json');
      assert.strictEqual(resp.status, 401);
      try {
        await fetchEnsure(resp);
      } catch (error) {
        assert.ok(error);
        assert.strictEqual((error as any).message, 'Error!');
      }
    });

    it('throw custom without mapper (get a raw text)', async () => {
      const resp = await fetch('http://127.0.0.1:3030/throw/custom');
      assert.strictEqual(resp.status, 401);
      try {
        await fetchEnsure(resp);
      } catch (error) {
        assert.strictEqual(error, '{"message":"Error!"}');
      }
    });

    it('throw custom with mapper', async () => {
      const resp = await fetch('http://127.0.0.1:3030/throw/custom');
      assert.strictEqual(resp.status, 401);
      try {
        await fetchEnsure(resp, {
          'application/custom': resp => resp.json(),
        });
      } catch (error) {
        assert.ok(error);
        assert.strictEqual((error as any).message, 'Error!');
      }
    });
  });

  describe('crash', () => {
    it('throw text', async () => {
      const resp = await fetch('http://127.0.0.1:3030/crash/502');
      assert.strictEqual(resp.status, 502);
      try {
        await fetchEnsure(resp);
      } catch (error) {
        assert.strictEqual(error, 'Bad Gateway');
      }
    });

    it('throw 533 (special)', async () => {
      const resp = await fetch('http://127.0.0.1:3030/crash/533');
      assert.strictEqual(resp.status, 533);
      try {
        await fetchEnsure(resp);
      } catch (error) {
        assert.strictEqual(error, 'HTTP error 533');
      }
    });

    it('throw boom, closed connection', async () => {
      try {
        await fetch('http://127.0.0.1:3030/crash/boom');
        throw new Error('Must failed!');
      } catch (error) {
        assert.ok(error);
        assert.strictEqual((error as any).message, 'fetch failed');
      }
    });
  });
});
