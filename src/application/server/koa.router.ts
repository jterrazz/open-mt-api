import Router from 'koa-router';

import { ApiStatusMetadata } from '@domain/api/get-api-status.controller';
import { User } from '@domain/user/user';

import { Logger } from '@ports/logger';
import { UserRepository } from '@ports/repositories/user-repository';

import { apiStatusKoaSerializer } from '@adapters/api/api-status.koa-serializer';
import { defaultKoaDeserializer } from '@adapters/default.koa-deserializer';
import { getMeKoaDeserializer } from '@adapters/me/get-me.koa-deserializer';
import { getMeKoaSerializer } from '@adapters/me/get-me.koa-serializer';

import { getApiStatusControllerFactory } from '@infrastructure/api/get-api-status.controller';
import { getMeControllerFactory } from '@infrastructure/user/get-me.controller';

import { koaRouteFactory } from './koa.route';

export const koaRouterFactory = (
    version: string,
    userRepository: UserRepository,
    logger: Logger,
): Router => {
    const router = new Router();

    const getApiStatusController = getApiStatusControllerFactory(version);
    const getMeController = getMeControllerFactory(userRepository, logger);

    // API
    router.get(
        '/status',
        koaRouteFactory<undefined, ApiStatusMetadata>(
            defaultKoaDeserializer,
            getApiStatusController,
            apiStatusKoaSerializer,
        ),
    );

    // Me
    router.get(
        '/me',
        koaRouteFactory<number, User | null>(
            getMeKoaDeserializer,
            getMeController,
            getMeKoaSerializer,
        ),
    );

    return router;
};
