import {
    CreateShopJSONRequest,
    CreateShopJSONResponse,
    deserializeCreateShopRequest,
} from '@adapters/serializers/shop-serializer';
import { IController } from '@adapters/controllers/controllers';
import { IDependencies } from '@application/contracts';
import { createShopFactory } from '@application/use-cases/shop/create-shop';

export const shopControllerFactory = (dependencies: IDependencies) => {
    const createShop: IController<
        CreateShopJSONRequest,
        CreateShopJSONResponse
    > = async (ctx) => {
        const createNewShop = createShopFactory(
            dependencies.repositories.shopRepository,
        );

        const request = deserializeCreateShopRequest(ctx.request.body);
        const savedShop = await createNewShop({
            handle: request.handle,
            name: request.name,
        });

        ctx.body = {
            handle: savedShop.handle,
            name: savedShop.name,
        };
    };

    return { createNewShop: createShop };
};
