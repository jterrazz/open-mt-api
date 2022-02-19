import { getApiStateFactory } from '@application/use-cases/api/get-api-state';

import { createMockOfDependencies } from '@configuration/dependencies.mock';
import { createMockOfTracker } from '@application/contracts/tracker.mock';

describe('use-case - get API state', function () {
    test.concurrent('should return the API state', async () => {
        // Given
        const mockDependencies = createMockOfDependencies();
        const mockTracker = createMockOfTracker();
        const getApiState = getApiStateFactory(mockDependencies, mockTracker);

        // When
        const result = getApiState();

        // Then
        expect(result).toStrictEqual({
            env: 'test',
            state: 'OK',
            time: expect.any(Date),
            version: '1.0.0',
        });
    });
});
