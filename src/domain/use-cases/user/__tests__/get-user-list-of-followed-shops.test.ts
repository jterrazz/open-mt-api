import { createMockOfShopEntity } from '@domain/use-cases/shop/__mocks__/shop.entity.mock';
import { createMockOfShopRepository } from '@domain/use-cases/shop/__mocks__/shop.repository.mock';
import { createMockOfUserEntity } from '@domain/use-cases/user/__mocks__/user-entity.mock';
import { getUserListOfFollowedShopsFactory } from '@domain/use-cases/user/get-user-list-of-followed-shops';

const mockOfFollowedShop = createMockOfShopEntity();
const mockOfShopRepository = createMockOfShopRepository({
    findManyByFollowerUserId: jest.fn().mockResolvedValue([mockOfFollowedShop]),
});
const getUserListOfFollowedShops =
    getUserListOfFollowedShopsFactory(mockOfShopRepository);

describe('getUserListOfFollowedShops()', () => {
    test('returns the list of followed shops', async () => {
        // Given
        const authenticatedUser = createMockOfUserEntity();

        // When
        const result = await getUserListOfFollowedShops(authenticatedUser);

        // Then
        expect(result).toEqual([mockOfFollowedShop]);
    });
});
