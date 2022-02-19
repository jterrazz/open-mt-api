import { IPrismaDatabase } from '@infrastructure/orm/prisma/prisma-database';
import { randomUUID } from 'crypto';
import type { Shop } from '@prisma/client';

export const createSeedOfShop = async (
    database: IPrismaDatabase,
    partialShopInformation: Partial<Shop> = {},
) => {
    const newShopInformation = {
        handle: randomUUID(),
        name: 'the-shop-name',
        ...partialShopInformation,
    };

    await database.client.shop.create({
        data: newShopInformation,
    });

    return newShopInformation;
};
