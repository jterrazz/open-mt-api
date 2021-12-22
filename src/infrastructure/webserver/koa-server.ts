import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import { IControllers } from '@adapters';
import { IProjectDependencies, IWebServer } from '@application/contracts';
import { authenticationMiddleware } from '@infrastructure/webserver/middlewares/authentication';
import { routerFactory } from '@infrastructure/webserver/routes';
import { trackerMiddlewareFactory } from '@infrastructure/webserver/middlewares/tracker';

export const koaServerFactory = (
    dependencies: IProjectDependencies,
    controllers: IControllers,
): IWebServer => {
    const {
        logger,
        configuration: {
            API: { PORT },
        },
    } = dependencies;

    const app = new Koa();

    /**
     * Middlewares
     */

    app.use(bodyParser());
    app.use(authenticationMiddleware);
    app.use(trackerMiddlewareFactory(dependencies));

    /**
     * Router
     */

    const router = routerFactory(controllers);
    app.use(router.routes()).use(router.allowedMethods());

    return {
        app,
        start: () =>
            app.listen(PORT, () => {
                logger.info(`app is listening on port: ${PORT}`);
            }),
    };
};
