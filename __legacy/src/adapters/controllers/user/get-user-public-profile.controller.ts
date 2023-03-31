import { NotFoundClientError } from '@domain/../../../domain/use-cases/error/client/not-found-client-error';
import { GetUserDetails } from '@domain/../../../domain/use-cases/user/get-user-details';

import { DeserializeGetUserKoaRequest } from '@adapters/../../serializers/requests/user/deserialize-get-user-public-profile-koa-request';
import { SerializeGetUserKoaResponse } from '@adapters/../../serializers/requests/user/serialize-get-user-public-profile-koa-response';

import { IInitiatedKoaController } from '../koa-controller';

export const getUserPublicProfileControllerFactory = (
    getUserPublicProfile: GetUserDetails,
    deserializeGetUserKoaRequest: DeserializeGetUserKoaRequest,
    serializeGetUserKoaResponse: SerializeGetUserKoaResponse,
): IInitiatedKoaController => {
    return async (ctx) => {
        ctx.requestTracker.requestedGetUserPublicProfile();

        const { userId } = deserializeGetUserKoaRequest(ctx);

        const userPublicProfile = await getUserPublicProfile(userId);

        if (!userPublicProfile) {
            throw new NotFoundClientError();
        }

        serializeGetUserKoaResponse(ctx, userPublicProfile);
    };
};

// TODO get user private profile
// TODO get user private settings
// TODO get user private subscriptions
