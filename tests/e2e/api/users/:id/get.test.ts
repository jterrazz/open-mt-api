import { TestContext } from '@tests/e2e/context';
import { dangerouslySeedUser } from '@tests/e2e/seeds/user';
import { useFakeTimers, useRealTimers } from '@tests/helpers/timer';
import * as crypto from 'crypto';

beforeAll(async () => {
    useFakeTimers();
    await TestContext.database().connect();
});

afterAll(() => {
    useRealTimers();
});

describe('E2E - GET /users/:id', function () {
    test('should respond with 200 when user exists', async () => {
        // Given
        const user = await dangerouslySeedUser();
        const url = `/users/${user.id}`;

        // When
        const response = await TestContext.request().get(url);

        // Then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            email: user.email,
            id: user.id,
        });
    });

    test('should respond with 404 when user does not exist', async () => {
        // Given
        const url = `/users/${crypto.randomInt(0, 1_000_000_000)}`;

        // When
        const response = await TestContext.request().get(url);

        // Then
        expect(response.status).toEqual(404);
        expect(response.body).toEqual({
            message: 'User not found',
        });
    });

    test('should respond with 422 when id is not a number', async () => {
        // Given
        const url = `/users/abc`;

        // When
        const response = await TestContext.request().get(url);

        // Then
        expect(response.status).toEqual(422);
        expect(response.body).toEqual({
            message: 'Request param validation failed',
        });
    });
});
