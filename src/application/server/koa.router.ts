import Router from 'koa-router';

import { ApiStatusMetadata } from '@domain/api/status';
import { User } from '@domain/user/user';

import { UserRepository } from '@ports/repositories/user-repository';

import { apiStatusKoaSerializer } from '@adapters/api/api-status.koa-serializer';
import { defaultKoaDeserializer } from '@adapters/default.koa-deserializer';
import { getMeKoaDeserializer } from '@adapters/me/get-me.koa-deserializer';
import { getMeKoaSerializer } from '@adapters/me/get-me.koa-serializer';

import { getApiStatusFactory } from '@infrastructure/api/status';
import { getUserFactory } from '@infrastructure/user/user';

import { koaRouteFactory } from './koa.route';

export const koaRouterFactory = (version: string, userRepository: UserRepository): Router => {
    const router = new Router();

    const getApiStatus = getApiStatusFactory(version);
    const getUser = getUserFactory(userRepository);

    // API
    router.get(
        '/status',
        koaRouteFactory<undefined, ApiStatusMetadata>(
            defaultKoaDeserializer,
            getApiStatus,
            apiStatusKoaSerializer,
        ),
    );

    // Me
    router.get(
        '/me',
        koaRouteFactory<number, User | null>(getMeKoaDeserializer, getUser, getMeKoaSerializer),
    );

    return router;
};
