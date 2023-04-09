import { createMockOfInitiatedKoaContext } from '@infrastructure/../../../../../application/server/__tests__/initiated-koa-context.mock';
import { serializeLogoutKoaResponse } from '../serialize-logout-koa-response';

describe('serializeLogoutKoaResponse()', () => {
    test('with a basic response', async () => {
        // Given
        const mockOfCtx = createMockOfInitiatedKoaContext();

        // When
        serializeLogoutKoaResponse(mockOfCtx);

        // Then
        expect(mockOfCtx.status).toEqual(200);
    });
});
