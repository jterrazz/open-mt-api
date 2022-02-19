import { IShopRepository } from '@domain/shop/shop-repository';
import { PrismaClient } from '@prisma/client';

export const shopRepositoryPrismaFactory = (
    prismaClient: PrismaClient,
): IShopRepository => {
    return {
        findByHandle: async (handle) => {
            return null;
        },
        merge: async (entity) => {
            return entity;
        },
        persist: async (entity) => {
            const persistedShop = await prismaClient.shop.create({
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
