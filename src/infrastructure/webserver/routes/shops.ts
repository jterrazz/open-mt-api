import { IControllers } from '@adapters/controllers';
import Router from 'koa-router';

export const shopsRouterFactory = (controllers: IControllers) => {
    const shopsRouter = new Router();

    shopsRouter.post('/', controllers.shops.createShop);
    shopsRouter.get('/:shopHandle', controllers.shops.getShop);

    return shopsRouter;
};
