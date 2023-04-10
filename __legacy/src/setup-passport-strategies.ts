import passport from 'koa-passport';
import { Strategy } from 'passport';

import { UserEntity } from '@domain/../../../__legacy/src/domain/use-cases/user/user.entity';

export const setupPassportStrategiesFactory = (
    passportStrategies: Strategy[],
    passportSerializer: (
        user: UserEntity,
        done: (err: Error | null, userId?: number) => void,
    ) => void,
    passportDeserializer: (
        userId: number,
        done: (err: Error | null, user?: UserEntity | null) => void,
    ) => void,
) => {
    return () => {
        passport.serializeUser(passportSerializer);
        passport.deserializeUser(passportDeserializer);

        for (const strategy of passportStrategies) {
            passport.use(strategy);
        }
    };
};
