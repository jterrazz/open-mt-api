import { AuthenticationRequiredClientError } from '@domain/use-cases/error/client/authentication-required-client-error';
import { CheckPassword } from '../../utils/encryption/encryption-domain/check-password';
import { ILogger } from '~/domain';
import { IUserRepository } from '@domain/use-cases/user/user.repository';
import { UserEntity } from '@domain/use-cases/user/user.entity';

export type AuthenticateUserWithEmail = (
    email: string,
    password: string,
) => Promise<UserEntity>;

export const authenticateUserWithEmailFactory = (
    logger: ILogger,
    userRepository: IUserRepository,
    checkPassword: CheckPassword,
): AuthenticateUserWithEmail => {
    return async (email, password) => {
        logger.debug(`authenticating user ${email}`);

        const userEntity = await userRepository.findByEmail(email);

        if (!userEntity) {
            logger.debug(
                `failed to authenticate user ${email} because its email does not exist`,
            );
            throw new AuthenticationRequiredClientError();
        }

        const passwordIsValid = await checkPassword(
            password,
            userEntity.authentication.hashedPassword,
        );

        if (!passwordIsValid) {
            logger.debug(
                `failed to authenticate user ${email} because its password is wrong`,
            );
            throw new AuthenticationRequiredClientError();
        }

        logger.debug(`successfully authenticated user ${email}`);

        return userEntity;
    };
};
