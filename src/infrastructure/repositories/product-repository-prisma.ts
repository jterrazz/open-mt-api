import { IProductRepository } from '@domain/product/product-repository';
import { PrismaClient } from '@prisma/client';
import { ProductEntity } from '@domain/product/product-entity';

const mockResult: ProductEntity = {
    id: 'id',
    name: '',
    price: {
        amount: 42,
        currency: 'EUR',
    },
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
