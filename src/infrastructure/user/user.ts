import { GetUser } from '@domain/user/user';

import { UserRepository } from '@ports/repositories/user-repository';

export const getUserFactory = (userRepository: UserRepository): GetUser => {
    return async (id: number) => {
        // return await userRepository.findUserById(id); FIXME

        return {
            email: 'the-email@example.com',
            id: 42,
        };
    };
};
