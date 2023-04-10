import type { Product } from '@prisma/client';
import { Shop, User } from '@prisma/client';

import { generateRandomId } from '@domain/../../src/domain/helpers/maths/maths';

import { IPrismaDatabase } from '@infrastructure/../../src/infra/orm/database/database-database';

import { seedDatabaseWithShop } from './seed-database-with-shop';

export const seedDatabaseWithProduct = async (
    databaseClient: IPrismaDatabase['client'],
    partialProduct: Partial<Product> = {},
    shopId?: number,
) => {
    let shop: Shop | undefined, user: User | undefined;

    if (!shopId) {
        const { shop: seededShop, user: seededUser } = await seedDatabaseWithShop(databaseClient, {
            name: 'the_shop_to_seed_products',
        });

        shopId = seededShop.id;
        shop = seededShop;
        user = seededUser;
    }

    const product = await databaseClient.product.create({
        data: {
            description: 'the_product_description',
            id: Math.floor(generateRandomId()),
            name: 'the_product_name',
            priceCentsAmount: 1,
            priceCurrency: 'EUR',
            shopId,
            ...partialProduct,
        },
    });

    return {
        product,
        shop,
        user,
    };
};
