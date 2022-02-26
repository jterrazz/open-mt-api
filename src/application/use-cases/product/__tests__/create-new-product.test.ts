import { ProductEntity } from '@domain/product/product-entity';
import { createMockOfProductRepository } from '@domain/product/product-repository.mock';
import { createMockOfTrackerRepository } from '@application/contracts/tracker.mock';
import { createNewProductFactory } from '@application/use-cases/product/create-product';

describe('use-case - create new product', function () {
    it('create a new product for the authenticated user', async function () {
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
            createMockOfProductRepository(),
            createMockOfTrackerRepository(),
        );

        // When
        const result = await createNewProduct(product);

        // Then
        expect(result).toEqual(product);
    });
});
