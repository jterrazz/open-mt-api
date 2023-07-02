import { koaRouterFactory } from '@application/server/koa.router';
import { koaServerFactory } from '@application/server/koa.server';

import { Logger } from '@ports/logger';
import { Server } from '@ports/server';

export const injectableServerFactory = (logger: Logger, version: string): Server => {
    const router = koaRouterFactory(logger, version);

    return koaServerFactory(logger, router);
};

injectableServerFactory.inject = ['logger', 'version'] as const;
