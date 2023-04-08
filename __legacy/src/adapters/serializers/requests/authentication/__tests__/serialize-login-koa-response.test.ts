import { createMockOfInitiatedKoaContext } from '@infrastructure/../../../../../application/server/__tests__/initiated-koa-context.mock';
import { serializeLoginKoaResponse } from '../serialize-login-koa-response';

describe('serializeLoginKoaResponse()', () => {
    test('with a basic response', async () => {
        // Given
        const mockOfCtx = createMockOfInitiatedKoaContext();

        // When
        serializeLoginKoaResponse(mockOfCtx);

        // Then
        expect(mockOfCtx.status).toEqual(200);
    });
});