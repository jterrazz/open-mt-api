import { Configuration } from '@configuration/configuration';

import { Database } from '@ports/database';
import { Logger } from '@ports/logger';
import { Server } from '@ports/server';

import { retry } from '@utils/retry';

interface Api {
    start: () => Promise<void>;
}

export const apiFactory = (
    configuration: Configuration,
    logger: Logger,
    database: Database,
    server: Server,
): Api => {
    return {
        start: async () => {
            logger.info(`application is starting with environment <${configuration.ENVIRONMENT}>`);

            await retry(() => database.connect(), {
                delay: 500,
                onError: (error) => {
                    logger.error('failed to connect to database, will try again in 500 ms');
                    logger.error(error.message);
                },
                tries: 20,
            });

            await server.start(configuration.APPLICATION.SERVER.PORT);

            logger.info(`application started`);
        },
    };
};
