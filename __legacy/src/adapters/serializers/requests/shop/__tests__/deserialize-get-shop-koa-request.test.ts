import { UnprocessableEntityClientError } from '@domain/use-cases/error/client/unprocessable-entity-client-error';
import { createMockOfInitiatedKoaContext } from '@infrastructure/../../../../../application/server/__tests__/initiated-koa-context.mock';
import { deserializeGetShopKoaRequest } from '../deserialize-get-shop-koa-request';

describe('deserializeGetShopKoaRequest()', () => {
    test('succeeds if all params are provided', async () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext({
            params: { shopHandle: 'the_handle' },
        });

        // When
        const result = deserializeGetShopKoaRequest(ctx);

        // Then
        expect(result).toEqual({ shopHandle: 'the_handle' });
    });

    test('fails if no shop handle is provided', async () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext({ params: {} });

        // When
        const ft = () => deserializeGetShopKoaRequest(ctx);

        // Then
        expect(ft).toThrow(UnprocessableEntityClientError);
    });
});
