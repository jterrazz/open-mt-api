import { IKoaContext } from '../controllers/koa-controller';
import { InitTrackerForRequest } from '@domain/use-cases/tracker/init-tracker-for-request';
import { Middleware } from 'koa';

export const handleRequestTrackerMiddlewareFactory = (
    initTrackerForRequest: InitTrackerForRequest,
): Middleware => {
    return async (ctx: IKoaContext, next) => {
        ctx.requestTracker = initTrackerForRequest(ctx.authenticatedUser?.id);
        ctx.requestTracker.start();
        await next();
        ctx.requestTracker.stop();
    };
};
