import { ITrackerRepository } from '@domain/tracker/tracker-repository';
import { Middleware } from 'koa';

export const initRequestTrackerMiddlewareFactory = (
    initTrackerForRequest: (userId?: string) => ITrackerRepository,
): Middleware => {
    return async (ctx, next) => {
        ctx.requestTracker = initTrackerForRequest(); // FIXME add userId
        ctx.requestTracker.start();
        await next();
        ctx.requestTracker.stop();
    };
};
