import { requestContextFactory } from '@tests/e2e/request.context';
import request from 'supertest';

export class TestContext {
    private static request: request.SuperTest<request.Test>;

    public static getRequest(): request.SuperTest<request.Test> {
        if (!TestContext.request) {
            TestContext.request = requestContextFactory();
        }

        return TestContext.request;
    }
}
