import { ProductEntity } from '@domain/product/product.entity';
import { createMockProjectDependencies } from '@configuration/project-dependencies.mock';
import { createMockTracker } from '@application/contracts/tracker.mock';
import { createNewProductFactory } from '@application/use-cases/products/create-new-product';

describe('use-case - create new product', function () {
    it('should create a new product for a given user', async function () {
        // Given
        const product: ProductEntity = {
            id: 'the-product-id',
            name: 'the-product-name',
            price: {
                amount: 42,
                currency: 'EUR',
            },
        };
        const createNewProduct = createNewProductFactory(
            createMockProjectDependencies().dependencies,
            createMockTracker(),
        );

        // When
        const result = await createNewProduct(product);

        // Then
        expect(result).toEqual(product);
    });
});
