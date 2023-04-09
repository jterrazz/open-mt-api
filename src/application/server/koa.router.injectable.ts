import Router from 'koa-router';

import { koaRouterFactory } from '@application/server/koa.router';

export const injectableKoaRouterFactory = (version: string): Router => {
    return koaRouterFactory(version);
};

injectableKoaRouterFactory.inject = ['version'] as const;
