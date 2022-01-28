import { after, before } from 'lodash';
import { createMockOfShopRepository } from '@domain/shop/shop-repository.mock';
import { createShopFactory } from '@application/use-cases/shop/create-shop';
import { useFakeTimers, useRealTimers } from '@tests/utils/jest';

beforeAll(() => {
    useFakeTimers();
});

afterAll(() => {
    useRealTimers();
});

describe('shop controller', function () {
    describe('createShop()', function () {
        test('create shop and send back public properties', async () => {
            // Given
            const mockShopRepository = createMockOfShopRepository();
            const givenParams = {
                handle: '',
                name: 'name',
            };
            const expectedResult = {
                bannerImageUrl: undefined,
                creationDate: new Date(),
                description: undefined,
                handle: '',
                name: 'name',
                numberOfFollowers: 42,
            };

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
