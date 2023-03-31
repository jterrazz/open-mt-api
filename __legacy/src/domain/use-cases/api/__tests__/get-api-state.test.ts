import { useFakeTimers, useRealTimers } from '@tests/utils/timer';

import { createMockOfConfiguration } from '@configuration/__tests__/configuration.mock';

import { getApiStateFactory } from '../get-api-state';

beforeAll(() => {
    useFakeTimers();
});

afterAll(() => {
    useRealTimers();
});

describe('use-cases / getApiState()', function () {
    test('returns the API state', async () => {
        // Given
        const getApiState = getApiStateFactory(createMockOfConfiguration());

        // When
        const result = getApiState();

        // Then
        expect(result).toStrictEqual({
            env: 'test',
            state: 'UP',
            time: new Date(),
            version: '1.0.0',
        });
    });
});
