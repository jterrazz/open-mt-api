import { Configuration } from '@configuration/configuration';

import { PrismaFactory } from '@application/database/prisma';

import { Database } from '@ports/database';
import { Logger } from '@ports/logger';

export const injectablePrismaDatabaseFactory = (
    configuration: Configuration,
    logger: Logger,
): Database => {
    return PrismaFactory.getDatabase(configuration.SERVICES.DATABASE.URL, logger);
};

injectablePrismaDatabaseFactory.inject = ['configuration', 'logger'] as const;
