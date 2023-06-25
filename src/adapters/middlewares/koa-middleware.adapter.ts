import { KoaContext } from '@adapters/routes/koa-deserializer.adapter';

export interface KoaMiddleware {
    (ctx: KoaContext, next: () => Promise<CallableFunction>): Promise<void>;
}
