import { TestContext } from '@tests/e2e/test.context';
import { useFakeTimers, useRealTimers } from '@tests/helpers/timer';

beforeAll(() => {
    useFakeTimers();
});

afterAll(() => {
    useRealTimers();
});

describe('E2E - GET /status', function () {
    test('respond with application information', async () => {
        // When
        const response = await TestContext.getRequest().get('/status');

        // Then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            message: 'Hello World!',
            status: 'OK',
            time: '2000-01-01T00:00:00.000Z',
            version: '1.0.0',
        });
    });

    test('respond with global headers', async () => {
        // When
        const response = await TestContext.getRequest().get('/status');

        // Then
        expect(response.headers['api-version']).toEqual(expect.any(String));
        expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');
    });
});
