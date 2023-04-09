import { createMockOfInitiatedKoaContext } from '@infrastructure/../../../../../application/server/__tests__/initiated-koa-context.mock';
import { serializeGetShopKoaResponse } from '../serialize-get-shop-koa-response';

describe('serializeGetShopKoaResponse()', () => {
    test('with basic response', async () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext();
        const params = {
            description: 'the_description',
            handle: 'the_handle',
            name: 'the_name',
        };

        // When
        serializeGetShopKoaResponse(ctx, params);

        // Then
        expect(ctx.body).toEqual({
            description: 'the_description',
            handle: 'the_handle',
            name: 'the_name',
        });
    });
});
