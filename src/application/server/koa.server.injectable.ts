import Router from 'koa-router';

import { KoaServer, koaServerFactory } from '@application/server/koa.server';

import { Logger } from '@ports/logger';

export const injectableKoaServerFactory = (logger: Logger, router: Router): KoaServer => {
    return koaServerFactory(logger, router);
};

injectableKoaServerFactory.inject = ['logger', 'router'] as const;
