import { createInjector } from 'typed-inject';

import { injectableConfigurationFactory } from '@configuration/configuration.injectable';
import { Environment } from '@configuration/schemas/environment';

import { injectablePrismaDatabaseFactory } from '@application/database/prisma.database.injectable';
import { loggerFactory } from '@application/logger/logger';
import { userRepositoryInMemoryFactory } from '@application/repositories/user-repository.in-memory';
import { injectableKoaRouterFactory } from '@application/server/koa.router.injectable';
import { injectableKoaServerFactory } from '@application/server/koa.server.injectable';

import packageJson from '../../package.json';

export const applicationInjector = createInjector()
    // Values
    .provideValue('environment', process.env.NODE_ENV || Environment.DEVELOPMENT)
    .provideValue('version', packageJson.version)

    // Application
    .provideFactory('configuration', injectableConfigurationFactory)
    .provideFactory('logger', loggerFactory)
    .provideFactory('database', injectablePrismaDatabaseFactory)

    // Repositories
    .provideFactory('userRepository', userRepositoryInMemoryFactory)

    // Server
    .provideFactory('router', injectableKoaRouterFactory)
    .provideFactory('server', injectableKoaServerFactory);
