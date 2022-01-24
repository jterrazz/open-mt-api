import { IDependencies } from '@application/contracts';
import { Middleware } from 'koa';

export const trackerMiddlewareFactory = ({
    trackerFactory,
}: IDependencies): Middleware => {
    return async (ctx, next) => {
        ctx.requestTracker = trackerFactory();
        ctx.requestTracker.start();
        await next();
        ctx.requestTracker.stop();
    };
};
