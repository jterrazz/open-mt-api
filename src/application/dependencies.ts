import { Configuration, configurationFactory } from '@configuration/configuration';

import { loggerFactory } from '@application/logger/logger';
import { koaServerFactory } from '@application/server/koa.server';

import { Database } from '@ports/database';
import { Logger } from '@ports/logger';
import { Server } from '@ports/server';

interface ApplicationDependencies {
    configuration: Configuration;
    database: Database;
    logger: Logger;
    server: Server;
}

export const applicationDependenciesFactory = (): ApplicationDependencies => {
    const configuration = configurationFactory();
    const logger = loggerFactory();
    const database: Database = {
        connect: async () => {},
        disconnect: async () => {},
    };
    // const prismaDatabase = prismaDatabaseFactory(configuration, logger);

    return {
        configuration,
        database,
        logger,
        server: koaServerFactory(logger),
    };
};
