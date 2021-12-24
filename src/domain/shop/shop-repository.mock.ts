import { createMockShopEntity } from '@domain/shop/shop-entity.mock';

export const createMockShopRepository = () => ({
    findByHandle: jest.fn().mockResolvedValue(createMockShopEntity()),
    merge: jest.fn().mockResolvedValue(createMockShopEntity()),
    persist: jest.fn().mockResolvedValue(createMockShopEntity()),
});
