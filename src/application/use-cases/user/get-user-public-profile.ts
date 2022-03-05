import { ILogger } from '@application/contracts';
import { IUserRepository } from '@domain/user/user-repository';

export const getUserPublicProfileFactory = (
    logger: ILogger,
    userRepository: IUserRepository,
) => {
    return (userHandle: string) => {
        return userRepository.findByHandle(userHandle);
    };
};
