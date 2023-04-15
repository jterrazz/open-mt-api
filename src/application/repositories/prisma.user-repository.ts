import { PrismaClient } from '@prisma/client';

import { Logger } from '@ports/logger';
import { UserRepository } from '@ports/repositories/user-repository';

export const prismaUserRepositoryFactory = (
    logger: Logger,
    prismaClient: PrismaClient,
): UserRepository => {
    return {
        findUserById: async (id: number) => {
            logger.debug(`finding user by id: ${id}`);

            return prismaClient.user.findUnique({
                where: {
                    id,
                },
            });
        },
    };
};
