import { IDatabase } from '@application/contracts';
import { IProductRepository } from '@domain/product/product.repository';
import { ProductEntity } from '@domain/product/product.entity';

const mockResult: ProductEntity = {
    id: 'id',
    name: '',
    price: {
        amount: 42,
        currency: 'EUR',
    },
};

export const productRepositoryPrisma = (
    database: IDatabase,
): IProductRepository => {
    return {
        findById: async (id) => {
            return mockResult;
        },
        merge: async (product) => {
            return product;
        },
        persist: async (product) => {
            return product;
        },
    };
};
