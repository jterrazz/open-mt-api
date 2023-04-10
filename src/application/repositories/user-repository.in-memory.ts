import { User } from '@domain/user/user';

import { UserRepository } from '@ports/repositories/user-repository';

export const userRepositoryInMemoryFactory = (): UserRepository => {
    const users: User[] = [
        {
            email: '',
            id: '1',
        },
    ];

    return {
        findUserById: async (id: string) => {
            return users.find((user) => user.id === id) || null;
        },
    };
};
