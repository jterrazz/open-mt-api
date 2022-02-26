import { IUserRepository } from '@domain/user/user-repository';
import { createMockOfUser } from '@domain/user/__tests__/user-entity.mock';

export const createMockOfUserRepository = (): jest.Mocked<IUserRepository> => ({
    getByEmail: jest.fn().mockResolvedValue(createMockOfUser()),
    getByHandle: jest.fn().mockResolvedValue(createMockOfUser()),
    persist: jest.fn().mockImplementation(async (input) => input),
});
