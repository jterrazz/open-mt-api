import Router from 'koa-router';

import { koaRouterFactory } from '@application/server/koa.router';

import { Logger } from '@ports/logger';
import { UserRepository } from '@ports/repositories/user-repository';

export const injectableKoaRouterFactory = (
    version: string,
    repositories: { userRepository: UserRepository },
    logger: Logger,
): Router => {
    return koaRouterFactory(version, repositories.userRepository, logger);
};

injectableKoaRouterFactory.inject = ['version', 'repositories', 'logger'] as const;
