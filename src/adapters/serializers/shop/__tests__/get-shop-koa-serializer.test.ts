import { GetShopKoaSerializer } from '@adapters/serializers/shop/get-shop-koa-serializer';
import { UnprocessableEntityError } from '@domain/error/client/unprocessable-entity-error';

const getShopKoaSerializer = new GetShopKoaSerializer();

describe('getShopKoaSerializer()', () => {
    test('succeed if all params are provided', async () => {
        // Given
        const ctx = { params: { shopHandle: 'thehandle' } };

        // When
        // @ts-ignore
        const result = getShopKoaSerializer.deserializeRequest(ctx);

        // Then
        expect(result).toEqual({ shopHandle: 'thehandle' });
    });

    test('fails if no shop handle is provided', async () => {
        // Given
        const ctx = { params: {} };

        // When
        // @ts-ignore
        const ft = () => getShopKoaSerializer.deserializeRequest(ctx);

        // Then
        expect(ft).toThrow(UnprocessableEntityError);
    });
});
