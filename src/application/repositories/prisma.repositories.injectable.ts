import { Configuration } from '@configuration/configuration';

import { PrismaFactory } from '@application/database/prisma';
import { prismaRepositoriesFactory } from '@application/repositories/prisma.repositories';

import { Logger } from '@ports/logger';

export const injectablePrismaRepositoriesFactory = (
    logger: Logger,
    configuration: Configuration,
) => {
    const prismaClient = PrismaFactory.getPrismaClient(configuration.SERVICES.DATABASE.URL, logger);

    return prismaRepositoriesFactory(logger, prismaClient);
};

injectablePrismaRepositoriesFactory.inject = ['logger', 'configuration'] as const;
