import { CreateShopKoaSerializer } from '@adapters/serializers/shop/create-shop-koa-serializer';
import { GetShopKoaSerializer } from '@adapters/serializers/shop/get-shop-koa-serializer';
import { UnprocessableEntityError } from '@domain/error/client/unprocessable-entity-error';

const getValidCreateShopBody = () => ({
    handle: 'thehandle',
    name: 'the_name',
});

describe('createShopKoaSerializer()', () => {
    test('succeed if the request is valid', async () => {
        // Given
        const createShopKoaSerializer = new CreateShopKoaSerializer();
        const ctx = {
            request: {
                body: getValidCreateShopBody(),
            },
        };

        // When
        // @ts-ignore
        const result = createShopKoaSerializer.deserializeRequest(ctx);

        // Then
        expect(result).toEqual({ handle: 'thehandle', name: 'the_name' });
    });

    test('fails if no shop handle is provided', async () => {
        // Given
        const getShopKoaSerializer = new GetShopKoaSerializer();
        const ctx = {
            request: {
                body: {
                    ...getValidCreateShopBody(),
                    handle: undefined,
                },
            },
        };

        // When
        // @ts-ignore
        const ft = () => getShopKoaSerializer.deserializeRequest(ctx);

        // Then
        expect(ft).toThrow(UnprocessableEntityError);
    });

    test('fails if no shop name is provided', async () => {
        // Given
        const getShopKoaSerializer = new GetShopKoaSerializer();
        const ctx = {
            request: {
                body: {
                    ...getValidCreateShopBody(),
                    name: undefined,
                },
            },
        };

        // When
        // @ts-ignore
        const ft = () => getShopKoaSerializer.deserializeRequest(ctx);

        // Then
        expect(ft).toThrow(UnprocessableEntityError);
    });
});
