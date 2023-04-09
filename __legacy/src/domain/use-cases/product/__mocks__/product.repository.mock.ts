import { IProductRepository } from '../product.repository';

import { createMockOfProductEntity } from './product.entity.mock';

export const createMockOfProductRepository = (
    partialProductRepository: Partial<jest.Mocked<IProductRepository>> = {},
): jest.Mocked<IProductRepository> => {
    return {
        add: jest.fn().mockImplementation(async (input) => input),
        findByProductId: jest.fn().mockResolvedValue(createMockOfProductEntity()),
        update: jest.fn().mockImplementation(async (_, input) => input),
        ...partialProductRepository,
    };
};
