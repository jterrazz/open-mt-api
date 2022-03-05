import { IProductRepository } from '@domain/product/product-repository';
import { PrismaClient } from '@prisma/client';
import { ProductEntity } from '@domain/product/product-entity';

const mockResult: ProductEntity = {
    id: 'id',
    name: '',
    priceCentsAmount: 4200,
    priceCurrency: 'EUR',
};

export const productRepositoryPrismaFactory = (
    prismaClient: PrismaClient,
): IProductRepository => ({
    findById: async (id) => {
        return mockResult;
    },
    merge: async (product) => {
        return product;
    },
    persist: async (product) => {
        return product;
    },
});
