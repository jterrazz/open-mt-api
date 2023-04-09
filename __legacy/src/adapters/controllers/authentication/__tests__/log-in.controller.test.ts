import { createMockOfInitiatedKoaContext } from '@infrastructure/../../../../application/server/__tests__/initiated-koa-context.mock';
import { logInControllerFactory } from '../log-in.controller';

describe('logInController()', () => {
    test('calls a tracker event', async () => {
        // Given
        const mockOfCtx = createMockOfInitiatedKoaContext();

        // When
        await logInControllerFactory(jest.fn())(mockOfCtx);

        // Then
        expect(mockOfCtx.requestTracker.requestedLogIn).toHaveBeenCalledTimes(1);
    });
});
