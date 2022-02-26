import {
    CreateShopJSONRequest,
    CreateShopJSONResponse,
    deserializeCreateShopRequest,
} from '@adapters/serializers/shop-serializer';
import { IController } from '@adapters/controllers/index';
import { IShopRepository } from '@domain/shop/shop-repository';
import { createShopFactory } from '@application/use-cases/shop/create-shop';
import { getShopFactory } from '@application/use-cases/shop/get-shop';

export const shopControllerFactory = (shopRepository: IShopRepository) => {
    const createShop: IController<
        CreateShopJSONRequest,
        CreateShopJSONResponse
    > = async (ctx) => {
        const createNewShop = createShopFactory(shopRepository);

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

    // Fixme
    const getShop: IController<any, any> = async (ctx) => {
        const getShop = getShopFactory(shopRepository);

        const shopHandle = ctx.params.shopHandle;
        const shopEntity = await getShop(shopHandle);

        ctx.body = {
            description: shopEntity.description,
            handle: shopEntity.handle,
            name: shopEntity.name,
        };
    };

    return { createShop, getShop };
};
