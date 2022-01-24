import { createMockOfShopEntity } from '@domain/shop/shop-entity.mock';

export const createMockOfShopRepository = () => ({
    findByHandle: jest.fn().mockResolvedValue(createMockOfShopEntity()),
    merge: jest.fn().mockResolvedValue(createMockOfShopEntity()),
    persist: jest.fn().mockResolvedValue(createMockOfShopEntity()),
});
