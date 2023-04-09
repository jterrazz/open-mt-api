import { applicationDependenciesFactory } from '@application/dependencies';
import { applicationFactory } from './application';

export const start = async () => {
    const { logger, configuration, database, server } = applicationDependenciesFactory();
    const application = applicationFactory(configuration, logger, database, server);

    try {
        await application.start();
    } catch (error) {
        logger.error(error);
    }
};

// eslint-disable-next-line promise/catch-or-return,promise/valid-params
start().then();
