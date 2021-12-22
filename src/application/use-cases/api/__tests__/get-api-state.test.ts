import { getApiStateFactory } from '@application/use-cases/api/get-api-state';

import { createMockProjectDependencies } from '@configuration/project-dependencies.mock';
import { createMockTracker } from '@application/contracts/tracker.mock';

describe('use-case - get API state', function () {
    it('should return the API state', function () {
        // Given
        const { dependencies: mockDependencies } =
            createMockProjectDependencies();
        const mockTracker = createMockTracker();
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
