import { Middleware } from 'koa';

// TODO Probably move to adapters
export const authenticationMiddleware: Middleware = async (ctx, next) => {
    ctx.authenticatedUser = {};
    await next();
};
