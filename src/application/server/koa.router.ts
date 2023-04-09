import Router from 'koa-router';

import { ApiInformation } from '@domain/api/information';

import { apiInformationKoaSerializer } from '@adapters/api/api-information.koa-serializer';
import { defaultKoaDeserializer } from '@adapters/default.koa-deserializer';

import { getApiInformationFactory } from '@infrastructure/api/information';

import { koaRouteFactory } from './koa.route';

export const koaRouterFactory = (version: string): Router => {
    const router = new Router();

    const getApiInformation = getApiInformationFactory(version);

    // API
    router.get(
        '/status',
        koaRouteFactory<undefined, ApiInformation>(
            defaultKoaDeserializer,
            getApiInformation,
            apiInformationKoaSerializer,
        ),
    );

    return router;
};
