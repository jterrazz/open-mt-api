import { Configuration } from '@configuration/configuration';

import { prismaDatabaseFactory } from '@application/database/prisma.database';

import { Database } from '@ports/database';
import { Logger } from '@ports/logger';

export const injectablePrismaDatabaseFactory = (
    configuration: Configuration,
    logger: Logger,
): Database => {
    return prismaDatabaseFactory(configuration.SERVICES.DATABASE.URL, logger);
};

injectablePrismaDatabaseFactory.inject = ['configuration', 'logger'] as const;
