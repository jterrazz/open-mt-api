import { CreateShopKoaSerializer } from '@adapters/serializers/shop/create-shop-koa-serializer';
import { GetShopKoaSerializer } from '@adapters/serializers/shop/get-shop-koa-serializer';
import { IInitiatedKoaController } from '@adapters/contracts/controllers';
import { IShopRepository } from '@domain/shop/shop-repository';
import { createShopFactory } from '@application/use-cases/shop/create-shop';
import { getShopFactory } from '@application/use-cases/shop/get-shop';

const createShopKoaSerializer = new CreateShopKoaSerializer();
const getShopKoaSerializer = new GetShopKoaSerializer();

export const shopControllerFactory = (shopRepository: IShopRepository) => {
    const createShop: IInitiatedKoaController = async (ctx) => {
        const { handle, name } =
            createShopKoaSerializer.deserializeRequest(ctx);
        const createNewShop = createShopFactory(shopRepository);

        const savedShop = await createNewShop({
            handle,
            name,
        });

        createShopKoaSerializer.serializeResponse(ctx, {
            handle: savedShop.handle,
            name: savedShop.name,
        });
    };

    const getShop: IInitiatedKoaController = async (ctx) => {
        const { shopHandle } = getShopKoaSerializer.deserializeRequest(ctx);
        const getShop = getShopFactory(shopRepository);

        const shopEntity = await getShop(shopHandle);

        // TODO 404 If not found

        getShopKoaSerializer.serializeResponse(ctx, {
            description: shopEntity.description,
            handle: shopEntity.handle,
            name: shopEntity.name,
        });
    };

    return { createShop, getShop };
};
