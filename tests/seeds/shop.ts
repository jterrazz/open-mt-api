import { IDatabase } from '@application/contracts';
import type { Shop } from '@prisma/client';

export const createSeedOfShop = async (
    database: IDatabase,
    partialShopInformation: Partial<Shop> = {},
) => {
    const newShopInformation = {
        handle: 'the-shop-handle',
        name: 'the-shop-name',
        ...partialShopInformation,
    };

    await database.client.shop.create({
        data: newShopInformation,
    });

    return newShopInformation;
};
