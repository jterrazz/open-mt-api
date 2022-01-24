import { createMockOfDependencies } from '@configuration/dependencies.mock';
import { createMockOfShopRepository } from '@domain/shop/shop-repository.mock';
import { createShopFactory } from '@application/use-cases/shop/create-shop';

describe('shop controller', function () {
    describe('createNewShop()', function () {
        test.concurrent('creates a new shop', async () => {
            // Given
            const mockShopRepository = createMockOfShopRepository();
            const givenParams = {
                handle: '',
                name: 'name',
            };
            const expectedResult = {
                bannerImageUrl: undefined,
                description: undefined,
                handle: '',
                name: 'name',
                numberOfFollowers: 42,
            };
            mockShopRepository.persist.mockResolvedValue(expectedResult);

            // When
            const createNewShop = createShopFactory(mockShopRepository);
            const result = await createNewShop(givenParams);

            // Then
            expect(result).toEqual(expectedResult);
            expect(mockShopRepository.persist).toHaveBeenCalledWith(
                expectedResult,
            );
        });
    });
});
