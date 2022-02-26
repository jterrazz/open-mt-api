import { IControllers } from '@adapters/controllers';
import { IDependencies, IWebServer } from '@application/contracts';
import { IMiddlewares } from '@adapters/middlewares';
import { routerFactory } from '@infrastructure/webserver/routes';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

export const koaServerFactory = (
    dependencies: IDependencies,
    controllers: IControllers,
    middlewares: IMiddlewares,
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
    app.use(middlewares.initRequestTrackerMiddleware);
    app.use(middlewares.handleRequestErrorsMiddleware);
    app.use(middlewares.authenticateUserMiddleware);

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
