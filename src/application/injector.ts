import { createInjector } from 'typed-inject';

import { injectableConfigurationFactory } from '@configuration/configuration.injectable';

import { injectableDatabaseFactory } from '@application/database/database.injectable';
import { injectableRepositoriesFactory } from '@application/database/repositories/repositories.injectable';
import { Environment } from '@application/environment';
import { injectableLoggerFactory } from '@application/logger/logger.injectable';
import { injectableServerFactory } from '@application/server/server.injectable';

import packageJson from '../../package.json';

export const applicationInjector = createInjector()
    // Values
    .provideValue('environment', process.env.NODE_ENV || Environment.Development)
    .provideValue('version', packageJson.version)

    // Application
    .provideFactory('configuration', injectableConfigurationFactory)
    .provideFactory('logger', injectableLoggerFactory)
    .provideFactory('database', injectableDatabaseFactory)

    // Repositories
    .provideFactory('repositories', injectableRepositoriesFactory)

    // Server
    .provideFactory('server', injectableServerFactory);
