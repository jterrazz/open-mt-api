import { createMockOfInitiatedKoaContext } from '@infrastructure/../../../../application/server/__tests__/initiated-koa-context.mock';
import { getApiStateControllerFactory } from '../get-api-state.controller';

describe('getApiStateController()', () => {
    test('calls a tracker event', async () => {
        // Given
        const mockOfGetApiState = jest.fn().mockResolvedValue({
            time: new Date('2000-01-01'),
        });
        const mockOfCtx = createMockOfInitiatedKoaContext();

        // When
        await getApiStateControllerFactory(mockOfGetApiState)(mockOfCtx);

        // Then
        expect(mockOfCtx.requestTracker.requestedGetApiState).toHaveBeenCalledTimes(1);
    });
});
