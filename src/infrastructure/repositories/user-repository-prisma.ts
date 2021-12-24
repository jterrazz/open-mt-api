import { IDatabase } from '@application/contracts';
import { IUserRepository } from '@domain/user/user.repository';
import { UserEntity } from '@domain/user/user.entity';

export const userRepositoryPrismaFactory = (
    database: IDatabase,
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
