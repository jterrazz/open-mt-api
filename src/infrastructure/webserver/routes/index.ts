import Router from 'koa-router';

import { IControllers } from '@adapters/controllers/IControllers';
import { paymentsRouter } from './payments';
import { userRouter } from './user';
import { usersRouter } from './users';

export const routerFactory = (controllers: IControllers): Router => {
    const router = new Router();

    router.get('/', controllers.api.getState);
    router.use(
        '/payments',
        paymentsRouter.routes(),
        paymentsRouter.allowedMethods(),
    );
    router.use('/user', userRouter.routes(), userRouter.allowedMethods());
    router.use(
        '/users/:userId',
        usersRouter.routes(),
        usersRouter.allowedMethods(),
    );

    return router;
};
