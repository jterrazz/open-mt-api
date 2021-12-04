import { ILogger } from '@application/contracts/ILogger';
import { IUserRepository } from '@application/contracts/repositories/IUserRepository';

export const getUserPublicProfileFactory = (
    logger: ILogger,
    userRepository: IUserRepository,
) => {
    return (userHandle: string) => {
        return userRepository.getByHandle(userHandle);
    };
};
