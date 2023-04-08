import { mock } from 'jest-mock-extended';
import request from 'supertest';

import { koaRouterFactory } from '@application/server/koa.router';
import { koaServerFactory } from '@application/server/koa.server';

import { Logger } from '@ports/logger';

export const e2eClientFactory = () => {
    const logger = mock<Logger>();
    const router = koaRouterFactory();
    const server = koaServerFactory(logger, router);

    return request.agent(server.koa.callback());
};