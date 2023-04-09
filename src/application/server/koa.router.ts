import Router from 'koa-router';

import { ApiInformation } from '@domain/api/information';

import { apiInformationKoaSerializer } from '@adapters/api/api-information.koa-serializer';
import { defaultKoaDeserializer } from '@adapters/default.koa-deserializer';

import { getApiInformationFactory } from '@infrastructure/api/information';

import packageJson from '../../../package.json';

import { koaRouteFactory } from './koa.route';

// // Authentication
// router.post(
//     '/authentication/login',
//     passport.authenticate('local'),
//     controllers.authentication.logIn,
// );
// router.post('/authentication/logout', controllers.authentication.logOut);

export const koaRouterFactory = (): Router => {
    const router = new Router();

    const getApiInformation = getApiInformationFactory(packageJson.version);

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
