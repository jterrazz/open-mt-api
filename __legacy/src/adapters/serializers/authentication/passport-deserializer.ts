import { IUserRepository } from '@domain/use-cases/user/user.repository';
import { NotFoundClientError } from '@domain/use-cases/error/client/not-found-client-error';
import { UserEntity } from '@domain/use-cases/user/user.entity';

export const passportDeserializerFactory = (
    userRepository: IUserRepository,
) => {
    return async (
        userId: number,
        done: (err: Error | null, user?: UserEntity | null) => void,
    ) => {
        try {
            const user = await userRepository.findById(userId);

            if (!user) {
                return done(new NotFoundClientError('User not found'));
            }

            done(null, user);
        } catch (err) {
            done(err);
        }
    };
};
