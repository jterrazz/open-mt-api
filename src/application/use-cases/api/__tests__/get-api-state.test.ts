import { getApiStateFactory } from '@application/use-cases/api/get-api-state';

import { createMockProjectDependencies } from '@application/contracts/mocks/project-dependencies.mock';
import { createMockTracker } from '@application/contracts/mocks/tracker.mock';

describe('use-case - getApiState()', function () {
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
