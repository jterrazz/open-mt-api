import { AuthenticationRequiredClientError } from '@domain/../../../domain/use-cases/error/client/authentication-required-client-error';
import { CreateShop } from '@domain/../../../domain/use-cases/shop/create-shop';

import { DeserializeCreateShopKoaRequest } from '@adapters/../../serializers/requests/shop/deserialize-create-shop-koa-request';
import { SerializeCreateShopKoaResponse } from '@adapters/../../serializers/requests/shop/serialize-create-shop-koa-response';

import { IInitiatedKoaController } from '../koa-controller';

export const createShopControllerFactory = (
    createShop: CreateShop,
    deserializeCreateShopKoaRequest: DeserializeCreateShopKoaRequest,
    serializeCreateShopKoaResponse: SerializeCreateShopKoaResponse,
): IInitiatedKoaController => {
    return async (ctx) => {
        ctx.requestTracker.requestedCreateShop();

        const { handle, name } = deserializeCreateShopKoaRequest(ctx);
        const description = ''; // TODO To get from request

        if (!ctx.authenticatedUser) {
            throw new AuthenticationRequiredClientError();
        }

        const savedShop = await createShop(
            {
                bannerImageUrl: null,
                // TODO To fix with uploaded image
                description,
                handle,
                name,
            },
            ctx.authenticatedUser,
        );

        serializeCreateShopKoaResponse(ctx, {
            handle: savedShop.handle,
            name: savedShop.name,
        });
    };
};
