import { IController } from '@adapters/controllers/controllers';
import {
    ICreateShopRequest,
    ICreateShopResponse,
    deserializeCreateShopRequest,
} from '@adapters/serializers/shop-serializer';
import { IDependencies } from '@application/contracts';
import { createShopFactory } from '@application/use-cases/shop/create-shop';

export const shopControllerFactory = (dependencies: IDependencies) => {
    const createShop: IController<ICreateShopRequest, ICreateShopResponse> =
        async (ctx) => {
            const createNewShop = createShopFactory(
                dependencies.repositories.shopRepository,
            );

            const request = deserializeCreateShopRequest(ctx.request.body);
            const savedShop = await createNewShop({
                handle: request.handle,
                name: request.name,
            });

            ctx.body = {
                // description: '',
                handle: savedShop.handle,
                // id: 0,
                name: savedShop.name,
            };
        };

    return { createNewShop: createShop };
};
