import { e2eClientFactory } from '@tests/e2e/e2e.client';
import request from 'supertest';

export class E2E {
    private static client: request.SuperTest<request.Test>;

    public static getClient(): request.SuperTest<request.Test> {
        if (!E2E.client) {
            E2E.client = e2eClientFactory();
        }

        return E2E.client;
    }
}
