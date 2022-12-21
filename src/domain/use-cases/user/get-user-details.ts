import { ILogger } from '~/domain';
import { IUserRepository } from '@domain/use-cases/user/user.repository';
import { UserEntity } from '@domain/use-cases/user/user.entity';

export type GetUserDetails = (id: number) => Promise<UserEntity | null>;

export const getUserDetailsFactory = (
    logger: ILogger,
    userRepository: IUserRepository,
): GetUserDetails => {
    return async (id) => {
        return userRepository.findById(id);
    };
};
