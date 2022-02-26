import { AuthenticationRequiredError } from '@domain/error/authentication-required-error';
import { ICheckPasswordAgainstUser } from '@domain/user/check-password-against-user';
import { ILogger } from '@application/contracts';
import { IUserRepository } from '@domain/user/user-repository';

export const authenticateUserWithEmailFactory = (
    logger: ILogger,
    userRepository: IUserRepository,
    checkPasswordAgainstUser: ICheckPasswordAgainstUser,
) => {
    return async (email: string, password: string) => {
        logger.debug(`authenticating user with email ${email}`);

        const userEntity = await userRepository.getByEmail(email);

        if (!userEntity) {
            throw new AuthenticationRequiredError();
        }

        const passwordIsValid = checkPasswordAgainstUser(password, userEntity);

        if (!passwordIsValid) {
            throw new AuthenticationRequiredError();
        }

        return userEntity;
    };
};
