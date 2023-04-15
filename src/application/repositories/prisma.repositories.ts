import { PrismaClient } from '@prisma/client';

import { prismaUserRepositoryFactory } from '@application/repositories/prisma.user-repository';

import { Logger } from '@ports/logger';

export const prismaRepositoriesFactory = (logger: Logger, prismaClient: PrismaClient) => {
    return {
        userRepository: prismaUserRepositoryFactory(logger, prismaClient),
    };
};
