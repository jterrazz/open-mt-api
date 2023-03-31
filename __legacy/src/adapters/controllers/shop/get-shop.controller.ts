import { NotFoundClientError } from '@domain/../../../domain/use-cases/error/client/not-found-client-error';
import { GetShop } from '@domain/../../../domain/use-cases/shop/get-shop';

import { DeserializeGetShopKoaRequest } from '@adapters/../../serializers/requests/shop/deserialize-get-shop-koa-request';
import { SerializeGetShopKoaResponse } from '@adapters/../../serializers/requests/shop/serialize-get-shop-koa-response';

import { IInitiatedKoaController } from '../koa-controller';

export const getShopControllerFactory = (
    getShop: GetShop,
    deserializeGetShopKoaRequest: DeserializeGetShopKoaRequest,
    serializeGetShopKoaResponse: SerializeGetShopKoaResponse,
): IInitiatedKoaController => {
    return async (ctx) => {
        ctx.requestTracker.requestedGetShop();

        const { shopHandle } = deserializeGetShopKoaRequest(ctx);

        const shopEntity = await getShop(shopHandle);

        if (!shopEntity) {
            throw new NotFoundClientError(`shop '${shopHandle}' does not exist`);
        }

        serializeGetShopKoaResponse(ctx, {
            description: shopEntity.description,
            handle: shopEntity.handle,
            name: shopEntity.name,
        });
    };
};
