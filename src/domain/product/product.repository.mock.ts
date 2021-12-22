import { IProductRepository } from './product.repository';

export const createMockProductRepository = (): IProductRepository => {
    return {
        findById: jest.fn(),
        merge: jest.fn(),
        persist: jest.fn(),
    };
};
