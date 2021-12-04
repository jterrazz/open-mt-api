import { IDatabaseService } from '@application/contracts/IDatabaseService';
import { IUserRepository } from '@application/contracts/repositories/IUserRepository';
import { User } from '@entities/user';

export const userRepositoryPrismaFactory = (
    database: IDatabaseService,
): IUserRepository => {
    return {
        async getByHandle(handle: string): Promise<User> {
            return {
                accounts: [],
                biography: '',
                firstName: '',
                handle: '',
                id: '',
                lastName: '',
            };
        },
        async persist(user: User): Promise<void> {},
    };
};
