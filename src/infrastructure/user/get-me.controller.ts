import { GetMeController } from '@domain/user/get-me.controller';

import { Logger } from '@ports/logger';
import { UserRepository } from '@ports/repositories/user-repository';

export const getMeControllerFactory = (
    userRepository: UserRepository,
    logger: Logger,
): GetMeController => {
    return async (id: number) => {
        // const user = await userRepository.findUserById(id);
        //
        // if (user === null) {
        //     logger.error('authenticated user not found');
        //     throw new NotFoundError('user not found'); // TODO Test
        // }

        return {
            email: 'the-email@example.com',
            id: 42,
        };
    };
};
