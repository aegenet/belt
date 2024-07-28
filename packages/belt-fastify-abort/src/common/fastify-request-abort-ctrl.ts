import type {
  ContextConfigDefault,
  FastifyBaseLogger,
  FastifyRequest,
  FastifySchema,
  FastifyTypeProvider,
  FastifyTypeProviderDefault,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
  RouteGenericInterface,
} from 'fastify';
import type { FastifyRequestType, ResolveFastifyRequestType } from 'fastify/types/type-provider';

/** FastifyRequest With AbortController */
export type FastifyRequestAbortCtrl<
  RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  SchemaCompiler extends FastifySchema = FastifySchema,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  ContextConfig = ContextConfigDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
  RequestType extends FastifyRequestType = ResolveFastifyRequestType<TypeProvider, SchemaCompiler, RouteGeneric>,
  // ^ Temporary Note: RequestType has been re-ordered to be the last argument in
  //   generic list. This generic argument is now considered optional as it can be
  //   automatically inferred from the SchemaCompiler, RouteGeneric and TypeProvider
  //   arguments. Implementations that already pass this argument can either omit
  //   the RequestType (preferred) or swap Logger and RequestType arguments when
  //   creating custom types of FastifyRequest. Related issue #4123
> = FastifyRequest<
  RouteGeneric,
  RawServer,
  RawRequest,
  SchemaCompiler,
  TypeProvider,
  ContextConfig,
  Logger,
  RequestType
> & {
  /** AbortController */
  abortCtrl?: AbortController;
};
