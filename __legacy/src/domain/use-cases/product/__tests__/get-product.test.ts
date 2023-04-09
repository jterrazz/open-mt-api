import { createMockOfProductEntity } from '../__mocks__/product.entity.mock';
import { createMockOfProductRepository } from '../__mocks__/product.repository.mock';
import { getProductFactory } from '../get-product';

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
