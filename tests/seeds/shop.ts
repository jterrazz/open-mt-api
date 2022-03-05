import { IPrismaDatabase } from '@infrastructure/orm/prisma/prisma-database';
import { generateRandomId } from '@tests/utils/math';
import { randomUUID } from 'crypto';
import type { Shop } from '@prisma/client';

export const seedDatabaseWithShop = async (
    database: IPrismaDatabase, // TODO IPrismaDatabase['client']
    partialShop: Partial<Shop> = {},
) => {
    // TODO Add type, remove information in naming,
    const newShopInformation: Shop = {
        bannerImageId: null,
        countOfFollowers: 42,
        createdAt: new Date(),
        description: 'the_shop_description',
        handle: randomUUID(),
        id: Math.floor(generateRandomId()),
        name: 'the_shop_name',
        ...partialShop,
    };

    await database.client.shop.create({
        data: newShopInformation,
    });

    return newShopInformation;
};
