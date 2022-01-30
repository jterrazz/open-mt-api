import { IDatabase } from '@application/contracts';
import { IShopRepository } from '@domain/shop/shop-repository';

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
            const persistedShop = await database.client.shop.create({
                data: {
                    description: entity.description,
                    handle: entity.handle,
                    name: entity.name,
                },
            });

            return {
                creationDate: new Date(),
                handle: persistedShop.handle,
                name: persistedShop.name,
                numberOfFollowers: 0,
            };
        },
    };
};
