import { ILogger } from '@application/contracts';
import { IUserRepository } from '@domain/user/user-repository';

export const getUserPublicProfileFactory = (
    logger: ILogger,
    userRepository: IUserRepository,
) => {
    return async (
        userHandle: string,
    ): Promise<{
        firstName: string;
        lastName: string;
    } | null> => {
        const user = await userRepository.findByHandle(userHandle);

        return (
            user && {
                firstName: user.firstName,
                lastName: user.lastName,
            }
        );
    };
};
