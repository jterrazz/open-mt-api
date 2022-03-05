import { IShopRepository } from '@domain/shop/shop-repository';
import { PrismaClient } from '@prisma/client';

export const shopRepositoryPrismaFactory = (
    prismaClient: PrismaClient,
): IShopRepository => ({
    findByHandle: async (handle) => {
        const persistedShop = await prismaClient.shop.findFirst({
            include: {
                bannerImage: true,
            },
            where: {
                handle,
            },
        });

        if (!persistedShop) return null;

        return {
            bannerImageUrl: persistedShop.bannerImage?.filename || null, // TODO replace by URL
            countFollowers: persistedShop.countOfFollowers,
            creationDate: persistedShop.createdAt,
            description: persistedShop.description,
            handle: persistedShop.handle,
            name: persistedShop.name,
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
