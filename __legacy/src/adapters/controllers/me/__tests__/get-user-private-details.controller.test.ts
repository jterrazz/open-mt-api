import { createMockOfInitiatedKoaContext } from '@infrastructure/../../../../application/server/__tests__/initiated-koa-context.mock';
import { getUserPrivateDetailsControllerFactory } from '../get-user-private-details.controller';

const getUserPrivateDetailsController = getUserPrivateDetailsControllerFactory();

describe('getUserPrivateDetailsController()', () => {
    test('respond with user private details', async () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext();

        // When
        await getUserPrivateDetailsController(ctx);

        // Then
        expect(true).toEqual(true); // FIXME
    });
});
