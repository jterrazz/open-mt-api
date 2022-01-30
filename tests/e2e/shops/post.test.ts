import {
    EndToEndApplication,
    createEndToEndApplication,
} from '@tests/e2e/e2e-application.mock';
import { useFakeTimers, useRealTimers } from '@tests/utils/jest';
import request from 'supertest';

let endToEndApplication: EndToEndApplication | undefined;

beforeAll(async () => {
    endToEndApplication = await createEndToEndApplication();
    useFakeTimers();
});

afterAll(async () => {
    await endToEndApplication?.destroy();
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
        const response = await request(
            endToEndApplication?.webServerApplication.callback(),
        )
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
