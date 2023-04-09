import { Middleware } from 'koa';

import { InitTrackerForRequest } from '@domain/../../domain/use-cases/tracker/init-tracker-for-request';

import { IKoaContext } from '../controllers/koa-controller';

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
