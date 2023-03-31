import Koa from 'koa';
import Router from 'koa-router';

import { Logger } from '@ports/logger';
import { Server } from '@ports/server';

import { apiVersionKoaMiddleware } from '@adapters/api/api-version.koa-middleware';

// import bodyParser from 'koa-bodyparser';
// import passport from 'koa-passport';
// import session from 'koa-session';

interface KoaServer extends Server {
    koa: Koa;
}

export const koaServerFactory = (logger: Logger, router: Router): KoaServer => {
    logger.debug('initializing koa server');
    const koa = new Koa();

    // setupPassportStrategies();
    //
    // // Middlewares - Errors
    // app.use(middlewares.handleRequestErrorsMiddleware);
    // // Middlewares - Authentication
    // app.keys = [configuration.API.CLIENT.SECRET];
    // app.use(session({}, app)); // TODO Add redis session
    // app.use(passport.initialize());
    // app.use(passport.session());
    // app.use(middlewares.handleAuthenticatedUserMiddleware);
    // // Middlewares - Requests
    // app.use(bodyParser());
    // app.use(middlewares.setResponseHeadersMiddleware);
    // app.use(middlewares.handleRequestTrackerMiddleware);

    koa.use(apiVersionKoaMiddleware);

    koa.use(router.routes()).use(router.allowedMethods());

    return {
        koa,
        start: (port) => {
            koa.listen(port, () => {
                logger.info(`app is listening on port: ${port}`);
            });
        },
    };
};
