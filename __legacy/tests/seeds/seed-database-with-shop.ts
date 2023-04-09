import type { Shop } from '@prisma/client';
import { User } from '@prisma/client';
import { randomUUID } from 'crypto';

import { generateRandomId } from '@domain/../../src/domain/utils/maths/maths';

import { IPrismaDatabase } from '@infrastructure/../../src/infra/orm/database/database-database';

import { seedDatabaseWithUser } from './seed-database-with-user';

export const seedDatabaseWithShop = async (
    databaseClient: IPrismaDatabase['client'],
    partialShop: Partial<Shop> = {},
    ownerId?: number,
) => {
    let user: User | undefined;

    if (!ownerId) {
        const seededUser = await seedDatabaseWithUser(databaseClient);
        ownerId = seededUser.id;
        user = seededUser;
    }

    const shop = await databaseClient.shop.create({
        data: {
            bannerImageId: null,
            countOfFollowers: 0,
            createdAt: new Date(),
            description: 'the_shop_description',
            handle: randomUUID(),
            id: Math.floor(generateRandomId()),
            name: 'the_shop_name',
            userId: ownerId,
            ...partialShop,
        },
    });

    return {
        ownerId,
        shop,
        user,
    };
};
