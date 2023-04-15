import { requestContextFactory } from '@tests/e2e/request.context';
import request from 'supertest';

import { applicationInjector } from '@application/injector';

export class TestContext {
    private static request: request.SuperTest<request.Test>;

    public static async connectDatabase(): Promise<void> {
        const database = applicationInjector.resolve('database');

        await database.connect();
    }

    public static getRequest(): request.SuperTest<request.Test> {
        if (!TestContext.request) {
            TestContext.request = requestContextFactory();
        }

        return TestContext.request;
    }
}
