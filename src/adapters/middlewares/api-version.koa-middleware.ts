import Router from 'koa-router';

export const apiVersionKoaMiddlewareFactory = (apiVersion: string): Router.IMiddleware => {
    return async (ctx, next) => {
        ctx.set('api-version', apiVersion);
        await next();
    };
};
