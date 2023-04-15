import { createInjector } from 'typed-inject';

import { injectableConfigurationFactory } from '@configuration/configuration.injectable';
import { Environment } from '@configuration/schemas/environment';

import { injectablePrismaDatabaseFactory } from '@application/database/prisma.database.injectable';
import { injectableWinstonLoggerFactory } from '@application/logger/winston.logger.injectable';
import { injectablePrismaRepositoriesFactory } from '@application/repositories/prisma.repositories.injectable';
import { injectableKoaRouterFactory } from '@application/server/koa.router.injectable';
import { injectableKoaServerFactory } from '@application/server/koa.server.injectable';

import packageJson from '../../package.json';

export const applicationInjector = createInjector()
    // Values
    .provideValue('environment', process.env.NODE_ENV || Environment.Development)
    .provideValue('version', packageJson.version)

    // Application
    .provideFactory('configuration', injectableConfigurationFactory)
    .provideFactory('logger', injectableWinstonLoggerFactory)
    .provideFactory('database', injectablePrismaDatabaseFactory)

    // Repositories
    .provideFactory('repositories', injectablePrismaRepositoriesFactory)

    // Server
    .provideFactory('router', injectableKoaRouterFactory)
    .provideFactory('server', injectableKoaServerFactory);
