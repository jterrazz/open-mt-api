import { Configuration } from '@configuration/configuration';

import { Environment } from '@application/environment';
import { winstonLoggerFactory } from '@application/logger/winston.logger';

export const injectableLoggerFactory = (environment: Environment, configuration: Configuration) => {
    return winstonLoggerFactory(environment, configuration.APPLICATION.LOGGER.LEVEL);
};

injectableLoggerFactory.inject = ['environment', 'configuration'] as const;
