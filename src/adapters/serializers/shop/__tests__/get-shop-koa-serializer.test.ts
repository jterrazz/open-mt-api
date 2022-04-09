import { GetShopKoaSerializer } from '@adapters/serializers/shop/get-shop-koa-serializer';
import { UnprocessableEntityError } from '@domain/error/client/unprocessable-entity-error';
import { createMockOfInitiatedKoaContext } from '@adapters/contracts/__tests__/initiated-koa-context.mock';

const getShopKoaSerializer = new GetShopKoaSerializer();

describe('GetShopKoaSerializer', () => {
    describe('serializeResponse()', () => {
        test('with basic response', async () => {
            // Given
            const ctx = createMockOfInitiatedKoaContext();
            const params = {
                description: 'the_description',
                handle: 'the_handle',
                name: 'the_name',
            };

            // When
            getShopKoaSerializer.serializeResponse(ctx, params);

            // Then
            expect(ctx.body).toEqual({
                description: 'the_description',
                handle: 'the_handle',
                name: 'the_name',
            });
        });
    });

    describe('deserializeRequest()', () => {
        test('succeeds if all params are provided', async () => {
            // Given
            const ctx = createMockOfInitiatedKoaContext({
                params: { shopHandle: 'the_handle' },
            });

            // When
            const result = getShopKoaSerializer.deserializeRequest(ctx);

            // Then
            expect(result).toEqual({ shopHandle: 'the_handle' });
        });

        test('fails if no shop handle is provided', async () => {
            // Given
            const ctx = createMockOfInitiatedKoaContext({ params: {} });

            // When
            const ft = () => getShopKoaSerializer.deserializeRequest(ctx);

            // Then
            expect(ft).toThrow(UnprocessableEntityError);
        });
    });
});
