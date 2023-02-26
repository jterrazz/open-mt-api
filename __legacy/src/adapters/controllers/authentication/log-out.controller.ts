import { IInitiatedKoaController } from '../koa-controller';
import { SerializeLogoutKoaResponse } from '@adapters/../../serializers/requests/authentication/serialize-logout-koa-response';

export const logOutControllerFactory = (
    serializeLogoutKoaResponse: SerializeLogoutKoaResponse,
): IInitiatedKoaController => {
    return async (ctx) => {
        ctx.requestTracker.requestedLogOut();

        await ctx.logout();

        serializeLogoutKoaResponse(ctx);
    };
};
