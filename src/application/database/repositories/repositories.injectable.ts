import { Configuration } from '@configuration/configuration';

import { PrismaFactory } from '@application/database/prisma';
import { prismaUserRepositoryFactory } from '@application/database/repositories/prisma.user-repository';

import { Logger } from '@ports/logger';

export const injectableRepositoriesFactory = (logger: Logger, configuration: Configuration) => {
    const prismaClient = PrismaFactory.getPrismaClient(
        configuration.APPLICATION.DATABASE.URL,
        logger,
    );

    return {
        userRepository: prismaUserRepositoryFactory(logger, prismaClient),
    };
};

injectableRepositoriesFactory.inject = ['logger', 'configuration'] as const;
