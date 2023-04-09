import { KoaMiddleware } from '@adapters/koa-middleware.adapter';

export const apiVersionKoaMiddlewareFactory = (apiVersion: string): KoaMiddleware => {
    return async (ctx, next) => {
        ctx.set('api-version', apiVersion);
        await next();
    };
};
