import { UserEntity } from '@domain/../../../domain/use-cases/user/user.entity';

export const passportSerializer = (
    user: UserEntity,
    done: (err: Error | null, userId?: number) => void,
) => {
    done(null, user.id);
};
