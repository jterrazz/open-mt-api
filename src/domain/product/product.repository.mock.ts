import { IProductRepository } from './product.repository';

export const createMockOfProductRepository = (): IProductRepository => {
    return {
        findById: jest.fn(),
        merge: jest.fn(),
        persist: jest.fn(),
    };
};
