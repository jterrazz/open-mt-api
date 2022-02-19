import { IControllers } from '@adapters/controllers/controllers';
import { IDependencies, IWebServer } from '@application/contracts';
import { authenticationMiddleware } from '@infrastructure/webserver/middlewares/authentication';
import { errorHandlerMiddleware } from '@infrastructure/webserver/middlewares/error-handler';
import { routerFactory } from '@infrastructure/webserver/routes';
import { trackerMiddlewareFactory } from '@infrastructure/webserver/middlewares/tracker';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

export const koaServerFactory = (
    dependencies: IDependencies,
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
    app.use(errorHandlerMiddleware);
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
