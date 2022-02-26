import { createMockOfDependencies } from '@configuration/dependencies.mock';
import { createMockOfTrackerRepository } from '@application/contracts/tracker.mock';
import { getApiStateFactory } from '@application/use-cases/api/get-api-state';
import { useFakeTimers, useRealTimers } from '@tests/utils/jest';

beforeAll(() => {
    useFakeTimers();
});

afterAll(() => {
    useRealTimers();
});

describe('use-case - get API state', function () {
    test('should return the API state', async () => {
        // Given
        const mockDependencies = createMockOfDependencies();
        const mockTracker = createMockOfTrackerRepository();
        const getApiState = getApiStateFactory(mockDependencies, mockTracker);

        // When
        const result = getApiState();

        // Then
        expect(result).toStrictEqual({
            env: 'test',
            state: 'OK',
            time: new Date(),
            version: '1.0.0',
        });
    });
});
