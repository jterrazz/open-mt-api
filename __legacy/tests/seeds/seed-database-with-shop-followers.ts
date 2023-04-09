import { Shop, User } from '@prisma/client';

import { IPrismaDatabase } from '@infrastructure/../../src/infra/orm/database/database-database';

import { seedDatabaseWithShop } from './seed-database-with-shop';
import { seedDatabaseWithUser } from './seed-database-with-user';

export const seedDatabaseWithShopsFollowers = async (
    databaseClient: IPrismaDatabase['client'],
    userId?: number,
    shopId?: number,
) => {
    let shop: Shop | undefined, user: User | undefined;

    if (!userId) {
        const seededUser = await seedDatabaseWithUser(databaseClient);
        userId = seededUser.id;
        user = seededUser;
    }
    if (!shopId) {
        const seededShop = await seedDatabaseWithShop(databaseClient);
        shopId = seededShop.shop.id;
        shop = seededShop.shop;
    }

    await databaseClient.shopsFollowedByUsers.create({
        data: {
            shopId,
            userId,
        },
    });

    return {
        shop,
        shopId,
        user,
        userId,
    };
};
