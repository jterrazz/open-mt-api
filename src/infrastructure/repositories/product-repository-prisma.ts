import { IProductRepository } from '@domain/product/product-repository';
import { PrismaClient } from '@prisma/client';

export const productRepositoryPrismaFactory = (
    prismaClient: PrismaClient,
): IProductRepository => ({
    findById: async (id) => {
        const persistedProduct = await prismaClient.product.findFirst({
            where: {
                id,
            },
        });

        if (!persistedProduct) {
            return null;
        }

        return {
            id: persistedProduct.id,
            name: persistedProduct.name,
            priceCentsAmount: persistedProduct.priceCentsAmount,
            priceCurrency: persistedProduct.priceCurrency,
        };
    },
    merge: async (product) => {
        return product;
    },
    persist: async (product) => {
        return product;
    },
});
