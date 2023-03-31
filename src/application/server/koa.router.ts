// import passport from 'koa-passport';
import Router from 'koa-router';

import { ApiInformation } from '@domain/api/information';

import { apiStatusKoaSerializer } from '@adapters/api/api-status.koa-serializer';
import { defaultKoaDeserializer } from '@adapters/default.koa-deserializer';
import { KoaContext, KoaDeserializer } from '@adapters/koa-deserializer.adapter';
import { KoaSerializer } from '@adapters/koa-serializer.adapter';

import { getApiInformation } from '@infrastructure/api/information';

interface Controller<Input, Output> {
    (input: Input): Promise<Output>;
}

const routeFactory = <ControllerInput, ControllerOutput>(
    deserializer: KoaDeserializer<ControllerInput>,
    controller: Controller<ControllerInput, ControllerOutput>,
    serializer: KoaSerializer<ControllerOutput>,
): ((ctx: KoaContext) => Promise<void>) => {
    return async (ctx: KoaContext) => {
        const input = await deserializer(ctx);
        const output = await controller(input);

        await serializer(ctx, output);
    };
};

export const koaRouterFactory = (): Router => {
    const router = new Router();

    // API
    router.get(
        '/status',
        routeFactory<undefined, ApiInformation>(
            defaultKoaDeserializer,
            getApiInformation,
            apiStatusKoaSerializer,
        ),
    );

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

    return router;
};
