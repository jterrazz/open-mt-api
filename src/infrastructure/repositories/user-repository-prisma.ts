import { IUserRepository } from '@domain/user/user-repository';
import { PrismaClient } from '@prisma/client';
import { UserEntity } from '@domain/user/user-entity';
import { createMockOfUser } from '@domain/user/__tests__/user-entity.mock';

export const userRepositoryPrismaFactory = (
    prismaClient: PrismaClient,
): IUserRepository => {
    return {
        async getByEmail(handle) {
            return createMockOfUser(); // TODO
        },
        async getByHandle(handle) {
            return createMockOfUser(); // TODO
        },
        async persist(user: UserEntity): Promise<void> {},
    };
};
