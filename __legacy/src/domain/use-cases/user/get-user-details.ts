import { ILogger } from '~/domain';

import { UserEntity } from './user.entity';
import { IUserRepository } from './user.repository';

export type GetUserDetails = (id: number) => Promise<UserEntity | null>;

export const getUserDetailsFactory = (
    logger: ILogger,
    userRepository: IUserRepository,
): GetUserDetails => {
    return async (id) => {
        return userRepository.findById(id);
    };
};
