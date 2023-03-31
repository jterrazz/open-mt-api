import { AuthenticationRequiredClientError } from '@domain/../../../domain/use-cases/error/client/authentication-required-client-error';
import { ShopEntity } from '@domain/../../../domain/use-cases/shop/shop.entity';
import { GetUserListOfFollowedShops } from '@domain/../../../domain/use-cases/user/get-user-list-of-followed-shops';

import { IInitiatedKoaController } from '../koa-controller';

// TODO Move
const serializeShop = (shop: ShopEntity) => ({
    description: shop.description,
    handle: shop.handle,
    name: shop.name,
});

export const getUserListOfFollowedShopsControllerFactory = (
    getUserListOfFollowedShops: GetUserListOfFollowedShops,
): IInitiatedKoaController => {
    return async (ctx) => {
        // ctx.requestTracker.requestedGetUserFollowedShops(); // FIXME
        const authenticatedUser = ctx.authenticatedUser;

        if (!authenticatedUser) {
            throw new AuthenticationRequiredClientError();
        }

        // TODO Put in serializer
        const followedShops = await getUserListOfFollowedShops(authenticatedUser);

        ctx.response.body = {
            followedShops: followedShops.map(serializeShop),
        };
    };
};
