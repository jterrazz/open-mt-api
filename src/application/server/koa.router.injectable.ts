import Router from 'koa-router';

import { koaRouterFactory } from '@application/server/koa.router';
import { KoaRoute } from '@application/server/routes/koa-route';

import { GetApiStatusController } from '@domain/api/get-api-status.controller';
import { GetMeController } from '@domain/user/get-me.controller';

import { Logger } from '@ports/logger';

export const injectableKoaRouterFactory = (
    logger: Logger,
    getApiStatusRoute: KoaRoute<GetApiStatusController>,
    getMeRoute: KoaRoute<GetMeController>,
): Router => {
    return koaRouterFactory(logger, getApiStatusRoute, getMeRoute);
};

injectableKoaRouterFactory.inject = ['logger', 'getApiStatusRoute', 'getMeRoute'] as const;
