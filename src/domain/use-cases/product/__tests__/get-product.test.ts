import { createMockOfProductEntity } from '@domain/use-cases/product/__mocks__/product.entity.mock';
import { createMockOfProductRepository } from '@domain/use-cases/product/__mocks__/product.repository.mock';
import { getProductFactory } from '@domain/use-cases/product/get-product';

describe('getProduct()', () => {
    test('returns a product', async () => {
        // Given
        const productRepository = createMockOfProductRepository();
        const getProduct = getProductFactory(productRepository);

        // When
        const product = await getProduct(1);

        // Then
        expect(product).toEqual(createMockOfProductEntity());
    });
});
