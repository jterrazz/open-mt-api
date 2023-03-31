import { KoaContext } from '@adapters/koa-deserializer.adapter';

export interface KoaMiddleware {
    (ctx: KoaContext, next: () => Promise<CallableFunction>): Promise<void>;
}
