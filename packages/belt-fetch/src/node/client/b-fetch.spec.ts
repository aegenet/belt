import * as assert from 'node:assert';
import * as http from 'http';
import { fetchEnsure, bFetch, bFetchSharedCache } from '../../node';
import { setTimeout as wait } from 'node:timers/promises';

const beforeAll = global.beforeAll ?? global.before;
const afterAll = global.afterAll ?? global.after;

describe('bFetch node', () => {
  let server: http.Server;
  let timeoutToken: any;

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
          } else if (req.url.startsWith('/timeout/5000')) {
            timeoutToken = setTimeout(() => {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.write(JSON.stringify({ message: 'Long task.' }));
              res.end();
            }, 5000);
            return;
          } else if (req.url.startsWith('/crash/boom')) {
            res.destroy();
          }
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify({ message: 'Alarma! Invalid url.' }));
        }
        res.end();
      })
      .listen(3031, () => done());
  });

  afterAll(done => {
    clearTimeout(timeoutToken);
    server.close(done);
  });

  describe('timeout', () => {
    it('Server respond but too long', async () => {
      try {
        await bFetch(
          'http://127.0.0.1:3031/timeout/5000',
          {},
          {
            timeout: 200,
          }
        );
        throw new Error('Must failed!');
      } catch (error) {
        assert.strictEqual((error as Error).message, 'The operation was aborted due to timeout');
      }
    });

    it('Object url', async () => {
      try {
        await bFetch(
          {
            url: 'http://127.0.0.1:3031/timeout/5000',
          } as any,
          {},
          {
            timeout: 200,
            replaceDNSByIP: true,
          }
        );
        throw new Error('Must failed!');
      } catch (error) {
        assert.strictEqual((error as Error).message, 'bFetch is not compatible atm with Request object');
      }
    });
  });

  describe('DNS async', () => {
    it('Resolve inexistant dns', async () => {
      try {
        await bFetch(
          'http://invaliddns.test',
          {},
          {
            timeout: 200,
            replaceDNSByIP: true,
          }
        );
        throw new Error('Must failed!');
      } catch (error) {
        assert.strictEqual((error as Error).message, 'bFetch: ENOTFOUND invaliddns.test');
      }
    });

    it('Resolve jsonplaceholder.typicode.com dns', async () => {
      const resp = await bFetch(
        'https://jsonplaceholder.typicode.com/todos/1',
        {},
        {
          timeout: 200,
          replaceDNSByIP: true,
        }
      );
      assert.strictEqual(resp.status, 200);
    });

    it('Resolve dns with dnsMap fallback', async () => {
      const resp = await bFetch(
        'http://dontexistbutmapped:3031/text',
        {},
        {
          timeout: 200,
          replaceDNSByIP: true,
          dnsMapAsFallback: true,
          dnsMap: {
            dontexistbutmapped: '127.0.0.1',
          },
        }
      );
      assert.strictEqual(resp.status, 200);
      assert.strictEqual(await fetchEnsure(resp), 'Hello World!');
    });

    it('Resolve dns with dnsMap as primary resolver: fake github.com', async () => {
      const resp = await bFetch(
        'http://github.com:3031/text',
        {},
        {
          timeout: 200,
          replaceDNSByIP: true,
          dnsMapAsFallback: false,
          dnsMap: {
            'github.com': '127.0.0.1',
          },
        }
      );
      assert.strictEqual(resp.status, 200);
      assert.strictEqual(await fetchEnsure(resp), 'Hello World!');
    });

    it('Resolve dns with dnsMap as primary resolver: unknown entry', async () => {
      try {
        await bFetch(
          'http://itsnothereanddontexist.test:3031/text',
          {},
          {
            timeout: 200,
            replaceDNSByIP: true,
            dnsMapAsFallback: false,
            dnsMap: {
              'github.com': '127.0.0.1',
            },
          }
        );
        throw new Error('Must failed!');
      } catch (error) {
        assert.strictEqual((error as Error).message, 'bFetch: ENOTFOUND itsnothereanddontexist.test');
      }
    });
  });

  describe('Cache', () => {
    it('Without cache', async () => {
      let resp = await bFetch(
        'https://jsonplaceholder.typicode.com/todos/1',
        {},
        {
          timeout: 200,
          replaceDNSByIP: true,
        }
      );
      assert.strictEqual(resp.status, 200);
      resp = await bFetch(
        'https://jsonplaceholder.typicode.com/todos/1',
        {},
        {
          timeout: 200,
          replaceDNSByIP: true,
        }
      );
      assert.strictEqual(resp.status, 200);
    });

    it('With cache', async () => {
      const cacheTTL = 1000;
      let resp = await bFetch(
        'https://jsonplaceholder.typicode.com/todos/1',
        {},
        {
          dnsCacheTTL: cacheTTL,
          timeout: 200,
          replaceDNSByIP: true,
        }
      );
      assert.strictEqual(resp.status, 200);
      resp = await bFetch(
        'https://jsonplaceholder.typicode.com/todos/1',
        {},
        {
          dnsCacheTTL: cacheTTL,
          timeout: 200,
          replaceDNSByIP: true,
        }
      );
      assert.strictEqual(resp.status, 200);
    });

    it('With expired cache', async () => {
      const cacheTTL = 500;
      let resp = await bFetch(
        'https://jsonplaceholder.typicode.com/todos/1',
        {},
        {
          dnsCacheTTL: cacheTTL,
          timeout: 200,
          replaceDNSByIP: true,
        }
      );
      assert.strictEqual(resp.status, 200);

      await wait(1000);
      // not from cache
      resp = await bFetch(
        'https://jsonplaceholder.typicode.com/todos/1',
        {},
        {
          dnsCacheTTL: cacheTTL,
          timeout: 200,
          replaceDNSByIP: true,
        }
      );
      assert.strictEqual(resp.status, 200);
    });

    it('Clear shared cache', async () => {
      const resp = await bFetch(
        'https://jsonplaceholder.typicode.com/todos/1',
        {},
        {
          dnsCacheTTL: 1000,
          timeout: 200,
          replaceDNSByIP: true,
        }
      );
      assert.strictEqual(resp.status, 200);
      assert.ok(bFetchSharedCache.has('jsonplaceholder.typicode.com'));
      // Clear
      bFetchSharedCache.clear();
      // ...
      assert.ok(!bFetchSharedCache.has('jsonplaceholder.typicode.com'));
    });
  });

  describe('ok', () => {
    it('text', async () => {
      const resp = await bFetch('http://127.0.0.1:3031/text');
      assert.strictEqual(resp.status, 200);
      assert.strictEqual(await fetchEnsure(resp), 'Hello World!');
    });

    it('json', async () => {
      const resp = await bFetch('http://127.0.0.1:3031/json');
      assert.strictEqual(resp.status, 200);
      const results = await fetchEnsure<{ message: string }>(resp);
      assert.ok(results);
      assert.strictEqual(results.message, 'Hello World!');
    });

    it('custom without mapper (get a raw text)', async () => {
      const resp = await bFetch('http://127.0.0.1:3031/custom');
      assert.strictEqual(resp.status, 200);
      assert.deepStrictEqual(await fetchEnsure(resp), '"a:1;c:2"');
    });

    it('custom with mapper', async () => {
      const resp = await bFetch('http://127.0.0.1:3031/custom');
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
      const resp = await bFetch('http://127.0.0.1:3031/throw/text');
      assert.strictEqual(resp.status, 401);
      try {
        await fetchEnsure(resp);
      } catch (error) {
        assert.strictEqual(error, 'Error!!!');
      }
    });

    it('throw json', async () => {
      const resp = await bFetch('http://127.0.0.1:3031/throw/json');
      assert.strictEqual(resp.status, 401);
      try {
        await fetchEnsure(resp);
      } catch (error) {
        assert.ok(error);
        assert.strictEqual((error as any).message, 'Error!');
      }
    });

    it('throw custom without mapper (get a raw text)', async () => {
      const resp = await bFetch('http://127.0.0.1:3031/throw/custom');
      assert.strictEqual(resp.status, 401);
      try {
        await fetchEnsure(resp);
      } catch (error) {
        assert.strictEqual(error, '{"message":"Error!"}');
      }
    });

    it('throw custom with mapper', async () => {
      const resp = await bFetch('http://127.0.0.1:3031/throw/custom');
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
      const resp = await bFetch('http://127.0.0.1:3031/crash/502');
      assert.strictEqual(resp.status, 502);
      try {
        await fetchEnsure(resp);
      } catch (error) {
        assert.strictEqual(error, 'Bad Gateway');
      }
    });

    it('throw 533 (special)', async () => {
      const resp = await bFetch('http://127.0.0.1:3031/crash/533');
      assert.strictEqual(resp.status, 533);
      try {
        await fetchEnsure(resp);
      } catch (error) {
        assert.strictEqual(error, 'HTTP error 533');
      }
    });

    it('throw boom, closed connection', async () => {
      try {
        await bFetch('http://127.0.0.1:3031/crash/boom');
        throw new Error('Must failed!');
      } catch (error) {
        assert.ok(error);
        assert.strictEqual((error as any).message, 'fetch failed');
      }
    });
  });
});
