import { IControllers } from '@adapters/controllers/controllers';
import Router from 'koa-router';

export const shopsRouterFactory = (controllers: IControllers) => {
    const shopsRouter = new Router();

    shopsRouter.post('/', controllers.shops.createNewShop);

    return shopsRouter;
};
