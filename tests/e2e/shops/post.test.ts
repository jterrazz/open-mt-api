import { createEndToEndApplication } from '@tests/e2e/e2e-application.mock';
import { useFakeTimers, useRealTimers } from '@tests/utils/jest';
import exp from 'constants';
import request from 'supertest';

let app;

beforeAll(async () => {
    app = await createEndToEndApplication();
    useFakeTimers();
});

afterAll(function () {
    useRealTimers();
});

describe('END TO END - POST /shops.ts', function () {
    test('creates a new shop', async () => {
        // Given
        const params = {
            handle: 'the-shop-handle',
            name: 'the-shop-name',
        };

        // When
        const response = await request(app.callback())
            .post('/shops')
            .send(params);

        // Then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            handle: 'the-shop-handle',
            name: 'the-shop-name',
        });
        expect(response.headers['content-type']).toContain('json');
    });
});
