import { AuthenticationRequiredError } from '@domain/error/client/authentication-required-error';
import { ICheckPassword } from '../../contracts/encryption/check-password';
import { ILogger } from '@application/contracts';
import { IUserRepository } from '@domain/user/user-repository';

export const authenticateUserWithEmailFactory = (
    logger: ILogger,
    userRepository: IUserRepository,
    checkPassword: ICheckPassword,
) => {
    return async (email: string, password: string) => {
        logger.debug(`authenticating user ${email}`);

        const userEntity = await userRepository.findByEmail(email);

        if (!userEntity) {
            logger.debug(
                `failed to authenticate user ${email} because its email does not exist`,
            );
            throw new AuthenticationRequiredError();
        }

        const passwordIsValid = checkPassword(
            password,
            userEntity.hashedPassword,
        );

        if (!passwordIsValid) {
            logger.debug(
                `failed to authenticate user ${email} because its password is wrong`,
            );
            throw new AuthenticationRequiredError();
        }

        logger.debug(`successfully authenticated user ${email}`);

        return userEntity;
    };
};
