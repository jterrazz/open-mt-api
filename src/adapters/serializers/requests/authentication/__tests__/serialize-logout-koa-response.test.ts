import { createMockOfInitiatedKoaContext } from '@infrastructure/../../../../../application/webserver/__tests__/initiated-koa-context.mock';
import { serializeLogoutKoaResponse } from '@adapters/serializers/requests/authentication/serialize-logout-koa-response';

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
