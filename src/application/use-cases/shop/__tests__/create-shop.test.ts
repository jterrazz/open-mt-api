import { createMockOfShopRepository } from '@domain/shop/__tests__/shop-repository.mock';
import { createShopFactory } from '@application/use-cases/shop/create-shop';
import { useFakeTimers, useRealTimers } from '@tests/utils/jest';

beforeAll(() => {
    useFakeTimers();
});

afterAll(() => {
    useRealTimers();
});

describe('use-case - createShop()', function () {
    const mockOfANewShop = {
        handle: 'the-shop-handle',
        name: 'the-shop-name',
    };

    test('save a shop and return its public properties', async () => {
        // When
        const mockOfShopRepository = createMockOfShopRepository();
        const createShop = createShopFactory(mockOfShopRepository);
        const result = await createShop(mockOfANewShop);

        // Then
        expect(mockOfShopRepository.persist).toHaveBeenCalledWith({
            bannerImageUrl: null,
            creationDate: new Date(),
            description: null,
            handle: 'the-shop-handle',
            name: 'the-shop-name',
            numberOfFollowers: 42,
        });
        expect(result).toEqual({
            handle: 'the-shop-handle',
            name: 'the-shop-name',
        });
    });

    test('throws when failing to save a shop', async () => {
        // Given
        const shopRepository = createMockOfShopRepository();

        shopRepository.persist.mockRejectedValue(new Error('persist-error'));

        // When
        const createShop = createShopFactory(shopRepository);
        const ft = () => createShop(mockOfANewShop);

        // Then
        await expect(ft).rejects.toThrow('persist-error');
    });
});
