import { IDatabase } from '@application/contracts';
import { IShopRepository } from '@domain/shop/shop.repository';

export const shopRepositoryPrismaFactory = (
    database: IDatabase,
): IShopRepository => {
    return {
        findByHandle: async (handle) => {
            return null;
        },
        merge: async (entity) => {
            return entity;
        },
        persist: async (entity) => {
            return entity;
        },
    };
};
