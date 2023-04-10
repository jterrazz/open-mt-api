import request from 'supertest';

import { applicationInjector } from '@application/injector';

export const requestContextFactory = () => {
    return request.agent(applicationInjector.resolve('server').koa.callback());
};
