import Router from 'koa-router';

import { ApiInformation } from '@domain/api/information';

import { apiInformationKoaSerializer } from '@adapters/api/api-information.koa-serializer';
import { defaultKoaDeserializer } from '@adapters/default.koa-deserializer';

import { getApiInformation } from '@infrastructure/api/information';

import { koaRouteFactory } from './koa.route';

// // Authentication
// router.post(
//     '/authentication/login',
//     passport.authenticate('local'),
//     controllers.authentication.logIn,
// );
// router.post('/authentication/logout', controllers.authentication.logOut);
//
// // Me
// router.get('/me/followed-shops', controllers.me.getUserListOfFollowedShops);
//
// // Shop
// router.post('/shops', controllers.shops.createShop);
// router.get('/shops/:shopHandle', controllers.shops.getShop);
//
// // Product
// router.post('/products', controllers.products.createProduct);
// router.get('/products/:productId', controllers.products.getProduct);
// router.patch('/products/:productId', controllers.products.modifyProduct);
//
// // User
// router.get('/users/:userId', controllers.users.getPublicProfile);

export const koaRouterFactory = (): Router => {
    const router = new Router();

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
