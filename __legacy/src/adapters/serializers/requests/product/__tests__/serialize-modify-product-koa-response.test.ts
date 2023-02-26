// Create tests for serializeModifyProductKoaResponse
import { ProductEntity } from '@domain/use-cases/product/product.entity';
import { createMockOfInitiatedKoaContext } from '@infrastructure/../../../../../application/server/__tests__/initiated-koa-context.mock';
import { serializeModifyProductKoaResponse } from '../serialize-modify-product-koa-response';

describe('serializeModifyProductKoaResponse', () => {
    test('should return a serialized product', () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext();
        const modifiedProduct: ProductEntity = {
            id: 1,
            name: 'Product 1',
            priceCentsAmount: 100,
            priceCurrency: 'EUR',
            shopId: 1,
        };

        // When
        serializeModifyProductKoaResponse(ctx, modifiedProduct);

        // Then
        expect(ctx.body).toEqual({
            id: 1,
            name: 'Product 1',
            priceCentsAmount: 100,
            priceCurrency: 'EUR',
        });
    });
});
