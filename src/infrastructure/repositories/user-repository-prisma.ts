import { IUserRepository } from '@domain/user/user-repository';
import { PrismaClient } from '@prisma/client';
import { UserEntity } from '@domain/user/user-entity';

export const userRepositoryPrismaFactory = (
    prismaClient: PrismaClient,
): IUserRepository => {
    return {
        async getByHandle(handle) {
            return {
                biography: '',
                firstName: '',
                handle: '',
                id: '',
                lastName: '',
            };
        },
        async persist(user: UserEntity): Promise<void> {},
    };
};
