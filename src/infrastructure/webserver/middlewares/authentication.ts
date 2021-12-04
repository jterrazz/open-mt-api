import { Middleware } from 'koa';

export const authenticationMiddleware: Middleware = async (ctx, next) => {
    ctx.authenticatedUser = {};
    await next();
};
