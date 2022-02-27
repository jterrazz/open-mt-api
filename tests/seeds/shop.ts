import { IPrismaDatabase } from '@infrastructure/orm/prisma/prisma-database';
import { randomUUID } from 'crypto';
import type { Shop } from '@prisma/client';

export const seedDatabaseWithShop = async (
    database: IPrismaDatabase, // TODO IPrismaDatabase['client']
    partialShop: Partial<Shop> = {},
) => {
    // TODO Add type, remove information in naming,
    const newShopInformation = {
        handle: randomUUID(),
        name: 'the-shop-name',
        ...partialShop,
    };

    await database.client.shop.create({
        data: newShopInformation,
    });

    return newShopInformation;
};
