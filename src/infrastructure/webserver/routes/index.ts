import Router from 'koa-router';

import { IControllers } from '@adapters/contracts/controllers';
import { shopsRouterFactory } from '@infrastructure/webserver/routes/shops';
// import { paymentsRouter } from './payments';
// import { userRouter } from './user';
// import { usersRouter } from './users';

export const routerFactory = (controllers: IControllers): Router => {
    const router = new Router();
    const shopsRouter = shopsRouterFactory(controllers);

    router.get('/', controllers.api.getState);
    router.use('/shops', shopsRouter.routes(), shopsRouter.allowedMethods());

    return router;
};
