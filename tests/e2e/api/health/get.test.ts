import { TestContext } from '@tests/e2e/context';
import { useFakeTimers, useRealTimers } from '@tests/helpers/timer';

beforeAll(() => {
    useFakeTimers();
});

afterAll(() => {
    useRealTimers();
});

describe('E2E - GET /health', function () {
    test('should respond with api health information', async () => {
        // When
        const response = await TestContext.request().get('/health');

        // Then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            message: 'Hello World!',
            status: 'Up',
            time: '2000-01-01T00:00:00.000Z',
            version: '1.0.0',
        });
    });

    test('should respond with global headers', async () => {
        // When
        const response = await TestContext.request().get('/health');

        // Then
        expect(response.headers['api-version']).toEqual(
            (await import('../../../../package.json')).version,
        );
        expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');
    });
});
