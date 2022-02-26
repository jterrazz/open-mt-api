import { ILogger } from '@application/contracts';
import { Middleware } from 'koa';

export const authenticateUserMiddlewareFactory = (
    logger: ILogger,
): Middleware => {
    return async (ctx, next) => {
        ctx.authenticatedUser = {};
        logger.debug('added authenticated user to context');
        await next();
    };
};
