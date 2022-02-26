import { createEndToEndApplication } from '../create-end-to-end-application';
import { useFakeTimers, useRealTimers } from '@tests/utils/jest';
import request from 'supertest';

const endToEndApplication = createEndToEndApplication();

beforeAll(() => {
    useFakeTimers();
});

afterAll(() => {
    useRealTimers();
});

describe('END TO END - GET /api', function () {
    test('returns the API status', async () => {
        // When
        const response = await request(endToEndApplication.app.callback()).get(
            '/',
        );

        // Then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            env: 'test',
            state: 'OK',
            time: '2000-01-01T00:00:00.000Z',
            version: '1.0.0',
        });
        expect(response.headers['content-type']).toContain('json');
    });
});
