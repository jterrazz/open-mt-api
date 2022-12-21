import { IShopRepository } from '@domain/use-cases/shop/shop.repository';
import { createMockOfShopEntity } from '@domain/use-cases/shop/__mocks__/shop.entity.mock';

export const createMockOfShopRepository = (
    partialShopRepository: Partial<jest.Mocked<IShopRepository>> = {},
): jest.Mocked<IShopRepository> => ({
    add: jest.fn().mockImplementation(async (input) => input),
    findByHandle: jest.fn().mockResolvedValue(createMockOfShopEntity()),
    findByOwnerId: jest.fn().mockResolvedValue(createMockOfShopEntity()),
    findManyByFollowerUserId: jest.fn().mockResolvedValue([]),
    update: jest.fn().mockImplementation(async (input) => input),
    ...partialShopRepository,
});
