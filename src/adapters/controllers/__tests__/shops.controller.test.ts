import { createMockProjectDependencies } from '@configuration/project-dependencies.mock';
import { createMockShopRepository } from '@domain/shop/shop-repository.mock';
import { createNewShopFactory } from '@application/use-cases/shops/create-new-shop';

describe('shops controller', function () {
    describe('createNewShop()', function () {
        test.concurrent('creates a new shop', async () => {
            // Given
            const mockShopRepository = createMockShopRepository();
            const givenParams = {
                name: 'name',
            };
            const expectedResult = {
                adminId: '',
                bannerImageUrl: '',
                description: '',
                name: 'name',
                numberOfFollowers: 42,
            };
            mockShopRepository.persist.mockResolvedValue(expectedResult);

            // When
            const createNewShop = createNewShopFactory(mockShopRepository);
            const result = await createNewShop(givenParams);

            // Then
            expect(result).toEqual(expectedResult);
            expect(mockShopRepository.persist).toHaveBeenCalledWith(
                expectedResult,
            );
        });
    });
});
