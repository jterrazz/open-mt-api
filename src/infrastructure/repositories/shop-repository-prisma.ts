import { IShopRepository } from '@domain/shop/shop-repository';
import { PrismaClient } from '@prisma/client';

export const shopRepositoryPrismaFactory = (
    prismaClient: PrismaClient,
): IShopRepository => ({
    findByHandle: async (handle) => {
        const persistedShop = await prismaClient.shop.findFirst({
            where: {
                handle,
            },
        });

        if (!persistedShop) return null;

        return {
            bannerImageUrl: null,
            countFollowers: 0,
            creationDate: new Date(),
            // TODO replace
            description: persistedShop.description,
            handle: persistedShop.handle,
            name: persistedShop.name,
            // TODO replace
        };
    },
    merge: async (entity) => {
        return entity;
    },
    persist: async (entity) => {
        const persistedShop = await prismaClient.shop.create({
            data: {
                countOfFollowers: entity.countFollowers,
                description: entity.description,
                handle: entity.handle,
                name: entity.name,
            },
        });

        return {
            bannerImageUrl: null,
            countFollowers: 0,
            creationDate: new Date(),
            description: null,
            handle: persistedShop.handle,
            name: persistedShop.name,
        };
    },
});
