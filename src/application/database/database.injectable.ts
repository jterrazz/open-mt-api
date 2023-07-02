import { Configuration } from '@configuration/configuration';

import { PrismaFactory } from '@application/database/prisma';

import { Database } from '@ports/database';
import { Logger } from '@ports/logger';

export const injectableDatabaseFactory = (
    configuration: Configuration,
    logger: Logger,
): Database => {
    return PrismaFactory.getDatabase(configuration.APPLICATION.DATABASE.URL, logger);
};

injectableDatabaseFactory.inject = ['configuration', 'logger'] as const;
