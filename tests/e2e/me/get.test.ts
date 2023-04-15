import { TestContext } from '@tests/e2e/test.context';
import { useFakeTimers, useRealTimers } from '@tests/helpers/timer';

beforeAll(async () => {
    useFakeTimers();
    await TestContext.connectDatabase();
});

afterAll(() => {
    useRealTimers();
});

describe('E2E - GET /me', function () {
    test('responds with authenticated user information', async () => {
        // When
        const response = await TestContext.getRequest().get('/me');

        // Then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            email: 'the-email@example.com',
            id: 42,
        });
    });
});
