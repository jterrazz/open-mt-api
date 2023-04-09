import { createMockOfInitiatedKoaContext } from '@infrastructure/../../../../../application/server/__tests__/initiated-koa-context.mock';
import { serializeCreateShopKoaResponse } from '../serialize-create-shop-koa-response';

describe('serializeCreateShopKoaResponse()', () => {
    test('with basic response', async () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext();
        const params = {
            handle: 'the_handle',
            name: 'the_name',
        };

        // When
        serializeCreateShopKoaResponse(ctx, params);

        // Then
        expect(ctx.body).toEqual({
            handle: 'the_handle',
            name: 'the_name',
        });
        expect(ctx.status).toEqual(201);
    });
});
