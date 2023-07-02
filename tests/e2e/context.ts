import { databaseContextFactory } from '@tests/e2e/database.context';
import { requestContextFactory } from '@tests/e2e/request.context';
import request from 'supertest';

import { Database } from '@ports/database';

export class TestContext {
    private static requestInstance: request.SuperTest<request.Test>;
    private static databaseInstance: Database;

    // Unique instance of database
    public static database(): Database {
        if (!TestContext.databaseInstance) {
            TestContext.databaseInstance = databaseContextFactory();
        }

        return TestContext.databaseInstance;
    }

    // Unique instance of request
    public static request(): request.SuperTest<request.Test> {
        if (!TestContext.requestInstance) {
            TestContext.requestInstance = requestContextFactory();
        }

        return TestContext.requestInstance;
    }
}
