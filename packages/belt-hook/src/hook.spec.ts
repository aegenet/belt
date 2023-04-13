// tslint:disable:no-big-function no-duplicate-string no-identical-functions
import * as assert from 'node:assert';
import { hook } from './index';

describe('Hook', function () {
  it('Before', async function () {
    const context = {
      cpt: 0,
      inc: function () {
        this.cpt++;
      },
    };

    assert.strictEqual(context.cpt, 0);
    context.inc();
    assert.strictEqual(context.cpt, 1);

    const token = hook({
      context,
      name: 'inc',
      beforeCall: data => {
        assert.strictEqual(data.duration, undefined);
        assert.strictEqual(data.endedAt, undefined);
        assert.strictEqual(data.error, undefined);
        assert.strictEqual(data.result, undefined);
        assert.ok(data.id);
        assert.ok(data.startedAt);
        context.cpt++;
      },
    });

    context.inc();
    assert.strictEqual(context.cpt, 3);
    token.dispose();

    context.inc();
    assert.strictEqual(context.cpt, 4);
  });

  it('After', async function () {
    const context = {
      cpt: 0,
      inc: function () {
        this.cpt++;
      },
    };

    assert.strictEqual(context.cpt, 0);
    context.inc();
    assert.strictEqual(context.cpt, 1);

    const token = hook({
      context,
      name: 'inc',
      beforeCall: data => {
        assert.strictEqual(data.duration, undefined);
        assert.strictEqual(data.endedAt, undefined);
        assert.strictEqual(data.error, undefined);
        assert.strictEqual(data.result, undefined);
        assert.ok(data.id);
        assert.ok(data.startedAt);
        context.cpt++;
      },
      afterCall: data => {
        assert.notStrictEqual(data.duration, undefined);
        assert.ok(data.endedAt);
        assert.strictEqual(data.error, undefined);
        assert.strictEqual(data.result, undefined);
        assert.ok(data.id);
        assert.ok(data.startedAt);
        context.cpt++;
      },
    });

    context.inc();
    assert.strictEqual(context.cpt, 4);
    token.dispose();

    context.inc();
    assert.strictEqual(context.cpt, 5);
  });

  it('Promise', async function () {
    const context = {
      cpt: 0,
      inc: async function () {
        this.cpt++;
        return Promise.resolve();
      },
    };

    assert.strictEqual(context.cpt, 0);
    context.inc();
    assert.strictEqual(context.cpt, 1);

    const token = hook({
      context,
      name: 'inc',
      beforeCall: data => {
        assert.strictEqual(data.duration, undefined);
        assert.strictEqual(data.endedAt, undefined);
        assert.strictEqual(data.error, undefined);
        assert.strictEqual(data.result, undefined);
        assert.ok(data.id);
        assert.ok(data.startedAt);
        context.cpt++;
      },
      afterCall: data => {
        assert.notStrictEqual(data.duration, undefined);
        assert.ok(data.endedAt);
        assert.strictEqual(data.error, undefined);
        assert.strictEqual(data.result, undefined);
        assert.ok(data.id);
        assert.ok(data.startedAt);
        context.cpt++;
      },
    });

    await context.inc();
    assert.strictEqual(context.cpt, 4);
    token.dispose();

    await context.inc();
    assert.strictEqual(context.cpt, 5);
  });
});
