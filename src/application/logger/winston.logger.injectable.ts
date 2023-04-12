import { Configuration } from '@configuration/configuration';

import { loggerFactory } from '@application/logger/winston.logger';

export const injectableWinstonLoggerFactory = (
    environment: string,
    configuration: Configuration,
) => {
    return loggerFactory(environment, configuration.APPLICATION.LOGGER.LEVEL);
};

injectableWinstonLoggerFactory.inject = ['environment', 'configuration'] as const;
