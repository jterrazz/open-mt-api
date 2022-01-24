import { createMockOfShopEntity } from '@domain/shop/shop-entity.mock';
import { createMockOfShopRepository } from '@domain/shop/shop-repository.mock';
import { createShopFactory } from '@application/use-cases/shop/create-shop';

describe('use-case - createShop()', function () {
    const mockOfANewShop = {
        handle: 'the-shop-handle',
        name: 'the-shop-name',
    };

    test.concurrent(
        'save a shop and return its public properties',
        async () => {
            // When
            const createShop = createShopFactory(createMockOfShopRepository());
            const result = await createShop(mockOfANewShop);

            // Then
            expect(result).toEqual(createMockOfShopEntity());
        },
    );

    test.concurrent('doesnt save a shop if it cant save it', async () => {
        // Given
        const shopRepository = createMockOfShopRepository();

        shopRepository.persist.mockRejectedValue(new Error());

        // When
        const createShop = createShopFactory(shopRepository);
        const ft = () => createShop(mockOfANewShop);

        // Then
        await expect(ft).rejects.toThrow();
    });
});
