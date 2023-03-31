import { E2E } from '@tests/e2e/e2e';

import { useFakeTimers, useRealTimers } from '@tests/utils/timer';

beforeAll(() => {
    useFakeTimers();
});

afterAll(() => {
    useRealTimers();
});

describe('E2E - GET /status', function () {
    test('returns the API status', async () => {
        // When
        const response = await E2E.getClient().get('/status');

        // Then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            message: 'Hello World!',
            status: 'OK',
            time: '2000-01-01T00:00:00.000Z',
            version: '1.0.0',
        });
        expect(response.headers['content-type']).toContain('json');
    });

    test('returns global API headers', async () => {
        // When
        const response = await E2E.getClient().get('/status');

        // Then
        expect(response.headers).toEqual(
            expect.objectContaining({
                'api-version': expect.any(String),
            }),
        );
    });
});
