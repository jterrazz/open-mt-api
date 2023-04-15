import Router from 'koa-router';

import { koaRouterFactory } from '@application/server/koa.router';

import { UserRepository } from '@ports/repositories/user-repository';

export const injectableKoaRouterFactory = (
    version: string,
    repositories: { userRepository: UserRepository },
): Router => {
    return koaRouterFactory(version, repositories.userRepository);
};

injectableKoaRouterFactory.inject = ['version', 'repositories'] as const;
