import { IProjectDependencies } from '@application/contracts/IProjectDependencies';
import { Middleware } from 'koa';

export const trackerMiddlewareFactory = ({
    trackerFactory,
}: IProjectDependencies): Middleware => {
    return async (ctx, next) => {
        ctx.requestTracker = trackerFactory();
        ctx.requestTracker.start();
        await next();
        ctx.requestTracker.stop();
    };
};
