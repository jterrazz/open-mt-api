import { ILogger } from '~/domain';

import { CheckPassword } from '../../utils/encryption/encryption-domain/check-password';
import { AuthenticationRequiredClientError } from '../error/client/authentication-required-client-error';
import { UserEntity } from '../user/user.entity';
import { IUserRepository } from '../user/user.repository';

export type AuthenticateUserWithEmail = (email: string, password: string) => Promise<UserEntity>;

export const authenticateUserWithEmailFactory = (
    logger: ILogger,
    userRepository: IUserRepository,
    checkPassword: CheckPassword,
): AuthenticateUserWithEmail => {
    return async (email, password) => {
        logger.debug(`authenticating user ${email}`);

        const userEntity = await userRepository.findByEmail(email);

        if (!userEntity) {
            logger.debug(`failed to authenticate user ${email} because its email does not exist`);
            throw new AuthenticationRequiredClientError();
        }

        const passwordIsValid = await checkPassword(
            password,
            userEntity.authentication.hashedPassword,
        );

        if (!passwordIsValid) {
            logger.debug(`failed to authenticate user ${email} because its password is wrong`);
            throw new AuthenticationRequiredClientError();
        }

        logger.debug(`successfully authenticated user ${email}`);

        return userEntity;
    };
};
