import { createMockOfConfiguration } from '@configuration/__tests__/configuration.mock';
import { createMockOfTrackerRepository } from '@application/contracts/__tests__/tracker.mock';
import { getApiStateFactory } from '@application/use-cases/api/get-api-state';
import { useFakeTimers, useRealTimers } from '@tests/utils/timer';

beforeAll(() => {
    useFakeTimers();
});

afterAll(() => {
    useRealTimers();
});

describe('use-case - getApiState()', function () {
    test('returns the API state', async () => {
        // Given
        const getApiState = getApiStateFactory(
            createMockOfConfiguration(),
            createMockOfTrackerRepository(),
        );

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

    test('calls its tracker events', async () => {
        // Given
        const mockOfTrackerRepository = createMockOfTrackerRepository();
        const getApiState = getApiStateFactory(
            createMockOfConfiguration(),
            mockOfTrackerRepository,
        );

        // When
        getApiState();

        // Then
        expect(
            mockOfTrackerRepository.requestedGetApiState,
        ).toHaveBeenCalledTimes(1);
    });
});
