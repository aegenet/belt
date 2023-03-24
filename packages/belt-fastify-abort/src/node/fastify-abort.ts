import type { FastifyInstance } from 'fastify';
import type { FastifyRequestAbortCtrl } from '../common/fastify-request-abort-ctrl';

/**
 * Register globaly the fastify abort controller
 */
export function fastifyAbortRegister(fastify: FastifyInstance): void {
  // Decorate
  fastifyAbortDecorator(fastify);

  // Add the hook
  fastify.addHook('onRequestAbort', fastifyOnRequestAbort);

  // Add the hook
  fastify.addHook('onRequest', fastifyOnRequest);
}

/**
 * Decorate the Fastify Request with `abortCtrl`
 */
export function fastifyAbortDecorator(fastify: FastifyInstance): void {
  if (!fastify.hasDecorator('abortCtrl')) {
    fastify.decorateReply('abortCtrl', null);
  }
}

/**
 * Action on fastify `onRequestAbort`
 */
export function fastifyOnRequest(request: FastifyRequestAbortCtrl, reply: unknown, done: () => void): void {
  request.abortCtrl = new AbortController();
  done();
}

/**
 * Action on fastify `onRequestAbort`
 */
export function fastifyOnRequestAbort(request: FastifyRequestAbortCtrl, done: () => void): void {
  request.abortCtrl?.abort();
  done();
}
