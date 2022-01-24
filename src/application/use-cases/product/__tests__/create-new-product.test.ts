import { ProductEntity } from '@domain/product/product.entity';
import { createMockOfDependencies } from '@configuration/dependencies.mock';
import { createMockOfTracker } from '@application/contracts/tracker.mock';
import { createNewProductFactory } from '@application/use-cases/product/create-product';

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
            createMockOfDependencies(),
            createMockOfTracker(),
        );

        // When
        const result = await createNewProduct(product);

        // Then
        expect(result).toEqual(product);
    });
});
