import { Configuration } from '@configuration/configuration';
import { Environment } from '@configuration/schemas/environment';

import { loggerFactory } from '@application/logger/winston.logger';

export const injectableWinstonLoggerFactory = (
    environment: Environment,
    configuration: Configuration,
) => {
    return loggerFactory(environment, configuration.APPLICATION.LOGGER.LEVEL);
};

injectableWinstonLoggerFactory.inject = ['environment', 'configuration'] as const;
