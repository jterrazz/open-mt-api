import Router from 'koa-router';

import { KoaRoute } from '@application/server/routes/koa-route';

import { GetApiStatusController } from '@domain/api/get-api-status.controller';
import { GetMeController } from '@domain/user/get-me.controller';

import { Logger } from '@ports/logger';

export const koaRouterFactory = (
    logger: Logger,
    getApiStatusRoute: KoaRoute<GetApiStatusController>,
    getMeRoute: KoaRoute<GetMeController>,
): Router => {
    logger.debug('creating koa router');

    const router = new Router();

    // API
    router.get('/status', (ctx) => getApiStatusRoute.route(ctx));

    // Me
    router.get('/me', (ctx) => getMeRoute.route(ctx));

    logger.debug('created koa router');

    return router;
};
