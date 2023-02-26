import { AuthenticateUserWithEmail } from '@application/../../../domain/authentication/authenticate-user-with-email';
import { AuthenticationRequiredClientError } from '@domain/use-cases/error/client/authentication-required-client-error';
import { Strategy } from 'passport-local';

// Call this strategy with passport.authenticate('local');

export const localPassportStrategyFactory = (
    authenticateUserWithEmail: AuthenticateUserWithEmail,
) => {
    return new Strategy({ passwordField: 'password', usernameField: 'email' }, async function (
        email,
        password,
        done,
    ) {
        const userEntity = await authenticateUserWithEmail(email, password).catch((error) => {
            if (error instanceof AuthenticationRequiredClientError) {
                return done(null, false);
            }

            return done(error);
        });

        return done(null, userEntity);
    });
};
