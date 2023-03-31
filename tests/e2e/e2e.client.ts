import { mock } from 'jest-mock-extended';
import request from 'supertest';

import { koaServerFactory } from '@application/server/koa.server';

import { Logger } from '@ports/logger';

export const e2eClientFactory = () => {
    const logger = mock<Logger>();
    const server = koaServerFactory(logger);

    return request.agent(server.koa.callback());
};
